<template>
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
	import { mapState } from "vuex";
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
					return this.$store.state.PlayerData[this.$store.state.selectedIndex];
				}
			},
			healthBar() {
				var player = this.$store.state.PlayerData[this.$store.state.selectedIndex];
				
				return {
					width: `${player.health}%`
				};
			},
			maxDashes() {
				var player = this.$store.state.PlayerData[this.$store.state.selectedIndex];
				
				return player.dashPickup ? 5 : 3;
			},
		}),
		// props: {
		// 	matchInfo: {
		// 		type: Object,
		// 		required: true,
		// 	},
		// },
	});
</script>