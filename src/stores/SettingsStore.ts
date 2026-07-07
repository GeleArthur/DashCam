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
	const websocketIP = ref("127.0.0.1")
	const websocketPort = ref("46646") // HyperBash is opens a websocket on 46646

	return { Version, IconSettings, WebsocketStatus, websocketIP, websocketPort };
});
