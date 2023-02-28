import { inject, ref } from 'vue';
import { defineStore } from 'pinia';
import api from '@/util/api.js';

export const useMembersStore = defineStore('member', () => {

const members = ref([]);

  function getMembers(){
    return new Promise((resolve, reject) => {
      api.get('/members')
      .then(response => {
        console.log(response.data);
        members.value = response.data.members
        resolve('oldu')
      })
      .catch(()=> {
        reject('olmadi')
      })
    })
  }

  function createMember(title){
    return new Promise((resolve, reject) => {
      api.post('/members', {
        title_id: title.id,
        name: title.name,
      })
      .then((response) => {
        console.log(response.data);
        members.value.push(response.data)
        
        resolve('oldu')
      })
      .catch((error) => {
        if(error.response){
          reject(error.response.data.message);
        } else {
          reject(error);
        }
      })
    })
  }

  function deleteMember(id){
    return new Promise((resolve, reject) => {
      api.delete(`/members/${id}`)
      .then(() => {
        const findIndex = members.value.findIndex(member => member.id === id);
        members.value.splice(findIndex, 1)
        
        resolve('oldu')
      })
      .catch((error) => {
        if(error.response){
          reject(error.response.data.message);
        } else {
          reject(error);
        }
      })
    })
  }

  function updateMember(member){
    return new Promise((resolve, reject) => {
      api.put(`/members/${member.id}`, {
        id: member.id,
        title:member.title.name,
        name: member.name
      })
      .then((response) => {
        const findIndex = members.value.findIndex(item => item.id === member.id);
        members.value.splice(findIndex, 1, response.data.member)
        
        resolve('oldu')
      })
      .catch((error) => {
        if(error.response){
          reject(error.response.data.message);
        } else {
          reject(error);
        }
      })
    })
  }

  function getMemberById(id){
    return members.value.find((member) => member.id == id);

  }

  return {members, getMembers, createMember, deleteMember, updateMember, getMemberById}
})

