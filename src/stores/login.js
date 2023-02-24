import { inject, ref } from 'vue';
import { defineStore } from 'pinia';
const appAxios = inject("appAxios");

export const useLoginStore = defineStore('login', () => {
  const user = ref([]);

  const save = () => {
    appAxios.post('https://taskmanager.ron.digital/api/login',{
      ...user.value
    }).then(response => {
      console.log(response);
    })
  }

  function addUser(a){
    user.value.push(a);
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
