import { MatchInfoType } from "@/interfaces/StoreInterfaces/MatchInfo";
import {
	DashCamSettings,
	PlayerStateInfo,
	TeamInfo,
	WebsocketStatusTypes,
} from "@/interfaces/StoreInterfaces/StoreState";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useMatchStateStore = defineStore("matchState", () => {
	const WebsocketStatus = ref(WebsocketStatusTypes.disconnected);

	const SelectedPlayerIndex = ref(-1);
	const PlayerData = ref([] as PlayerStateInfo[]);

	const MatchInfo = ref({} as MatchInfoType);

	// Needs to be moved to a different store
	const Version = ref("");
	const Settings = ref({} as DashCamSettings);
	const TeamData = ref({ red: {} as TeamInfo, blue: {} as TeamInfo });

    // Yes :(
	return {
		WebsocketStatus,
		SelectedPlayerIndex,
		PlayerData,
		MatchInfo,
		Version,
		Settings,
		TeamData,
	};
});
