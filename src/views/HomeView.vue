<script>
import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        email: '',
        password: '',
      },
      message: '',
      success: false,
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post('/login', this.formData);
        localStorage.setItem('token', response.data.access_token);

        if (response.status === 200) {
          this.message = 'Login Successfully';
          this.success = true;
          this.formData.email = '';
          this.formData.password = '';
          
          
          window.location.href = '/list'; 
        } else {
          this.message = 'Invalid login credentials';
          this.success = false;
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.message = 'Invalid login credentials';
        } else {
          this.message = 'An error occurred: ' + (error.response?.data.message || error.message);
        }
        this.success = false;
      }
    },
  },
  created() {
    const token = localStorage.getItem('token');
    if (token) {
      window.location.href = '/list';
    }
  }
};
</script>

<template>
  <div class="main-content">
    <div class="avatar"></div>
    <h1 style="justify-content: left;">Login Page</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="email">Email:</label>
        <input type="text" id="email" v-model="formData.email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="formData.password" required />
      </div>
      <button type="submit" class="submit-button">Login</button>
      <div v-if="message" :class="{ 'success': success, 'error': !success }">{{ message }}</div>
    </form>
    <div class="sign-up">
      <h3>Don't have Account?</h3>
      <RouterLink :to="{name:'register'}">Create Account</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.sign-up{
  display: flex;
  flex-direction: column;
  text-align: center;
}
.avatar{
  height: 100px;
  width: 100px;
  border-radius: 50%;
  background-color: red;
  position: relative;
  left: 40%;
  background-image: url('https://www.shutterstock.com/image-photo/profile-picture-smiling-young-african-260nw-1873784920.jpg');
  background-size: cover; 
  background-position: center; 
}
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
  display: flex;
  flex-direction: column;
  text-align: center;

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

input,
textarea,
select {
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
