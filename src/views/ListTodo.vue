<template>
    <div class="container">
        <h1 class="list-heading">My To-Do List</h1>
        <h2>Welcome, {{ userName }}</h2>
        <div style="display: inline-block;">
            <button style="margin: 10px;">
                <RouterLink :to="{ name: 'add' }" style="color: white; background-color: green;"> Add Todo</RouterLink>
            </button>
            <button @click="logout">Logout</button>
        </div>
        <table id="todo-table">
            <thead>
                <tr>
                    <th>S.N</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Created By</th>
                    <th>Created At</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in todos" :key="item.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.description }}</td>
                    <td :class="{ 'active-status': item.status === 1, 'inactive-status': item.status === 0 }">
                        {{ item.status === 1 ? 'Active' : 'Inactive' }}
                    </td>

                    <td>{{ item.creator.name }} ({{ item.creator.email }})</td>
                    <td>{{ formatDate(item.created_at) }}</td>
                    <td>
                        <button style="margin: 4px;">
                            <RouterLink :to="{ path: '/list/' + item.id }" style="color: white; background-color: green;">edit</RouterLink>
                        </button>
                        <button style="margin: 4px; background-color: red;" @click="deleteItem(item.id)">delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            todos: [],
            userName: '',
            token: localStorage.getItem('token') || '',
        };
    },
    mounted() {
        this.fetchUserData(); 
    },
    methods: {
        async fetchUserData() {
            try {
                const userResponse = await axios.get('/user', {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                });
                this.userName = userResponse.data.name;
                await this.fetchData(userResponse.data.id);
            } catch (error) {
                console.error('Error fetching user data: ', error);
            }
        },

        async fetchData(userId) {
            try {
                const response = await axios.get(`/list?user_id=${userId}`, {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                });
                this.todos = response.data.data;
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        },

        formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        },

        async deleteItem(id) {
            if (confirm("Are you sure want to delete this item?")) {
                try {
                    await axios.delete(`/list/${id}`);
                    this.todos = this.todos.filter(item => item.id !== id);
                } catch (error) {
                    console.error('Error deleting item:', error);
                    alert('Error deleting the item');
                }
            }
        },
        
        logout() {
            localStorage.removeItem('token');
            this.$router.push('/');
        }
    },
};
</script>


<style>
.list-heading {
    justify-content: center;
    display: flex;
}
button{
    border: 2px black solid;
}

body {
    display: contents;
}

#app {
    display:inline-block

}

.container {
    width: 100%;
    margin-top: 10px;
   margin-left: 20px;
   margin-right: 100px;
    justify-content: center;
    justify-items: center;
}

#todo-table {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 90vw;
}

#todo-table th,
#todo-table td {
    border: 1px solid #ddd;
    padding: 8px;
}

#todo-table tr:nth-child(even) {
    background-color: #f2f2f2;
}

#todo-table tr:hover {
    background-color: #ddd;
}

#todo-table th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #04AA6D;
    color: white;
}
.active-status {
  color: green;
}

.inactive-status {
  color: red;
}


</style>