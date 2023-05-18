import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia';

import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import InpuMask from 'primevue/inputmask';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Checkbox from 'primevue/checkbox';
import Card from 'primevue/card';
import Toolbar from 'primevue/toolbar';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import DialogService from 'primevue/dialogservice'
import Dropdown from 'primevue/dropdown'
import Tag from 'primevue/tag'
import ProgressSpinner from 'primevue/progressspinner';
import Listbox from 'primevue/listbox';

import './assets/app.css'
import router from './router';

// import "primevue/resources/themes/tailwind-light/theme.css";
// import "primevue/resources/themes/bootstrap4-light-blue/theme.css";
import "./assets/theme.css"
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

const app = createApp(App)

app.use(PrimeVue, { ripple: true })
app.use(ToastService)
app.use(DialogService);
app.use(router)

const pinia = createPinia();
app.use(pinia);

app.component('InputText',InputText);
app.component('Button',Button);
app.component('Toast',Toast);
app.component('Checkbox', Checkbox);
app.component('Card', Card);
app.component('Toolbar', Toolbar);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Dialog', Dialog);
app.component('Dropdown', Dropdown);
app.component('Tag', Tag);
app.component('ProgressSpinner', ProgressSpinner);
app.component('InputNumber', InputNumber);
app.component('InputMask', InpuMask);
app.component('Listbox', Listbox);

app.mount('#app')
