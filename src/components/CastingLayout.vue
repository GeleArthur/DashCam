<template>
	<div class="container">
		
		<team :color="'blue'" :team="blueTeam" :teamID=0 />
		
		<scoreboard :matchInfo="matchInfo" />
		
		<team :color="'red'" :team="redTeam" :teamID=1 />
		
		<player-bar/>
		
		<kill-feed></kill-feed>
	</div>
</template>

<style lang="css">
	.container{display:grid;height:100vh;grid-template-columns:538px auto 538px;grid-template-rows:1fr 1fr;text-align:center;}
	
	.dashes{display:flex;height:21px;justify-content:space-between;position:relative;width:100%;}
	.dashes .dash{height:100%;position:relative;width:21px;}
	.dashes .dash--max{width:11px;}
	.dashes .dashes_fill{background-color:rgba(255,255,255,0.6);display:block;height:100%;position:relative;transform:skew(-20deg);transition:width 0.1s ease-in-out;z-index:5;}
	.dashes .dashes_track{background-color:rgba(255,255,255,0.1);bottom:0;left:0;position:absolute;right:0;top:0;transform:skew(-20deg);z-index:1;}
	.player--dead .dashes_track{background-color:rgba(0,0,0,0.2);}
	
	.healthBar{display:block;height:21px;position:relative;width:100%;}
	.healthBar .healthBar_life{background-color:rgba(255,255,255,0.6);display:block;height:100%;position:relative;transform:skew(20deg);transition:width 0.1s ease-in-out;z-index:5;}
	.healthBar .healthBar_track{background-color:rgba(255,255,255,0.1);bottom:-1px;left:-1px;position:absolute;right:-1px;top:-1px;transform:skew(20deg);z-index:1;}
	.player--dead .healthBar .healthBar_track{background-color:rgba(0,0,0,0.2);}
</style>

<script lang="ts">
	import { defineComponent } from "vue";
	import { mapMutations, mapState } from "vuex";
	import KillFeed from "./KillFeed.vue";
	import PlayerBar from "./PlayerBar.vue";
	import Scoreboard from "./Scoreboard.vue";
	import Team from "./Team.vue";
	
	export default defineComponent({
		name:"CastingLayout",
		data() {
			return {
				redTeam: {},
				blueTeam: {},
				redTeamInfo:{
					logo:""
				},
				blueTeamInfo:{
					logo:""
				}
			};
		},
		components: {
			KillFeed,
			Team,
			Scoreboard,
			PlayerBar
		},
		watch:{
			matchInfo(newValue, oldValue){
				this.getTeamInfo();
			}
		},
		methods:{
			getTeamInfo(){
				if ( this.$store.state.matchInfo.redTeamName == undefined || this.$store.state.matchInfo.blueTeamName == undefined ) return;
				// Replace with dashleague.games once we release
				fetch(`/dash/wp-json/api/v1/public/data?data=teams&team=${this.$store.state.matchInfo.redTeamName}`).then(async (redTeam)=>{
					let redJson = await redTeam.json();
					
					this.redTeam = redJson.data;
					
					this.redTeamInfo.logo = redJson.data.logo;
				});
				
				fetch(`/dash/wp-json/api/v1/public/data?data=teams&team=${this.$store.state.matchInfo.blueTeamName}`).then(async (blueTeam)=>{
					let blueJson = await blueTeam.json();
					
					this.blueTeam = blueJson.data;
					
					this.blueTeamInfo.logo = blueJson.data.logo;
				});
			}
		},
		computed: mapState({
			matchInfo() {
				return this.$store.state.matchInfo;
			},
		}),
	});
</script>