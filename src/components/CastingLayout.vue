<template>
	<div class="container">
		<div class="team team--blue">
			<div class="team__players team__players--blue">
				<player
					v-for="(item, index) in blueTeamList"
					:key="index"
					:playerID="$store.state.PlayerData.indexOf(item)"
				/>
			</div>
			<div class="team__logo" v-if="blueTeamName">
				<img :src="blueTeamInfo.logo" width="94" height="94">
			</div>
		</div>
		
		<div class="scoreboard">
			<div class="scoreboard__wrapper">
				<div class="scoreboard__name scoreboard__name--blue">{{ blueTeamName }}</div>
				<div class="scoreboard__score scoreboard__score--blue">{{ blueTeamScore }}</div>
				<div class="scoreboard__time">{{matchInfo.timer}}</div>
				<div class="scoreboard__name scoreboard__name--red">{{ redTeamName }}</div>
				<div class="scoreboard__score scoreboard__score--red">{{ redTeamScore }}</div>
			</div>
		</div>
		
		<div class="team team--red">
			<div class="team__logo" v-if="redTeamName">
				<img :src="redTeamInfo.logo" width="94" height="94">
			</div>
			<div class="team__players team__players--red">
				<player
					v-for="(item, index) in redTeamList"
					:key="index"
					:playerID="$store.state.PlayerData.indexOf(item)"
				/>
			</div>
		</div>
		
		<div
			class="playerBar"
			:class="[
				selectedPlayer.team == 0 ? 'playerBar--red' : 'playerBar--blue'
			]"
			v-if="$store.state.selectedIndex >= 0">
			<div class="playerBar_wrapper">
				<div class="playerBar__dashes">
					<div class="player__dashes">
						<div class="dashes">
							<player-dashes
								v-for="index in maxDashes"
								:index="index"
								:playerData="selectedPlayer"
							/>
						</div>
					</div>
				</div>
				<div class="playerBar__score">{{selectedPlayer.score}}</div>
				<div class="playerBar__health">
					<div class="healthBar">
						<div class="healthBar__life" :style="healthBar"></div>
						<div class="healthBar__track"></div>
					</div>
				</div>
				<div class="playerBar__kills">{{selectedPlayer.kills}}</div>
				<div class="playerBar__name">
					<svg width="336px" height="37px" viewBox="0 0 336 37" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
						<g transform="translate(-791.000000, -999.000000)">
							<g transform="translate(-55.708529, -0.000000)">
								<g transform="translate(754.000000, 947.992966)">
									<polygon fill="#0045FF" transform="translate(260.622744, 69.507034) scale(1, -1) translate(-260.622744, -69.507034) " points="93 61.8724816 105.024286 51.0070335 416.332343 51.0070335 428.245488 61.8724816 417.32872 88.0070335 103.956467 88.0070335"></polygon>
								</g>
							</g>
						</g>
					</svg>
					<span>{{selectedPlayer.name}}</span>
				</div>
				<div class="playerBar__deaths">{{selectedPlayer.deads}}</div>
			</div>
		</div>
		<kill-feed></kill-feed>
	</div>
</template>

<style lang="css">
	.container{display:grid;height:100vh;grid-template-columns:538px auto 538px;grid-template-rows:1fr 1fr;text-align:center;}
	.dashes{display:flex;height:21px;justify-content:space-between;position:relative;width:100%;}
	.dashes .dash{height:100%;position:relative;width:21px;}
	.dashes .dash--max{width:11px;}
	.dashes .dashes__fill{background-color:rgba(255,255,255,0.6);display:block;height:100%;position:relative;transform:skew(-20deg);transition:width 0.1s ease-in-out;z-index:5;}
	.dashes .dashes__track{background-color:rgba(255,255,255,0.1);bottom:0;left:0;position:absolute;right:0;top:0;transform:skew(-20deg);z-index:1;}
	.player--dead .dashes__track{background-color:rgba(0,0,0,0.2);}
	
	.healthBar{display:block;height:21px;position:relative;width:100%;}
	.healthBar .healthBar__life{background-color:rgba(255,255,255,0.6);display:block;height:100%;position:relative;transform:skew(20deg);transition:width 0.1s ease-in-out;z-index:5;}
	.healthBar .healthBar__track{background-color:rgba(255,255,255,0.1);bottom:-1px;left:-1px;position:absolute;right:-1px;top:-1px;transform:skew(20deg);z-index:1;}
	.player--dead .healthBar .healthBar__track{background-color:rgba(0,0,0,0.2);}
	
	.team{color:rgba(255,255,255,0.95);display:grid;grid-template-rows:20px 17px 77px auto;height:231px;width:538px;}
	.team__logo{grid-row:2 / span 2;}

	.team--blue{background:transparent url('../assets/dln-ui-team-blue.png') no-repeat scroll top left;grid-template-columns:20px auto 94px;}
	.team--blue .team__logo{grid-column:3;}
	.team--red{background:transparent url('../assets/dln-ui-team-red.png') no-repeat scroll top right;grid-template-columns:94px auto 20px;}
	.team--red .team__logo{grid-column:1;}

	.team__players{display:grid;grid-row:3;grid-template-columns:repeat(1,1fr);grid-template-rows:repeat(5,1fr);height:150px;row-gap:8px;width:402px;}
	.team__players--blue{grid-column:2;}
	.team__players--red{grid-column:2;justify-self:end;}

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

	.playerBar{align-items:end;display:flex;grid-column:2;grid-row:-1;justify-content:center;margin-bottom:1em;}
	.playerBar_wrapper {
		background: transparent url('../assets/dln-ui-player-bar.png') no-repeat scroll 0 0;
		color: #fff;
		display: grid;
		grid-template-columns: 45px 5px 43px 83px 16px 138px 19px 80px 36px 11px auto;
		grid-template-rows: 8.5px 21px 6px 7px 9px 30px 8px 3px;
		height: 93px;
		width: 523px;
	}
	.playerBar_wrapper > div{align-items:center;display:flex;justify-content:center;}
	.playerBar__dashes{grid-column:3 / span 2;grid-row:2;}
	.playerBar__dashes .player__dashes{margin:0 5px;width:100%;}
	.playerBar__dashes .dash--max{width:21px;}
	.playerBar__dashes .dash--normal{width:37px;}
	.playerBar__score{font-size:24px;font-weight:700;grid-column:6;grid-row:2 / span 3;}
	.playerBar__health{grid-column:8 / span 2;grid-row:2;justify-content:start!important;}
	.playerBar__kills{font-size:24px;font-weight:700;grid-column:2 / span 2;grid-row:4 / span 3;}
	.playerBar__deaths{font-size:24px;font-weight:700;grid-column:9 / span 2;grid-row:4 / span 3;}
	.playerBar__name{font-size:30px;font-weight:800;grid-column:4 / span 5;grid-row:6 / span 2;position:relative;}
	.playerBar__name span{position:relative;z-index:10;}
	.playerBar__name svg{position:absolute;left:0;}
	.playerBar--red polygon{fill:#FF0000;}
</style>

<script lang="ts">
	import { defineComponent } from "vue";
	import { mapMutations, mapState } from "vuex";
	import playerInfo from "../models/playerInfo";
	import PlayerDashes from "./PlayerDashes.vue";
	import Player from "./Player.vue";
	import KillFeed from "./KillFeed.vue";
	
	export default defineComponent({
		name:"CastingLayout",
		data() {
			return {
				redTeamInfo:{
					logo:""
				},
				blueTeamInfo:{
					logo:""
				}
			};
		},
		components: {
			Player,
			PlayerDashes,
			KillFeed
		},
		watch:{
			matchInfo(newValue, oldValue){
				this.getTeamInfo();
			}
		},

		methods:{
			getTeamInfo(){
				if(this.$store.state.matchInfo.redTeamName == undefined || this.$store.state.matchInfo.blueTeamName == undefined) return;
				// Replace with dashleague.games once we release
				fetch(`/dash/wp-json/api/v1/public/data?data=teams&team=${this.$store.state.matchInfo.redTeamName}`).then(async (redTeam)=>{
					let redJson = await redTeam.json();
					this.redTeamInfo.logo = redJson.data.logo;
				})
				fetch(`/dash/wp-json/api/v1/public/data?data=teams&team=${this.$store.state.matchInfo.blueTeamName}`).then(async (blueTeam)=>{
					let blueJson = await blueTeam.json();
					this.blueTeamInfo.logo = blueJson.data.logo;
				})
			}
		},
		computed: mapState({
			redTeam() {
				if ( this.$store.state.matchInfo.redTeamName ) {
					// call api https://dashleague.games/wp-json/api/v1/public/data?data=teams&team=teamName
				}
			},
			redTeamScore() {
				return this.$store.state.matchInfo.redScore ? this.$store.state.matchInfo.redScore : 0;
			},
			redTeamName() {
				return this.$store.state.matchInfo.redTeamName ? this.$store.state.matchInfo.redTeamName : 'RED';
			},
			redTeamList() {
				let data = this.$store.state.PlayerData as playerInfo[];
				return data.filter((e: playerInfo) => e?.team == 0);
			},
			blueTeamScore() {
				return this.$store.state.matchInfo.blueScore ? this.$store.state.matchInfo.blueScore : 0;
			},
			blueTeamName() {
				return this.$store.state.matchInfo.blueTeamName ? this.$store.state.matchInfo.blueTeamName : 'BLUE';
			},
			blueTeamList() {
				let data = this.$store.state.PlayerData as playerInfo[];
				return data.filter((e: playerInfo) => e?.team == 1);
			},
			selectedPlayer() {
				var player = this.$store.state.PlayerData[this.$store.state.selectedIndex];
				
				if ( player == undefined ) {
					// Not good error prevting should be something better
					return {dash:0, score:0, kills:0, name:"", deads:0} as playerInfo
				} else {
					return this.$store.state.PlayerData[this.$store.state.selectedIndex];
				}
			},
			healthBar() {
				var player = this.$store.state.PlayerData[this.$store.state.selectedIndex];
				
				return {
					width: `${player.health}%`
				};
			},
			matchInfo() {
				return this.$store.state.matchInfo;
			},
			maxDashes() {
				var player = this.$store.state.PlayerData[this.$store.state.selectedIndex];
				
				return player.dashPickup ? 5 : 3;
			},
			// waiting for API from dashleague
			// blueLogo() {
			// 	if(this.$store.state.matchInfo.blueTeamName == undefined) return "";
			// 	return `https://dashleague.games/wp-content/uploads/2021/01/team-${this.$store.state.matchInfo.blueTeamName.toLowerCase()}-256x256@2x.png`
			// },
			// redLogo() {
			// 	console.log(this.$store.state.matchInfo.redTeamName);
			// 	if ( this.$store.state.matchInfo.redTeamName == undefined ) return "";
			// 	return `https://dashleague.games/wp-content/uploads/2021/01/team-${this.$store.state.matchInfo.redTeamName.toLowerCase()}-256x256@2x.png`
			// },
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
	});
</script>