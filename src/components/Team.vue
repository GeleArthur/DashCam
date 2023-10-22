<template>
	<div class="team" :class="'team--' + teamColor, teamData.logoFound ? 'team--dln' : ''">

		<div class="team_players" :class="'team_players--' + teamColor" v-if="players">
			<player v-for="(item, index) in players" :key="index" :playerID="state.GetPlayers.indexOf(item)" />
		</div>
		<div class="team_logo" v-if="teamData.logoFound">
			<img :src="teamLogo" width="94" height="94">
		</div>
	</div>
</template>

<style scoped lang="css">
.team {
	color: rgba(255, 255, 255, 0.95);
	display: grid;
	grid-template-rows: 20px 17px 77px auto;
	height: 231px;
	width: 538px;
}

.team_logo {
	grid-row: 2 / span 2;
}

.team--blue {
	background: transparent url('@/assets/dln-ui-team-blue.png') no-repeat scroll top left;
	grid-column: 1;
	grid-template-columns: 20px auto 94px;
}

.team--blue.team--dln {
	background-image: url('@/assets/dln-ui-team-blue-dln.png');
}

.team--blue .team_logo {
	grid-column: 3;
}

.team--red {
	background: transparent url('@/assets/dln-ui-team-red.png') no-repeat scroll top right;
	grid-column: 3;
	grid-template-columns: 94px auto 20px;
}

.team--red.team--dln {
	background-image: url('@/assets/dln-ui-team-red-dln.png');
}

.team--red .team_logo {
	grid-column: 1;
}

.team_players {
	display: grid;
	grid-row: 3;
	grid-template-columns: repeat(1, 1fr);
	grid-template-rows: repeat(5, 1fr);
	height: 150px;
	row-gap: 8px;
	width: 402px;
}

.team_players--blue {
	grid-column: 2;
}

.team_players--red {
	grid-column: 2;
	justify-self: end;
}
</style>

<script setup lang="ts">
import { MatchType, Teams } from "@/interfaces/StoreInterfaces/MatchInfo";
import { iconModes, PlayerStateInfo, TeamInfo } from "@/interfaces/StoreInterfaces/StoreState";
import { useMatchStateStore } from "@/stores/MatchStateStore";
import { useSettingStore } from "@/stores/SettingsStore";
import { computed } from "vue";
import Player from "./Player.vue";

const state = useMatchStateStore();
const settingsState = useSettingStore();

const players = computed(() => {
	let data = state.GetPlayers;

	if (state.GetMatchInfo.matchType == MatchType.Deathmatch) {

		var teamSort = data
			.filter((e: PlayerStateInfo) => e.isActive == true)
			.sort((p1: PlayerStateInfo, p2: PlayerStateInfo) => p2.score - p1.score);

		teamSort = teamSort.filter((e, index) => {
			if (props.team == Teams.blue) {
				if (index >= 0 && index <= 4) {
					return true;
				}
			} 
			else if (props.team == Teams.red) {
				if (index >= 5 && index <= 9) {
					return true;
				}
			}
			return false;
		})

		return teamSort;
	}

	return data
		.filter((e: PlayerStateInfo) => e.isActive == true && e.team == props.team)
		.sort((p1: PlayerStateInfo, p2: PlayerStateInfo) => p2.score - p1.score);
})

const teamColor = computed(() => {
	if (props.team == Teams.red) {
		return "red"
	} else {
		return "blue"
	}
})

const teamData = computed(() => {
	if (props.team == Teams.red) return state.GetTeamData.red;
	else return state.GetTeamData.blue;
})

const teamLogo = computed(() => {
	if (settingsState.IconSettings.iconMode == iconModes.custom) {
		return props.team == Teams.blue ? settingsState.IconSettings.customRedIcon : settingsState.IconSettings.customBlueIcon;
	}

	return teamData.value.logo;
})

const props = defineProps<{
	team: Teams,
}>()
</script>