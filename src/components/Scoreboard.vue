<template>
	<div class="scoreboard">
		<div class="scoreboard_wrapper">
			<div class="scoreboard_name scoreboard_name--blue">{{  $store.getters.blueTeamName }}</div>
			<div class="scoreboard_score scoreboard_score--blue">
				{{ blueTeamScore }}<span v-if="matchInfo.matchtype === matchType.Payload">%</span>
			</div>
			<div class="scoreboard_mode scoreboard_mode--blue" v-if="matchInfo.matchtype">
				<div class="mode mode--blue" :class="matchTypeClass">
					<div class="bars" v-if="matchInfo.matchtype === matchType.ControlPoint">
						<bar
							:index="teams.blue"
							:compare="'='"
							:value="matchInfo.controlPoint.TeamScoringPoints"
							:width="'100%'"
						/>
					</div>
					<div class="bars" v-else-if="matchInfo.matchtype === matchType.Domination">
						<bar
							:text="'A'"
							:index="teams.blue"
							:compare="'='"
							:value="matchInfo.domination.pointA"
						/>
						<bar
							:text="'B'"
							:index="teams.blue"
							:compare="'='"
							:value="matchInfo.domination.pointB"
						/>
						<bar
							:text="'C'"
							:index="teams.blue"
							:compare="'='"
							:value="matchInfo.domination.pointC"
						/>
					</div>
					<div class="bars" v-else-if="matchInfo.matchtype === matchType.Payload">
						<bar
							v-for="index in 3"
							:index="index"
							:compare="'<='"
							:value="matchInfo.payload.amountBlueOnCart"
							v-bind:key="index"
						/>
					</div>
				</div>
			</div>
			<div class="scoreboard_time" v-if="matchInfo.matchtype">
				<div v-if="matchInfo.matchtype === matchType.Domination && matchInfo.domination.teamCountDown != teams.none">
					{{matchInfo.domination.countDownTimer.toPrecision(3)}}
				</div>
				
				<div v-else>
					{{timer}}
				</div>
			</div>
			<div class="scoreboard_name scoreboard_name--red">{{ $store.getters.redTeamName }}</div>
			<div class="scoreboard_score scoreboard_score--red">
				{{ redTeamScore }}<span v-if="matchInfo.matchtype === matchType.Payload">%</span>
			</div>
			<div class="scoreboard_mode scoreboard_mode--red">
				<div class="mode mode--red" :class="matchTypeClass">
					<div class="bars" v-if="matchInfo.matchtype === matchType.ControlPoint">
						<bar
							:value="matchInfo.controlPoint.TeamScoringPoints"
							:compare="'='"
							:index="teams.red"
							:width="'100%'"
						/>
					</div>
					<div class="bars" v-else-if="matchInfo.matchtype === matchType.Domination">
						<bar
							:text="'A'"
							:value="matchInfo.domination.pointA"
							:compare="'='"
							:index="teams.red"
						/>
						<bar
							:text="'B'"
							:value="matchInfo.domination.pointB"
							:compare="'='"
							:index="teams.red"
						/>
						<bar
							:text="'C'"
							:value="matchInfo.domination.pointC"
							:compare="'='"
							:index="teams.red"
						/>
					</div>
					<div class="bars" v-else-if="matchInfo.matchtype === matchType.Payload">
						<bar
							:value="matchInfo.payload.cartBlockedByRed"
							:compare="'boolean'"
							:width="'100%'"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="css">
	.scoreboard{display:flex;grid-column:2;grid-row:1;justify-content:center;}
	.scoreboard_wrapper{background:transparent url('@/assets/dln-ui-scoreboard.png') no-repeat scroll 0 0;color:#fff;display:grid;grid-column-start:2;grid-template-columns:122px 12px 70px 7px 105px 71px 12px auto;grid-template-rows:17px 9px 29px 11px 4px auto;height:107px;margin-top:1em;width:523px;}
	.scoreboard_wrapper > div{align-items:center;display:flex;justify-content:center;}
	.scoreboard_name{font-size:30px;font-weight:800;grid-row:3 / span 3;}
	.scoreboard_name--blue{grid-column:1;}
	.scoreboard_name--red{grid-column:-2;}
	.scoreboard_score{font-size:24px;font-weight:700;grid-row:2 / span 2;}
	.scoreboard_score--blue{grid-column:3 / span 2;}
	.scoreboard_score--red{grid-column:6;}
	.scoreboard_time{font-size:30px;font-weight:800;grid-column:4 / span 2;grid-row:5 / span 2;text-align:center;}
	.scoreboard_mode{grid-row:6;}
	.scoreboard_mode--blue{grid-column:1 / span 3;justify-content:flex-end!important;}
	.scoreboard_mode--red{grid-column:6 / span 3;justify-content:flex-start!important;}
	
	.bars{display:flex;flex-direction:row;height:21px;justify-content:space-between;position:relative;width:102px;}
	
	.mode--controlpoint .bars{width:51px;}
	.mode--domination .bars{flex-direction:row;height:28px;}
	
	.mode--blue{padding-right:22px;}
	.mode--blue.mode--domination{padding-right:28px;}
	.mode--blue.mode--payload .bars{flex-direction:row-reverse;}
	
	.mode--red{padding-left:22px;}
	.mode--red.mode--domination{padding-left:28px;}
</style>

<script lang="ts">
	import { defineComponent } from "vue";
	import { mapState } from "vuex";
	import playerInfo from "../models/playerInfo";
	import { matchType, teams } from "../models/matchInfo";
	import Player from "./Player.vue";
	import Bar from "./Bar.vue";
	
	export default defineComponent({
		name: "Scoreboard",
		components: {
			Bar,
		},
		computed: mapState({
			players() {
				if ( this.$store.state.PlayerData[0] == undefined ) return false;
				
				let data = this.$store.state.PlayerData as playerInfo[];
				
				return data.filter((e: playerInfo) => e?.team == this.teamID);
			},
			redTeamScore() {
				return this.$store.state.matchInfo.redScore ? this.$store.state.matchInfo.redScore : 0;
			},
			blueTeamScore() {
				return this.$store.state.matchInfo.blueScore ? this.$store.state.matchInfo.blueScore : 0;
			},
			teams() {
				return teams;
			},
			matchTypeClass() {
				var mode = matchType[this.$store.state.matchInfo.matchtype] !== undefined ? matchType[this.$store.state.matchInfo.matchtype].toLowerCase() : false;
				
				return mode ? 'mode--' + mode : '';
			},
			matchType() {
				return matchType;
			},
			timer() {
				if(this.$store.state.matchInfo.timer == undefined) return "00:00"
				var timer = this.$store.state.matchInfo.timer,
						date  = new Date(0),
						mill  = timer % 1,
						mins  = (timer - mill) / 60,
						secs  = mins % 1;
						
				mins = mins - secs;
				secs = secs * 60;
				
				date.setMinutes(mins);
				date.setSeconds(secs, mill);
				
				var timeString = date.toISOString().substr(14, 5);
				
				return timeString;
			},
			matchInfo(){
				return this.$store.state.matchInfo;
			}
		})
	});
</script>