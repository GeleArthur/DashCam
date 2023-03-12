import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import cloneDeep from "lodash.clonedeep";

const pinia = createPinia();
pinia.use(({ store }) => {
	const initialState = cloneDeep(store.$state);
	store.$reset = () => store.$patch(cloneDeep(initialState));
});

createApp(App).use(pinia).mount("#app");
