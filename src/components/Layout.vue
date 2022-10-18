<template>
	<div class="container">
		<team :team="1" /> <!-- blue -->
		<scoreboard />
		<team :team="0" /> <!-- red -->
		<player-bar />
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

<script lang="ts">
import { teams } from "@/models/matchInfo";
import teamInfo from "@/models/teamInfo";
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";
import KillFeed from "./KillFeed.vue";
import PlayerBar from "./PlayerBar.vue";
import Scoreboard from "./Scoreboard.vue";
import Team from "./Team.vue";

export default defineComponent({
	name: "Layout",
	data() {
		return {
			timer: 0,
			// redTeam: {},
			// blueTeam: {},
		};
	},
	components: {
		KillFeed,
		Team,
		Scoreboard,
		PlayerBar
	},
	watch: {
		"$store.getters.redTeamName": {
			handler() {
				this.getTeamInfo(true);
			},
			deep: true,
		},
		"$store.getters.blueTeamName": {
			handler() {
				this.getTeamInfo(false);
			},
			deep: true,
		}
	},

	methods: {
		async getTeamInfo(updateRed: boolean) {
			const teamName: string = updateRed ? this.$store.getters.redTeamName : this.$store.getters.blueTeamName;
			let teamData = { name: teamName } as teamInfo

			// dashleague
			if (this.$store.state.settings.iconMode == 0) {
				let team = await fetch(`https://dashleague.games/wp-json/api/v1/public/data?data=teams&team=${teamName}`)
				let teamjson = await team.json();
				if (teamjson.data == false) {
					teamData.logoFound = false;
					teamData.extrasFound = false;
				}
				else {
					teamData.logoFound = true;
					teamData.logo = teamjson.data.logo;

					try {
						teamData.extrasFound = true;
						teamData.matches = teamjson.data.stats[0].matches;
						teamData.wins = teamjson.data.stats[0].wins;
						teamData.losses = teamjson.data.stats[0].losses;

						teamData.players = [];

						for (const player in teamjson.data.roster.players) {
							if (Object.prototype.hasOwnProperty.call(teamjson.data.roster.players, player)) {
								teamData.players.push(teamjson.data.roster.players[player].name)
							}
						}
					}
					catch (error) {
						teamData.extrasFound = false;
						console.log(`Failed to load extras for ${teamName}`)
					}


				}

			}
			console.log(teamData)

			this.$store.commit("setTeamData", { isRedTeam: updateRed, teamData: teamData })
		},
		scoreTimer(seconds: number) {
			var container = document.querySelector('.container') as HTMLDivElement;

			if (this.timer) clearInterval(this.timer);

			this.timer = setInterval(() => {
				if (container.classList.contains('container--scores')) {
					container.classList.remove('container--scores');
					this.scoreTimer(11000);
				}
				else {
					container.classList.add('container--scores');
					this.scoreTimer(6000);
				}
			}, seconds);
		}
	},
	computed: mapState({
		matchInfo() {
			return this.$store.state.matchInfo;
		},
	}),

});
</script>