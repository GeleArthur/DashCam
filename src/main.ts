import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/store";

const pinia = createPinia();
createApp(App)
    .use(pinia)
    .use(store)
    .mount("#app");
