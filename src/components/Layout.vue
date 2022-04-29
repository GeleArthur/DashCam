<template>
	<div class="container">
		<team :color="'blue'" :team="blueTeam" :teamID="1" />
		<scoreboard />
		<team :color="'red'" :team="redTeam" :teamID="0" />
		<player-bar/>
		<!-- <kill-feed/> -->
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
		name:"Layout",
		data() {
			return {
				timer: 0,
				redTeam: {},
				blueTeam: {},
			};
		},
		components: {
			KillFeed,
			Team,
			Scoreboard,
			PlayerBar
		},
		mounted() {
			this.scoreTimer(11000);
		},
		watch:{
			"$store.getters.redTeamName"(val){
				this.getTeamInfo();
			},
			"$store.getters.blueTeamName"(val){
				this.getTeamInfo();
			}
		},

		methods:{
			getTeamInfo(){
				if ( this.$store.state.matchInfo.redTeamName == undefined || this.$store.state.matchInfo.blueTeamName == undefined ) return;
				fetch(`/wp-json/api/v1/public/data?data=teams&team=${this.$store.getters.redTeamName}`).then(async (redTeam)=>{
					let redJson = await redTeam.json();
					this.redTeam = redJson.data;
				});
				
				fetch(`/wp-json/api/v1/public/data?data=teams&team=${this.$store.getters.blueTeamName}`).then(async (blueTeam)=>{
					let blueJson = await blueTeam.json();
					this.blueTeam = blueJson.data;
				});
			},
			scoreTimer( seconds: number ) {
				var container = document.querySelector('.container') as HTMLDivElement;
				
				if ( this.timer ) clearInterval(this.timer);
				
				this.timer = setInterval(() => {
					if ( container.classList.contains('container--scores') ) {
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