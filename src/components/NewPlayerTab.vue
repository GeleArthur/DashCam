<style>
	.player{
		align-items:center;
		display:grid;
		grid-template-columns: 150px 23px 23px 63px 63px;
		grid-column-gap:20px;
	}
	.player__name{grid-column-gap:10px;text-align:left;}
</style>
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
		<div class="player__health">{{ playerData.health }}</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { mapState } from "vuex";
	
	export default defineComponent({
		name: "NewPlayerTab",
		computed: mapState({
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

<style scoped lang="scss">
	.player{
		font-weight:700;
		font-size:20px;
	}
</style>
