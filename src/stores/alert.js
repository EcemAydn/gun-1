import { ref } from 'vue';
import { defineStore } from 'pinia';


export const useAlertStore = defineStore('alert', () => {
    const alerts = ref([]);
  
    function addAlert(alert){
        alerts.value.push(alert);
        setTimeout(() => {
            alerts.value.shift()
        }, 3000);
    }
    return {alerts, addAlert}
})