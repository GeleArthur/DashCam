<template>
	<div class="container">
		<mini-map />

		<!-- <div class="teamContainer">
			<div class="redTeam">
				<new-player-tab
					v-for="(item, index) in redTeamList"
					:key="index"
					:spectatorIndex="$store.state.PlayerData.indexOf(item)"
				/>
			</div>
			<div class="blueTeam">
				<new-player-tab
					v-for="(item, index) in blueTeamList"
					:key="index"
					:spectatorIndex="$store.state.PlayerData.indexOf(item)"
				/>
			</div>
		</div> -->
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";
import playerInfo from "../models/playerInfo";
import NewPlayerTab from "./NewPlayerTab.vue";
import MiniMap from "./MiniMap.vue";

export default defineComponent({
    name:"PlayerLayout",
    components: {
		NewPlayerTab,
		MiniMap,
	},

	computed: mapState({
		redTeamList() {
			let data = this.$store.state.PlayerData as playerInfo[];
			return data.filter((e: playerInfo) => {
				return e.team == 0;
			});
		},
		blueTeamList() {
			let data = this.$store.state.PlayerData as playerInfo[];
			return data.filter((e: playerInfo) => {
				return e.team == 1;
			});
		},
	}),
});
</script>

<style scoped>
.blueTeam {
	justify-self: end;
}
.redTeam {
	justify-self: start;
}
.teamContainer {
	display: grid;
	grid-template-columns: auto auto;
}
</style>