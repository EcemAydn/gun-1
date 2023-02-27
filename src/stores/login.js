import { inject, ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useLoginStore = defineStore('login', () => {
  const titles = ref([])
  const newInstance = axios.create({
    baseURL: 'https://taskmanager.ron.digital/api'
  })

  function getTitles(){
    return new Promise((resolve, reject) => {
      newInstance.get('/titles', {
        }).then(response => {
          titles.value = response.data.titles;
          resolve()
        }).catch(()=> {
          reject('olmadi')
        })
    })
  }

  function updateTitle(uv){ 
    return new Promise((resolve, reject) => {
      newInstance.put(`/titles/${uv.id}`, {
      id:uv.id, name: uv.name, description: uv.description
      }).then(response => {
        console.log(response.data.titles);
        deniyorum()
        // const findIndex = titles.value.findIndex((title)=> title.id === uv);
        // titles.value.splice(findIndex, 1, {name: titles.name.value, description: titles.description.value})
        resolve('oldu');
      }).catch(()=>{
        reject('olmadi');
      })
    })
  }
  function deniyorum(editTitle){
    const findIndex = titles.value.findIndex((title)=> title.id === uv);
    titles.value.splice(findIndex, 1, editTitle)
  }

  function createTitle(uv){
      return new Promise((resolve, reject) => {
        newInstance.post('/titles',{
          name: uv.name, description: uv.description
        })
        .then((response)=> {
          console.log(response.data);
          titles.value.push(response.data)
          resolve('oldu');
        }).catch(()=> {
          reject('olmadi');
        })
      })
  }

  function deleteUser(uv){ 
    return new Promise((resolve, reject) => {
      newInstance.delete(`/titles/${uv}`, {
        id: uv.id, name: uv.name, description: uv.description
      }).then((response) => {
        console.log(response.data);
        const findIndex = titles.value.findIndex((title) => title.id === uv);
        titles.value.splice(findIndex, 1);
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
      }).catch((error)=> {
        if(error.response) {
          reject(error.response.data.message)
        } else {
          reject(error);
        }
      })
     }) 
    }
   
    function getTitleById(id) {
      return titles.value.find((a) => a.id == id);
  }
  return {addUser, getUser, getTitles, titles, updateTitle, deleteUser, createTitle, getTitleById }
 
})

