import { inject, ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useLoginStore = defineStore('login', () => {
  const user = ref({
    email:'',
    password:''
  });

  

  function addUser(user){
    let deneme= false;
    new Promise(function(resolve,reject){
      const timeout= setTimeout(() => {
        if(deneme) {
          resolve('okeyto');
        }
      },1000)
      axios.post('https://taskmanager.ron.digital/api/login',{
        ...user
      }).then(response => {
        console.log(response);
        clearTimeout(timeout);
        if(!deneme) {
          console.log('fetch good! ', response);
          resolve(alert('basarili'));
        }
      })
      .catch (error => {
        console.log(error);
        reject(alert('olmadi'))
      })
    });
    }
    return {user, addUser}
 
})

