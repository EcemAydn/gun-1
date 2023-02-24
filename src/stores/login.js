import { inject, ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useLoginStore = defineStore('login', () => {
  const user = ref({
    email:'',
    password:''
  });

  

  function addUser(user){
    axios.post('https://taskmanager.ron.digital/api/login',{
      ...user
    }).then(response => {
      console.log(response);
    })
    .catch (error => {
      console.log(error);
    })
  }
  return {user, addUser}
 
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
