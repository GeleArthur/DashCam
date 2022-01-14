import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";

// eslint-disable-next-line prettier/prettier
createApp(App)
    .use(store)
    .mount("#app");
