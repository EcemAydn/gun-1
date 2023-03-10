import { inject, ref } from 'vue';
import { defineStore } from 'pinia';
import api from '@/util/api.js';

export const useMembersStore = defineStore('member', () => {

const members = ref([]);

  function getMembers(){
    return new Promise((resolve, reject) => {
      api.get('/members')
      .then(response => {
        members.value = response.data.members
        resolve('Successful')
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

  function createMember(title){
    return new Promise((resolve, reject) => {
      api.post('/members', {
        title_id: title.id,
        name: title.name,
      })
      .then((response) => {
        members.value.push(response.data.member);
        
        resolve('Successful')
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
        members.value.splice(findIndex, 1);
        
        resolve('Successful')
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
        id: member.title_id,
        title_id:member.title.id,
        name: member.name
      })
      .then((response) => {
        const findIndex = members.value.findIndex(item => item.id === member.id);
        members.value.splice(findIndex, 1, response.data.member)
        
        resolve('Successful')
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



// [
//   {
//     color: 'warning',
//     message: 'arda turan '
//   }
// ]

// setTimeout(() => {
//   shift
// }, 3000)