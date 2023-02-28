import { inject, ref } from 'vue';
import { defineStore } from 'pinia';
import api from '@/util/api.js';


export const useTitleStore = defineStore('title', () => {
    const titles = ref([]);

    function getTitles() {
      return new Promise((resolve, reject) => {
        api.get('/titles').then(response => {
            console.log(response);
            titles.value = response.data.titles;
          resolve()
        }).catch(() => {
          reject('olmadi')
        })
      })
    }
  
    function updateTitle(title) {
      return new Promise((resolve, reject) => {
        api.put(`/titles/${title.id}`, {
          id: title.id,
          name: title.name,
          description: title.description
        })
        .then(response => {
          const findIndex = titles.value.findIndex((item) => item.id === title.id);
          titles.value.splice(findIndex, 1, response.data.title)
  
          resolve('oldu');
        })
        .catch(() => {
          reject('olmadi');
        })
      })
    }
  
    function createTitle(uv) {
      return new Promise((resolve, reject) => {
        api.post('/titles', {
          name: uv.name, description: uv.description
        })
          .then((response) => {
            console.log(response.data);
            titles.value.push(response.data)
            resolve('oldu');
          }).catch(() => {
            reject('olmadi');
          })
      })
    }
  
    function deleteTitle(id) {
      return new Promise((resolve, reject) => {
        api.delete(`/titles/${id}`)
        .then(() => {
          const findIndex = titles.value.findIndex((title) => title.id === id);
          titles.value.splice(findIndex, 1);
  
          resolve('oldu');
        })
        .catch(() => {
          reject('olmadi');
        })
      })
    }
  
    function getTitleById(id) {
      return titles.value.find((a) => a.id == id);
    }
  return { getTitles, titles, updateTitle, deleteTitle, createTitle, getTitleById }

})