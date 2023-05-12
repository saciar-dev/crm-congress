import { createRouter, createWebHistory} from 'vue-router';
import Login from './views/Login.vue';
import Cliente from './views/ABMs/Cliente.vue';

const routes = [
    {path:'/', component: Login},
    {path: '/clientes', component: Cliente}
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router;