<template>
    <div>
      <button>
        <RouterLink :to="{name:'list'}" style="color: white;"> All todos</RouterLink>
      </button>
      <div class="main-content">
        <h2 style="display: flex;">Add New To-Do</h2>
        <form @submit.prevent="submitForm">
          <div>
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="formData.name" required />
          </div>
          <div>
            <label for="description">Description:</label>
            <textarea class="sm:p-5 py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" v-model="formData.description" rows="2" placeholder="Description" required></textarea>
          </div>
          <div>
            <label for="status">Status:</label>
            <select id="status" v-model="formData.status" required>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>
          <button type="submit" class="submit-button">Add To-Do</button>
          <div v-if="message" :class="{ 'success': success, 'error': !success }">{{ message }}</div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        formData: {
          name: '',
          description: '',
          status: 1, 
          created_by: null, 
        },
        message: '',
        success: false,
        token: localStorage.getItem('token') || '', 
      };
    },
    mounted() {
      this.fetchUserId(); 
    },
    methods: {
      async fetchUserId() {
        try {
          const response = await axios.get('/user', {
            headers: {
              Authorization: `Bearer ${this.token}`, 
            },
          });
          this.formData.created_by = response.data.id; 
        } catch (error) {
          console.error('Error fetching user ID: ', error);
        }
      },
      async submitForm() {
        try {
          const response = await axios.post('/list', this.formData);
          this.message = 'To-Do added successfully!';
          this.success = true;
          this.formData.name = '';
          this.formData.description = '';
          this.formData.status = 1;
          window.location.href = '/list'; 
        } catch (error) {
          this.message = 'Error adding to-do: ' + error.response.data.message;
          this.success = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  label {
    display: block;
  }
  h2 {
    position: relative;
    left: 35%;
  }
  .main-content {
    margin-top: 60px;
    border: 2px black solid;
    background-color: aquamarine;
    height: 500px;
    width: 600px;
    position: relative;
    left: 100%;
    top: 50px;
    justify-items: center;
  }
  form {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    margin: auto;
  }
  label {
    margin-top: 10px;
  }
  input, textarea, select {
    margin-top: 5px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  button {
    margin-top: 10px;
    padding: 10px;
    background-color: #04AA6D;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #03a05d;
  }
  .success {
    color: green;
    margin-top: 10px;
  }
  .error {
    color: red;
    margin-top: 10px;
  }
  .submit-button {
    height: 60px;
    width: 200px;
  }
  </style>
  