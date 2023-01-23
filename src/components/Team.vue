<template>
	<div class="team" :class="'team--'+teamColor, teamHasLogo ? 'team--dln' : ''">

		<div class="team_players" :class="'team_players--'+teamColor" v-if="players">
			<player v-for="(item, index) in players" :key="index" :playerID="$store.state.PlayerData.indexOf(item)" />
		</div>
		<div class="team_logo" v-if="teamHasLogo">
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

<script lang="ts">
import { teams } from "@/models/matchInfo";
import teamInfo from "@/models/teamInfo";
import store from "@/store/store";
import { defineComponent } from "vue";
import { mapState } from "vuex";
import playerInfo from "../models/playerInfo";
import Player from "./Player.vue";

export default defineComponent({
	name: "Team",
	components: {
		Player,
	},
	computed: {
		players(): playerInfo[] {
			let data = store.state.PlayerData;
			return data
				.filter((e: playerInfo) => e.isActive == true && e.team == this.team)
				.sort((p1: playerInfo, p2: playerInfo) => p2.score - p1.score);
		},
		teamColor(): string {
			if (this.team == teams.red) {
				return "red"
			} else {
				return "blue"
			}
		},
		teamHasLogo(): boolean {
			let teamInfo: teamInfo | undefined = store.getters.getTeam(this.team);
			if (teamInfo == undefined) {
				return false;
			}
			else {
				return teamInfo.logoFound;
			}
		},
		teamLogo(): string {
			if (store.state.settings.iconMode == 2) {
				return this.team == teams.blue ? store.state.settings.customBlueIcon : store.state.settings.customRedIcon;
			}

			let teamInfo: teamInfo | undefined = store.getters.getTeam(this.team);

			if (teamInfo == undefined) {
				return "";
			}

			return teamInfo.logoFound ?
				teamInfo.logo :
				""
		}
	},
	props: {
		team: {
			type: Number as () => teams, // https://github.com/kaorun343/vue-property-decorator/issues/202
			required: true,
		},
	},
});
</script>