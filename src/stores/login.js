import { inject, ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useLoginStore = defineStore('login', () => {
  const user = ref({
    email:'',
    password:''
  });
  const titles = ref([])
  const newInstance = axios.create({
    baseURL: 'https://taskmanager.ron.digital/api'
  })

  function bla(){
    return new Promise((resolve, reject) => {

      newInstance.get('/titles', {
        }).then(response => {
          console.log(response.data.titles);
          titles.value = response.data.titles;
          resolve()
        }).catch(()=> {
          reject('olmadi')
        })
    })
  }
  function ups(uv){ 
    return new Promise((resolve, reject) => {
    newInstance.put(`/titles/${uv.id}`, {
      name: uv.name, description: uv.description
     }).then(response => {
       console.log(response.data.titles);
       resolve('oldu');
     }).catch(()=>{
      reject('olmadi');
     })
    })
  }
 
  function getUser() {
    if(localStorage.getItem('token')){
      newInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    }
  }

  function addUser(user){
     return new Promise((resolve, reject) => {
      axios.post('https://taskmanager.ron.digital/api/login',{
       email:user.email, password: user.password
      }).then(response => {
        localStorage.setItem('token',response.data.token);
        newInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
        resolve('oldu')
      }).catch(()=> {
        reject('olmadi')
      })
     }) 
    }

  // function deleteUser(id){
  //   const findIndex = userList.value.findIndex((user)=> user.id === id);
  //   userList.value.splice(findIndex, 1);
  // }
    
  return {addUser, getUser, bla }
 
})

