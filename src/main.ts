import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/store";

import * as volar from "@volar/experimental/client";

createApp(App)
    .use(volar.vuePlugin)
    .use(store)
    .mount("#app");
