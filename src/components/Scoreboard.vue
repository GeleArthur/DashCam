<template>
	<div class="scoreboard">
		<div class="scoreboard__wrapper">
			<div class="scoreboard__name scoreboard__name--blue">{{ blueTeamName }}</div>
			<div class="scoreboard__score scoreboard__score--blue">
				{{ blueTeamScore }}<span v-if="matchInfo.matchtype === 1">%</span>
			</div>
			<div class="scoreboard__mode scoreboard__mode--blue" v-if="matchInfo.matchtype">
				<div class="mode mode--payload" v-if="matchInfo.matchtype === 1">
					<div class="rider" v-for="index in matchInfo.payload.amountBlueOnCart">
						{{index}}
					</div>
				</div>
				
				<div class="mode mode--domination" v-if="matchInfo.matchtype === 2">
					<div v-if="matchInfo.domination.pointA == teams.blue">
						A
					</div>
					<div v-if="matchInfo.domination.pointB == teams.blue">
						B
					</div>
					<div v-if="matchInfo.domination.pointC == teams.blue">
						C
					</div>
				</div>
				
				<div class="mode mode--payload" v-if="matchInfo.matchtype === 3">
					<div v-if="matchInfo.controlPoint.TeamScoringPoints == teams.blue">
						Scoring
					</div>
				</div>
			</div>
			<div class="scoreboard__time" v-if="matchInfo.matchtype">
				<div v-if="matchInfo.matchtype === 2 && matchInfo.domination.countDownTimer >= 0">
					{{matchInfo.domination.countDownTimer}}
				</div>
				
				<div v-else>
					{{matchInfo.timer}}
				</div>
			</div>
			<div class="scoreboard__name scoreboard__name--red">{{ redTeamName }}</div>
			<div class="scoreboard__score scoreboard__score--red">
				{{ redTeamScore }}<span v-if="matchInfo.matchtype === 1">%</span>
			</div>
			<div class="scoreboard__mode scoreboard__mode--red">
				<div class="mode mode--payload" v-if="matchInfo.matchtype === 1">
					<div v-if="matchInfo.payload.cartBlockedByRed">
						contested
					</div>
				</div>
				
				<div v-if="matchInfo.matchtype === 2">
					<div v-if="matchInfo.domination.pointA == teams.red">
						A
					</div>
					<div v-if="matchInfo.domination.pointB == teams.red">
						B
					</div>
					<div v-if="matchInfo.domination.pointC == teams.red">
						C
					</div>
				</div>
				
				<div class="mode mode--payload" v-if="matchInfo.matchtype === 3">
					<div v-if="matchInfo.controlPoint.TeamScoringPoints == teams.red">
						Scoring
					</div>
				</div>
			</div>
			<div>
				<div v-if="matchInfo.matchtype === 1">Payload</div>
				<div v-else-if="matchInfo.matchtype === 2">Domination</div>
				<div v-else-if="matchInfo.matchtype === 3">Control Point</div>
				<div v-else>Lobby</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="css">
	.scoreboard{display:flex;grid-column:2;grid-row:1;justify-content:center;}
	.scoreboard__wrapper {
		background: transparent url('../assets/dln-ui-scoreboard.png') no-repeat scroll 0 0;
		color: #fff;
		display: grid;
		grid-column-start: 2;
		grid-template-columns: 122px 12px 70px 7px 105px 71px 12px auto;
		grid-template-rows: 17px 9px 29px 11px 4px auto;
		height: 106px;
		margin-top: 1em;
		width: 523px;
	}
	.scoreboard__wrapper > div{align-items:center;display:flex;justify-content:center;}
	.scoreboard__name{font-size:30px;font-weight:800;grid-row:3 / span 3;}
	.scoreboard__name--blue{grid-column:1;}
	.scoreboard__name--red{grid-column:-2;}
	.scoreboard__score{font-size:24px;font-weight:700;grid-row:2 / span 2;}
	.scoreboard__score--blue{grid-column:3 / span 2;}
	.scoreboard__score--red{grid-column:6;}
	.scoreboard__time{font-size:30px;font-weight:800;grid-column:4 / span 2;grid-row:5 / span 2;text-align:center;}
	.scoreboard__mode{grid-row:6;}
	.scoreboard__mode--blue{grid-column:1 / span 3;}
	.scoreboard__mode--red{grid-column:6 / span 3;}
</style>

<script lang="ts">
	import { defineComponent } from "vue";
	import { mapState } from "vuex";
	import Player from "./Player.vue";
	import { teams } from "../models/matchInfo";
	
	export default defineComponent({
		name: "Scoreboard",
		computed: mapState({
			players() {
				if ( this.$store.state.PlayerData[0] == undefined ) return false;
				
				let data = this.$store.state.PlayerData as playerInfo[];
				
				return data.filter((e: playerInfo) => e?.team == this.teamID);
			},
			redTeamScore() {
				return this.$store.state.matchInfo.redScore ? this.$store.state.matchInfo.redScore : 0;
			},
			redTeamName() {
				return this.$store.state.matchInfo.redTeamName ? this.$store.state.matchInfo.redTeamName : 'RED';
			},
			blueTeamScore() {
				return this.$store.state.matchInfo.blueScore ? this.$store.state.matchInfo.blueScore : 0;
			},
			blueTeamName() {
				return this.$store.state.matchInfo.blueTeamName ? this.$store.state.matchInfo.blueTeamName : 'BLUE';
			},
			teams() {
				return teams;
			},
			timer() {
				// dont do it like this
				var min = this.$store.state.matchInfo.timer / 60;
				var sec = (min % 1) * 60;
				
				min = Math.floor(min);
				sec = Math.floor(sec);
				
				let minstring : string;
				let secstring : string;
				
				if ( min < 10 ) {
					minstring = "0" + min;
				}
				else {
					minstring = min.toString();
				}
				
				if ( sec < 10 ) {
					secstring = "0" + sec;
				}
				else {
					secstring = sec.toString();
				}
				
				return `${minstring}:${secstring}`;
			}
		}),
		props: {
			matchInfo: {
				type: Object,
				required: true,
			},
		},
	});
</script>