<template>
	<div
		class="playerBar"
		:class="[
			selectedPlayer.team == 0 ? 'playerBar--red' : 'playerBar--blue'
		]"
		v-if="$store.state.selectedIndex >= 0">
		<div class="playerBar_wrapper">
			<div class="playerBar_dashes">
				<div class="player_dashes">
					<div class="dashes">
						<player-dashes
							v-for="index in maxDashes"
							:index="index"
							:playerData="selectedPlayer"
						/>
					</div>
				</div>
			</div>
			<div class="playerBar_score">{{score}}</div>
			<div class="playerBar_health">
				<div class="healthBar">
					<div class="healthBar_life" :style="healthBar"></div>
					<div class="healthBar_track"></div>
				</div>
			</div>
			<div class="playerBar_kills">{{selectedPlayer.kills}}</div>
			<div class="playerBar_name">
				<svg width="336px" height="37px" viewBox="0 0 336 37" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
					<g transform="translate(-791.000000, -999.000000)">
						<g transform="translate(-55.708529, -0.000000)">
							<g transform="translate(754.000000, 947.992966)">
								<polygon fill="#7E47A7" transform="translate(260.622744, 69.507034) scale(1, -1) translate(-260.622744, -69.507034) " points="93 61.8724816 105.024286 51.0070335 416.332343 51.0070335 428.245488 61.8724816 417.32872 88.0070335 103.956467 88.0070335"></polygon>
							</g>
						</g>
					</g>
				</svg>
				<span>{{selectedPlayer.name}}</span>
			</div>
			<div class="playerBar_deaths">{{selectedPlayer.deads}}</div>
		</div>
	</div>
</template>

<style scoped lang="css">
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
	.playerBar_dashes{grid-column:3 / span 2;grid-row:2;}
	.playerBar_dashes .player_dashes{margin:0 5px;width:100%;}
	.playerBar_dashes .dash--max{width:21px;}
	.playerBar_dashes .dash--normal{width:37px;}
	.playerBar_score{font-size:24px;font-weight:700;grid-column:6;grid-row:2 / span 3;}
	.playerBar_health{grid-column:8 / span 2;grid-row:2;justify-content:start!important;}
	.playerBar_kills{font-size:24px;font-weight:700;grid-column:2 / span 2;grid-row:4 / span 3;}
	.playerBar_deaths{font-size:24px;font-weight:700;grid-column:9 / span 2;grid-row:4 / span 3;}
	.playerBar_name{font-size:30px;font-weight:800;grid-column:4 / span 5;grid-row:6 / span 2;position:relative;}
	.playerBar_name span{position:relative;z-index:10;}
	.playerBar_name svg{position:absolute;left:0;}
	.playerBar--red polygon{fill:#C97033;}
</style>

<style>
	.playerBar_dashes .player_dashes .dashes_fill{background-color:rgba(34,192,255,0.8);}
	.playerBar_health .healthBar .healthBar_life{background-color:rgb(0,255,111,0.8);}
</style>

<script lang="ts">
	import { defineComponent } from "vue";
	import { mapState } from "vuex";
	import playerInfo from "../models/playerInfo";
	import PlayerDashes from "./PlayerDashes.vue";
	
	export default defineComponent({
		name: "PlayerBar",
		components: {
			PlayerDashes,
		},
		computed: mapState({
			selectedPlayer() {
				var player = this.$store.state.PlayerData[this.$store.state.selectedIndex];
				
				if ( player == undefined ) {
					// Not good error prevting should be something better
					return {dash:0, score:0, kills:0, name:"", deads:0} as playerInfo
				} else {
					return player;
				}
			},
			healthBar() {
				var player = this.$store.state.PlayerData[this.$store.state.selectedIndex];
				
				if(player == undefined) return {width: `100%`}

				return {
					width: `${player.health}%`
				};
			},
			maxDashes() {
				var player = this.$store.state.PlayerData[this.$store.state.selectedIndex];
				if(player == undefined) return 3;

				return player.dashPickup ? 5 : 3;
			},
			score() {
				var player = this.$store.state.PlayerData[this.$store.state.selectedIndex];
				if(player == undefined) return "0";

				return player.score.toLocaleString('en-US');
			}
		}),
		// props: {
		// 	matchInfo: {
		// 		type: Object,
		// 		required: true,
		// 	},
		// },
	});
</script>