import { inject, ref } from 'vue';
import { defineStore } from 'pinia';
import api from '@/util/api.js';

export const useLoginStore = defineStore('login', () => {
  
  function getUser() {
    if (localStorage.getItem('token')) {
      api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    }
  }

  function addUser(user) {
    return new Promise((resolve, reject) => {
      api.post('https://taskmanager.ron.digital/api/login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

        resolve('Successful')
      })
      .catch((error) => {
        if (error.response) {
          reject(error.response.data.message)
        } else {
          reject(error);
        }
      })
    })
  }

 

  return { addUser, getUser }
})

