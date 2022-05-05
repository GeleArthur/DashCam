<template>
	<div class="team" :class="[
		'team--'+color,
		team.name ? 'team--dln' : ''
	]">
		<div class="team_players" :class="'team_players--'+color" v-if="players">
			<player
				v-for="(item, index) in players"
				:key="index"
				:playerID="$store.state.PlayerData.indexOf(item)"
			/>
		</div>
		<div class="team_logo" v-if="team.logo">
			<img :src="team.logo" width="94" height="94">
		</div>
	</div>
</template>

<style scoped lang="css">
	.team{color:rgba(255,255,255,0.95);display:grid;grid-template-rows:20px 17px 77px auto;height:231px;width:538px;}
	.team_logo{grid-row:2 / span 2;}
	
	.team--blue{background:transparent url('../assets/dln-ui-team-blue.png') no-repeat scroll top left;grid-column:1;grid-template-columns:20px auto 94px;}
	.team--blue.team--dln{background-image:url('../assets/dln-ui-team-blue-dln.png');}
	.team--blue .team_logo{grid-column:3;}
	
	.team--red{background:transparent url('../assets/dln-ui-team-red.png') no-repeat scroll top right;grid-column:3;grid-template-columns:94px auto 20px;}
	.team--red.team--dln{background-image:url('../assets/dln-ui-team-red-dln.png');}
	.team--red .team_logo{grid-column:1;}
	
	.team_players{display:grid;grid-row:3;grid-template-columns:repeat(1,1fr);grid-template-rows:repeat(5,1fr);height:150px;row-gap:8px;width:402px;}
	.team_players--blue{grid-column:2;}
	.team_players--red{grid-column:2;justify-self:end;}
</style>

<script lang="ts">
	import { defineComponent } from "vue";
	import { mapState } from "vuex";
	import playerInfo from "../models/playerInfo";
	import Player from "./Player.vue";
	
	export default defineComponent({
		name: "Team",
		components: {
			Player,
		},
		computed: mapState({
			players() {
				let data = this.$store.state.PlayerData;
				return data
					.filter((e: playerInfo) => e?.team == this.teamID)
					.sort((p1: playerInfo, p2: playerInfo) => p2.score - p1.score);
			},
		}),
		props: {
			color: {
				type: String,
				required: true
			},
			teamID: {
				type: Number,
				required: true
			},
			team: {
				type: Object,
				required: true,
			},
		},
	});
</script>