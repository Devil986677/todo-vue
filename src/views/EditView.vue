<template>
  <div class="main">
    <button>
      <RouterLink :to="{name:'list'}" style="color: white;"> All todos</RouterLink>
    </button>
    <div class="main-content">
      <h1 style="display: flex; justify-content: center;">Edit To-Do</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="formData.name" required />
        </div>
        <div>
          <label for="description">Description:</label>
          <textarea id="description" v-model="formData.description" required></textarea>
        </div>
        <div>
          <label for="status">Status:</label>
          <select id="status" v-model="formData.status" required>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>
        <button type="submit" class="submit-button">Update To-Do</button>
        <div v-if="message" :class="{ 'success': success, 'error': !success }">{{ message }}</div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import router from '@/router';

export default {
  setup() {
    const editdata = ref(null);
    const formData = ref({
      name: '',
      description: '',
      status: 1,
      created_by: null,
    });
    const message = ref(''); // Define the message ref
    const success = ref(false); // Define the success ref
    const token = localStorage.getItem('token') || '';

    const getListData = async (listId) => {
      try {
        const res = await axios.get(`/list/${listId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Response:', res.data.list);

        editdata.value = res.data.list;

        formData.value.name = editdata.value.name;
        formData.value.description = editdata.value.description;
        formData.value.status = editdata.value.status;
        formData.value.created_by = editdata.value.created_by;
      } catch (error) {
        console.error('Error fetching list data:', error);
      }
    };

    const submitForm = async () => {
      try {
        const listId = editdata.value.id; 
        const res = await axios.put(`/list/${listId}`, formData.value, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        message.value = 'To-Do updated successfully!';
        success.value = true;
        router.push({name:'list'}); 
        console.log('Form submitted:', res.data);
      } catch (error) {
        message.value = 'Error updating To-Do.';
        success.value = false;
        console.error('Error updating data:', error);
      }
    };

    return {
      editdata,
      formData,
      message, 
      success, 
      getListData,
      submitForm,
    };
  },

  mounted() {
    this.getListData(this.$route.params.id);
  },
};
</script>
  
  <style scoped>
  *{
    padding: 0px;
    margin: 0px;
  }
  label {
    display: block;
  }
  h2 {
    position: relative;
    left: 35%;
    font-size: large;
  }
  .main{
    height: 100%;
    width: max-content;
  }
  .main-content {
    margin-top: 60px;
    border: 2px black solid;
    background-color: aquamarine;
    height: 500px;
    width: 600px;
    position: relative;
    left: 25%;
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
  