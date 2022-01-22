import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";

import "virtual:svg-icons-register";
import "./styles/index.scss";

createApp(App).use(router).use(createPinia()).mount("#app");
