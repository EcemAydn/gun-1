import { inject, ref } from 'vue';
import { defineStore } from 'pinia';
import api from '@/util/api.js';
import moment from 'moment';

export const useMissionsStore = defineStore('mission', () => {

const missions = ref([]);

  function getMissions(){
    return new Promise((resolve, reject) => {
      api.get('/missions')
      .then(response => {

        missions.value = response.data.missions
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

  function createMission(mission){
    return new Promise((resolve, reject) => {
      api.post('/missions', {
        project_id: mission.project_id,
        member_id: mission.member,
        description: mission.description,
        target_date: mission.target_date,
        delivery_date: mission.delivery_date
      })
      .then((response) => {
        console.log(response.data);
        missions.value.push(response.data.mission);
        
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

  function deleteMission(id){
    return new Promise((resolve, reject) => {
      api.delete(`/missions/${id}`)
      .then(() => {
        const findIndex = missions.value.findIndex(mission => mission.id === id);
        missions.value.splice(findIndex, 1);
        
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

  function updateMission(mission){
    console.log(mission)
    return new Promise((resolve, reject) => {
      api.put(`/missions/${mission.id}`, mission)
      .then((response) => {
        const findIndex = missions.value.findIndex(item => item.id === mission.id);
        missions.value.splice(findIndex, 1, response.data.mission)
        
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

  function getMissionById(id){
    return missions.value.find((mission) => mission.id == id);

  }

  return {missions, getMissions, createMission, deleteMission, updateMission, getMissionById}
})

