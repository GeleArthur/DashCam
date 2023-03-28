import {
	DashCamSettings,
	iconModes,
	WebsocketStatusTypes,
} from "@/interfaces/StoreInterfaces/StoreState";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingStore = defineStore("settings", () => {
	const WebsocketStatus = ref(WebsocketStatusTypes.disconnected);

	const Version = ref("");
	const IconSettings = ref({
		customBlueIcon: "",
		customRedIcon: "",
		iconMode: iconModes.dashLeague,
	} as DashCamSettings);

	return { Version, IconSettings, WebsocketStatus };
});
