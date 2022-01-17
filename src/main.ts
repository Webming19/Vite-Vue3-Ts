import { createApp } from 'vue';
// 引入状态
import { createPinia } from "pinia"
import App from './App.vue';
import 'virtual:svg-icons-register';
import './styles/index.scss';

createApp(App).use(createPinia()).mount('#app');