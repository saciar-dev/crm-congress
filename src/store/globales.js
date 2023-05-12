import {defineStore } from 'pinia';
import App from '../App.vue';
import { createApp } from 'vue'
import { createPinia } from 'pinia';

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

export const useGlobalesStore = defineStore('globales', {
    state: () =>({
        urlBase: 'https://crm.votame.info/api'
    })   
})