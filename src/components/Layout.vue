<template>
	<div class="container">
		<team :team="1" /> <!-- blue -->
		<scoreboard />
		<team :team="0" /> <!-- red -->
		<player-bar />
		<kill-feed />
	</div>
</template>

<style lang="css">
.container {
	display: grid;
	height: 100vh;
	grid-template-columns: 538px auto 538px;
	grid-template-rows: 1fr 1fr;
	text-align: center;
}

.dashes {
	display: flex;
	height: 21px;
	justify-content: space-between;
	position: relative;
	width: 100%;
}

.dashes .dash {
	height: 100%;
	position: relative;
	width: 21px;
}

.dashes .dash--max {
	width: 11px;
}

.dashes .dashes_fill {
	background-color: rgba(255, 255, 255, 0.6);
	display: block;
	height: 100%;
	position: relative;
	transform: skew(-20deg);
	transition: width 0.1s ease-in-out;
	z-index: 5;
}

.dashes .dashes_track {
	background-color: rgba(255, 255, 255, 0.1);
	bottom: 0;
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
	transform: skew(-20deg);
	z-index: 1;
}

.player--dead .dashes_track {
	background-color: rgba(0, 0, 0, 0.2);
}

.healthBar {
	display: block;
	height: 21px;
	position: relative;
	width: 100%;
}

.healthBar .healthBar_life {
	background-color: rgba(255, 255, 255, 0.6);
	display: block;
	height: 100%;
	position: relative;
	transform: skew(20deg);
	transition: width 0.1s ease-in-out;
	z-index: 5;
}

.healthBar .healthBar_track {
	background-color: rgba(255, 255, 255, 0.1);
	bottom: -1px;
	left: -1px;
	position: absolute;
	right: -1px;
	top: -1px;
	transform: skew(20deg);
	z-index: 1;
}

.player--dead .healthBar .healthBar_track {
	background-color: rgba(0, 0, 0, 0.2);
}
</style>

<script setup lang="ts">
import { iconModes } from "@/interfaces/StoreInterfaces/StoreState";
import { useMatchStateStore } from "@/stores/MatchStateStore";
import { useSettingStore } from "@/stores/SettingsStore";
import { watch } from "vue";
import KillFeed from "./KillFeed.vue";
import PlayerBar from "./PlayerBar.vue";
import Scoreboard from "./Scoreboard.vue";
import Team from "./Team.vue";

const state = useMatchStateStore();
const settingState = useSettingStore();

let cancelRed: AbortController | null = null
let cancelBlue: AbortController | null = null

watch(() => state.RedTeamName, async () => {

	cancelRed?.abort()
	cancelRed = new AbortController();

	getTeamInfo(true, cancelRed.signal);
})

watch(() => state.BlueTeamName, async () => {
	cancelBlue?.abort()
	cancelBlue = new AbortController();

	getTeamInfo(false, cancelBlue.signal);
})

watch(() => settingState.IconSettings.iconMode, async () => {
	cancelBlue?.abort()
	cancelBlue = new AbortController();

	cancelRed?.abort()
	cancelRed = new AbortController();

	getTeamInfo(false, cancelBlue.signal);
	getTeamInfo(true, cancelRed.signal);
})

async function getTeamInfo(isRedTeam: boolean, signal: AbortSignal) {
	const teamName: string = isRedTeam ? state.RedTeamName : state.BlueTeamName;

	switch (settingState.IconSettings.iconMode) {
		case iconModes.dashLeague:
			{
				let team: Response
				try{
					team = await fetch(`https://dashleague.games/api/v1/team?teamName=${encodeURIComponent(teamName)}`, {
						method: 'GET',
						headers: {
							'X-User-Identifier': 'casting'
						},
						signal: signal
					});
				}catch{
					return
				}

				if(!team.ok){
					if(isRedTeam) state.$patch({RedTeamLogo: ""})
					else state.$patch({BlueTeamLogo: ""})
					return
				}

				let teamJson: any
				try{
					teamJson = await team.json();
				}
				catch{
					return
				}
				
				if (signal.aborted){
					return
				}

				if (!Object.hasOwn(teamJson, "logo")){
					return
				}

				if(isRedTeam) state.$patch({RedTeamLogo: teamJson.logo})
				else state.$patch({BlueTeamLogo: teamJson.logo})
			}
			break;
	
		default:
			break;
	}
}


</script>