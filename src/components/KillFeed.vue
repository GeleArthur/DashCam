<template>
	<div class="kill_feed">
		<div class="feed_item hide-after-seconds" v-for="kill in killsQueue" :key="kill.id">
			<div class="feed_players">
				<div class="feed_killer" :class="getTeamColor(kill.killerTeam)">
					<span class="name">{{ kill.killer }}</span>
				</div>
				<div class="feed_weapon">
					<img class="weapon_type" v-bind:src="getWeaponSvg(kill)" alt="image">
					<img class="headshot" v-if="kill.headShot" v-bind:src="getHeadshotSvg()" alt="image">
				</div>
				<div class="feed_victim" :class="getTeamColor(kill.victimTeam)">
					<span class="name">{{ kill.victim }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="css">
div {
	--color-background-dark: #1e1e1e;
	--color-text-white: white;
	--color-team-blue: #0045ff;
	--color-team-red: #ff0000;
	--padding-base: 2px;
	--font-size: 20px;

	--font-weight-light: 200;
	--font-weight-normal: 300;
	--font-weight-bold: 700;
	--font-weight-bolder: 900;
}

.kill_feed {
	grid-column: 3;
	grid-row: 2;
	margin-right: 10px;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
}

.kill_feed .feed_item {
	background-color: var(--color-background-dark);
	color: var(--color-text-white);
	opacity: .8;
	font-size: var(--font-size);
	font-weight: var(--font-weight-bold);
	margin-bottom: 5px;
}

.kill_feed .feed_item .feed_players {
	padding: var(--padding-base);
	opacity: 1;
	max-width: 450px;
	min-height: 30px;
	display: flex;
	flex-direction: row;
}

.kill_feed .feed_item .feed_players .feed_killer,
.kill_feed .feed_item .feed_players .feed_victim {
	width: max-content;
	padding: 5px 10px 5px 10px;
}

.kill_feed .feed_item .feed_players .feed_killer .name,
.kill_feed .feed_item .feed_players .feed_victim .name {
	font-weight: var(--font-weight-bold);
}

.kill_feed .feed_item .feed_players .feed_killer {
	text-align: right;
}

.kill_feed .feed_item .feed_players .feed_victim {
	text-align: left;
}

.kill_feed .feed_item .feed_players .feed_weapon {
	width: 90px;
	text-align: center;
	padding: 5px 0 0 0;
}

.kill_feed .feed_item .feed_players .feed_weapon .weapon_type,
.kill_feed .feed_item .feed_players .feed_weapon .headshot {
	height: 20px;
	width: auto;
}

.none {
	color: white;
}

.blue {
	color: var(--color-team-blue);
	font-weight: var(--font-weight-bold);
}

.red {
	color: var(--color-team-red);
	font-weight: var(--font-weight-bold);
}

.hide-after-seconds {
	animation-name: cssAnimation;
	animation-duration: 1s;
	animation-delay: 4s;
	animation-timing-function: ease-out;
	animation-fill-mode: forwards;
}

@keyframes cssAnimation {
	to {
		opacity: 0;
		width: 0;
		height: 0;
		overflow: hidden;
	}
}

</style>

<script lang="ts">
import { defineComponent } from "vue";
import killFeedData from "../models/HyperBashModels/killFeedData";
import store from "../store/store";
import { teams } from "../models/matchInfo";
import { getHeadshotIcon, getWeaponIcon } from "../Util/UtilFunctions";
import KillData from "../models/killDataInfo";

export default defineComponent({
	data() {
		return {
			killsQueue: [] as KillData[],
			killsQueueSize: 8
		};
	},
	mounted() {
		store.subscribe((mutation, state) => {
			if (mutation.type == "killFeed") {
				this.onPlayerKilled(mutation.payload);
			}
		});
	},
	methods: {
		onPlayerKilled(payload: killFeedData) {
			let kill = this.getPlayersTeamAndName(payload);

			if(kill == undefined) return;

			if (this.killsQueue.length >= this.killsQueueSize) {
				this.killsQueue.splice(0, 1);
			}
			this.killsQueue.push(kill);
		},
		getPlayersTeamAndName(payload: killFeedData): KillData | undefined {
			const randomId = Math.random().toString(36).substring(2,7)
			const killer = store.state.PlayerData[payload.killer];
			const victim = store.state.PlayerData[payload.victim];
			if(killer == undefined || victim == undefined)
				return undefined;

			return {
				id: randomId,
				killer: killer.name,
				killerTeam: killer.team,
				victim: victim.name,
				victimTeam: victim.team,
				headShot: payload.headShot,
				isAltFire: payload.isAltFire,
				weaponType: payload.weaponType
			};
		},
		// TODO manage deathmatch colors
		getTeamColor(team: number = -1) {
			return teams[team];
		},
		// TODO suicide show headshot svg but should be better svg icon
		getWeaponSvg(kill: KillData): string {
			return getWeaponIcon(kill.weaponType, kill.isAltFire);
		},
		getHeadshotSvg() {
			return getHeadshotIcon();
		}
	}
});
</script>
