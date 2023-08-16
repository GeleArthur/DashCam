<template>
	<div class="kill_feed">
		<div class="feed_item hide-after-seconds" :class="getTeamColor(kill.killerTeam)" v-for="kill in killsQueue" :key="kill.id">
			<div class="feed_players">
				<div class="feed_killer">
					<span class="name">{{ kill.killer }}</span>
				</div>
				<div class="feed_weapon">
					<img class="weapon_type" v-bind:src="getWeaponSvg(kill)" alt="image">
					<img class="headshot" v-if="kill.headShot" v-bind:src="headShot" alt="image">
				</div>
				<div class="feed_victim">
					<span class="name">{{ kill.victim }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
div {
	--color-background-dark: #1e1e1e;
	--color-text-white: white;
	--color-team-blue: #0045ff;
	--color-team-red: #ff0000;
	--padding-base: 2px;
	--font-size: 20px;
	--font-size-small: 16px;
	--font-weight-light: 200;
	--font-weight-normal: 300;
	--font-weight-bold: 700;
	--font-weight-bolder: 900;
}

.kill_feed{align-items:flex-end;display:flex;flex-direction:column;grid-column:3;grid-row:2;}
.kill_feed .feed_item{border-radius:.25em 0 0 .25em;font-size:var(--font-size-small);font-weight:var(--font-weight-bold);padding:.25em 0;}
.kill_feed .feed_item + .feed_item{margin-top:.25em;}
.kill_feed .feed_item.red{background-color:rgba(196,0,0,.4);color:#fff;}
.kill_feed .feed_item.blue{background-color:rgba(0,73,145,.4);color:#fff;}
.kill_feed .feed_item .feed_players{display:flex;flex-direction:row;max-width:450px;}
.kill_feed .feed_item .feed_players .feed_killer,
.kill_feed .feed_item .feed_players .feed_victim{width:max-content;padding:5px 10px 5px 10px;}
.kill_feed .feed_item .feed_players .feed_killer{text-align:right;}
.kill_feed .feed_item .feed_players .feed_victim{text-align:left;}
.kill_feed .feed_item .feed_players .name{font-weight:var(--font-weight-bold);line-height:var(--font-size-small);}
.kill_feed .feed_item .feed_players .feed_weapon{align-items:center;border-radius:.25em;display:flex;justify-content:center;padding:.25em;}
.kill_feed .feed_item .feed_players .feed_weapon img{display:inline-block;height:42px;width:42px;}
.kill_feed .feed_item .feed_players .feed_weapon img + img{margin-left:.5em;}
.kill_feed .feed_item .feed_players .feed_weapon .weapon_type,
.kill_feed .feed_item .feed_players .feed_weapon .headshot{height:20px;width:auto;}
.kill_feed .feed_item.red .feed_players .feed_weapon{background-color:rgba(196,0,0,.8);}
.kill_feed .feed_item.blue .feed_players .feed_weapon{background-color:rgba(0,73,145,.8);}

.none{color:white;}

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

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Teams } from "@/interfaces/StoreInterfaces/MatchInfo";
import { getWeaponIcon } from "../Util/UtilFunctions";
import KillData from "@/interfaces/StoreInterfaces/KillFeedEntry";
import { KillFeedLayout } from "@/interfaces/HyperBashMessages.interface";
import { useMatchStateStore } from "@/stores/MatchStateStore";
import { EventKillFeed } from "@/HyperBashLogic/HyperBashEvents";
import headShot from "@/assets/weapons/head-shot.svg"

const state = useMatchStateStore();

const killsQueue = ref([] as KillData[]);
const killsQueueSize = ref(8);

onMounted(() => {
	EventKillFeed.subscribe(onPlayerKilled);
});

function onPlayerKilled(payload: KillFeedLayout) {
	let kill = getPlayersTeamAndName(payload);
	if (kill == undefined) return;

	if (killsQueue.value.length >= killsQueueSize.value) {
		killsQueue.value.splice(0, 1);
	}
	killsQueue.value.push(kill);
}
function getPlayersTeamAndName(payload: KillFeedLayout): KillData | undefined {
	const randomId = Math.random().toString(36).substring(2, 7)
	const killer = state.PlayerData[payload.killer];
	const victim = state.PlayerData[payload.victim];
	if (killer == undefined || victim == undefined)
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
}
// TODO manage deathmatch colors
function getTeamColor(team: number = -1) {
	return Teams[team];
}
// TODO suicide show headshot svg but should be better svg icon
function getWeaponSvg(kill: KillData): string {
	return getWeaponIcon(kill.weaponType, kill.isAltFire);
}
</script>
