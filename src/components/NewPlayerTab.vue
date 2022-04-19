<!-- next time everything should be split up in diffrent files-->
<template>
	<div
		class="player"
		:class="{
			'player__red': playerData.team == 0,
			'player__blue': playerData.team == 1,
			'player__dead' : playerData.isDead,
			'player__alive' : !playerData.isDead
		}"
	>
		<div class="player__name">{{ playerData.name }}</div>
		<div class="player__kills">{{ playerData.kills }}</div>
		<div class="player__deaths">{{ playerData.deads }}</div>
		<div class="player__dashes">
			<div class="dashes">
				<player-dashes
					v-for="index in maxDashes"
					:index="index"
					:playerData="playerData"
				/>
			</div>
		</div>
		<div class="player__health">
			<div class="healthBar">
				<div class="healthBar__life" :style="healthBar"></div>
				<div class="healthBar__track"></div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="css">
	.player{align-items:center;display:grid;font-size:20px;font-weight:700;grid-column-gap:20px;grid-template-columns:150px 23px 23px 69px 63px;}
	.player__name{grid-column-gap:10px;text-align:left;overflow:hidden;white-space:nowrap;}
	
	.player__dashes .dashes{height:13px;}
	
	.player__health{justify-content:start!important;}
	.player__health .healthBar{height:10px;}
	.player__health .healthBar .healthBar__life{transform:skew(0deg);}
	.player__health .healthBar .healthBar__track{transform:skew(0deg);}
</style>

<script lang="ts">
	import { defineComponent } from "vue";
	import { mapState } from "vuex";
	import PlayerDashes from "./PlayerDashes.vue";
	
	export default defineComponent({
		name: "NewPlayerTab",
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