<!-- next time everything should be split up in diffrent files-->
<template>
	<div
		class="player"
		:class="{
			'player--red': playerData.team == 0,
			'player--blue': playerData.team == 1,
			'player--dead' : playerData.isDead,
			'player--alive' : !playerData.isDead
		}"
	>
		<div class="player_name">{{ playerData.name }}</div>
		<div class="player_kills">{{ playerData.kills }}</div>
		<div class="player_deaths">{{ playerData.deads }}</div>
		<div class="player_dashes">
			<div class="dashes">
				<player-dashes
					v-for="index in maxDashes"
					:index="index"
					:playerData="playerData"
				/>
			</div>
		</div>
		<div class="player_health">
			<div class="healthBar">
				<div class="healthBar_life" :style="healthBar"></div>
				<div class="healthBar_track"></div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="css">
	.player{align-items:center;display:grid;font-size:20px;font-weight:700;grid-column-gap:20px;grid-template-columns:150px 23px 23px 69px 63px;}
	.player_name{grid-column-gap:10px;text-align:left;overflow:hidden;white-space:nowrap;}
	
	.player_dashes .dashes{height:13px;}
	
	.player_health{justify-content:start!important;}
	.player_health .healthBar{height:10px;}
	.player_health .healthBar .healthBar_life{transform:skew(0deg);}
	.player_health .healthBar .healthBar_track{transform:skew(0deg);}
	
	.player--dead .player_name,
	.player--dead .player_kills,
	.player--dead .player_deaths{opacity:0.5;}
</style>

<script lang="ts">
	import { defineComponent } from "vue";
	import { mapState } from "vuex";
	import PlayerDashes from "./PlayerDashes.vue";
	
	export default defineComponent({
		name: "Player",
		components: {
			PlayerDashes,
		},
		computed: mapState({
			healthBar() {
				return {
					width: this.$store.state.PlayerData[this.playerID].health + '%'
				};
			},
			playerData() {
				return this.$store.state.PlayerData[this.playerID];
			},
			maxDashes() {
				return this.$store.state.PlayerData[this.playerID].dashPickup ? 5 : 3;
			}
		}),
		props: {
			playerID: {
				type: Number,
				required: true,
			},
		},
	});
</script>