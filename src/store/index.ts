import { createPinia } from "pinia";
import piniaPersisted from "pinia-plugin-persistedstate";

const store = createPinia();
store.use(piniaPersisted);

export default store;
