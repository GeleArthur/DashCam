<!-- next time everything should be split up in diffrent files-->
<template>
	<div
		:class="{
			'player player__red': playerData.team == 0,
			'player player__blue': playerData.team == 1,
		}"
	>
		<div class="player__name">{{ playerData.name }}</div>
		<div class="player__kills">{{ playerData.kills }}</div>
		<div class="player__deaths">{{ playerData.deads }}</div>
		<div class="player__dashes">{{ playerData.dash.toFixed(1) }}</div>
		<div class="player__health">
			<div class="healthBar">
				<div class="healthBar__life" :style="healthBar"></div>
				<div class="healthBar__track"></div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="css">
	.player {
		align-items: center;
		display: grid;
		grid-template-columns: 150px 23px 23px 63px 63px;
		grid-column-gap: 20px;
		font-weight: 700;
		font-size: 20px;
	}
	.player__name{grid-column-gap:10px;text-align:left;}
	.player__health{justify-content:start!important;}
	
	.player__health .healthBar{height:10px;}
	.player__health .healthBar .healthBar__life{
		background-color: rgba(255,255,255,0.75);
		transform: skew(0deg);
	}
	.player__health .healthBar .healthBar__track{
		transform: skew(0deg);
	}
	.player.dead .player__health .healthBar .healthBar__track{
		background-color: rgba(0,0,0,0.4);
	}
	.player__health:hover .healthBar .healthBar__life{width:33%!important;}
</style>

<script lang="ts">
	import { defineComponent } from "vue";
	import { mapState } from "vuex";
	
	export default defineComponent({
		name: "NewPlayerTab",
		computed: mapState({
			healthBar() {
				return {
					width: this.$store.state.PlayerData[this.spectatorIndex].health + '%'
				};
			},
			healthSize() {
				return this.$store.state.PlayerData[this.spectatorIndex].health + "%";
			},
			dashSize() {
				return (
					(
						(this.$store.state.PlayerData[this.spectatorIndex].dash / 3) *
						100
					).toString() + "%"
				);
			},
			playerData() {
				return this.$store.state.PlayerData[this.spectatorIndex];
			},
		}),
		props: {
			spectatorIndex: {
				type: Number,
				required: true,
			},
		},
	});
</script>