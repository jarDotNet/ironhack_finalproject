import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
import router from "./router";

import "./assets/main.css";
import App from "./App.vue";

const pinia = createPinia();
pinia.use(piniaPersist);

const app = createApp(App);
app.use(pinia).use(router);
app.mount("#app");
