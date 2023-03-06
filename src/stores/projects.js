import { inject, ref } from 'vue';
import { defineStore } from 'pinia';
import api from '@/util/api.js';


export const useProjectStore = defineStore('project', () => {
    const projects = ref([]);

    function getProjects() {
      return new Promise((resolve, reject) => {
        api.get('/projects').then(response => {
            projects.value = response.data.projects;
          resolve()
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
  
    function updateProject(project) {
      return new Promise((resolve, reject) => {
        api.put(`/projects/${project.id}`, {
          id: project.id,
          name: project.name,
          description: project.description,
          created: project.created_at,
          updated: project.updated_at,
        })
        .then(response => {
          const findIndex = projects.value.findIndex((item) => item.id === project.id);
          projects.value.splice(findIndex, 1, response.data.project)
  
          resolve('Successful');
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
  
    function createProject(project) {
      return new Promise((resolve, reject) => {
        api.post('/projects', {
          name: project.name, 
          description: project.description
        })
          .then((response) => {
            console.log(response.data);
            projects.value.push(response.data)
            resolve('Successful');
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
  
    function deleteProject(id) {
      return new Promise((resolve, reject) => {
        api.delete(`/projects/${id}`)
        .then(() => {
          const findIndex = projects.value.findIndex((project) => project.id === id);
          projects.value.splice(findIndex, 1);
  
          resolve('Successful');
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
  
    function getProjectById(id) {
      return projects.value.find((project) => project.id == id);
    }
  return { getProjects, projects, updateProject, deleteProject, createProject, getProjectById }

})