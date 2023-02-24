import { inject, ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useLoginStore = defineStore('login', () => {
  const user = ref([]);

  const save = () => {
    axios.post('https://taskmanager.ron.digital/api/login',{
      ...user.value,
      
    }).then(response => {
      console.log(response);
    })
    .catch (error => {
      console.log(error);
    })
  }

  function addUser(a){
    user.value.push(a);
    save()
  }
  return {user, addUser, save}
 
})

// import { defineStore } from 'pinia'
// import axios from "axios"
// export const useUserStore = defineStore("user", {
//     state: () => ({
//         users: [],
//     }),
//     getters: {
//       getUsers(state){
//           return state.users
//         }
//     },
//     actions: {
//       async fetchUsers() {
//         try {
//           const data = await axios.post('https://taskmanager.ron.digital/api/login', {user})
//             this.users = data.data
//           }
//           catch (error) {
//             alert(error)
//             console.log(error)
//         }
//       }
//     },
// })
