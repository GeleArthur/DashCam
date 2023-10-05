<template>
	<div class="kill_feed">
		<div class="feed_item hide-after-seconds" :class="getKillClass(kill)" v-for="kill in killsQueue" :key="kill.id">
			<div class="feed_players" >
				<div class="feed_killstreak" v-if="kill.killStreak > 2">
					{{ kill.killStreak }}x Killstreak
				</div>
				<div class="feed_killer">
					<span class="name">{{ kill.killer }}</span>
				</div>
				<div class="feed_weapon">
					<img class="weapon_type" v-bind:src="getWeaponSvg(kill)" alt="image">
					<img v-if="ifHeadSuicide(kill)" v-bind:src="ifHeadSuicide(kill, 'src')" alt="image">
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

.none{color:white;}

.kill_feed{align-items:flex-end;display:flex;flex-direction:column;grid-column:3;grid-row:2;}
.kill_feed .feed_item{font-size:var(--font-size-small);font-weight:var(--font-weight-bold);}
.kill_feed .feed_item + .feed_item{margin-top:.25em;}
.kill_feed .feed_item .feed_players{border-radius:.25em 0 0 .25em;display:flex;flex-direction:row;max-width:450px;padding:.25em 0;}

.kill_feed .feed_item .feed_players .feed_killer,
.kill_feed .feed_item .feed_players .feed_victim{width:max-content;padding:5px 10px 5px 10px;}
.kill_feed .feed_item .feed_players .feed_killer{text-align:right;}
.kill_feed .feed_item .feed_players .feed_victim{text-align:left;}
.kill_feed .feed_item .feed_players .name{font-weight:var(--font-weight-bold);line-height:var(--font-size-small);}
.kill_feed .feed_item .feed_players .feed_weapon{align-items:center;border-radius:.25em;display:flex;justify-content:center;padding:.25em;}
.kill_feed .feed_item .feed_players .feed_weapon img{display:inline-block;height:20px;width:auto;}
.kill_feed .feed_item .feed_players .feed_weapon img + img{margin-left:.5em;}
.kill_feed .feed_item .feed_players .feed_killstreak{ align-items:center; border-radius:.25em; display:flex; justify-content:center; padding:5px 10px; margin-left:.25em; white-space:nowrap; }

.kill_feed .feed_item.blue .feed_players .feed_killstreak{ background-color:rgba(0,73,145,.8); }
.kill_feed .feed_item.blue .feed_players .feed_weapon{background-color:rgba(0,73,145,.8);}
.kill_feed .feed_item.blue .feed_players{background-color:rgba(0,73,145,.4);color:#fff;}
.kill_feed .feed_item.blue.killstreak .feed_players{ animation: pulse-blue 2s infinite; }

.kill_feed .feed_item.red .feed_players .feed_killstreak{ background-color:rgba(196,0,0,.8); }
.kill_feed .feed_item.red .feed_players .feed_weapon{background-color:rgba(196,0,0,.8);}
.kill_feed .feed_item.red .feed_players{background-color:rgba(196,0,0,.4);color:#fff;}
.kill_feed .feed_item.red.killstreak .feed_players{ animation: pulse-red 2s infinite; }

@keyframes pulse-blue {
	0% {
		background-color:rgba(0, 73, 145, 0.6);
	}
	50% {
		background-color:rgba(0, 0, 0, 0.2);
	}
	100% {
		background-color:rgba(0, 73, 145, 0.6);
	}
}
@keyframes pulse-red {
	0% {
		background-color:rgba(196, 0, 0, 0.6);
	}
	50% {
		background-color:rgba(0, 0, 0, 0.2);
	}
	100% {
		background-color:rgba(196, 0, 0, 0.6);
	}
}

.hide-after-seconds {
	animation-name: cssAnimation;
	animation-duration: 1s;
	animation-delay: 4s;
	animation-timing-function: ease-out;
	animation-fill-mode: forwards;
}
.hide-after-seconds.killstreak {
	animation-delay: 5.5s;
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
import explosion from "@/assets/weapons/explosion.svg"

const state = useMatchStateStore();

const killsQueue = ref([] as KillData[]);
const killsQueueSize = ref(8);

onMounted(() => {
	EventKillFeed.subscribe(onPlayerKilled);
});

function ifHeadSuicide( kill: KillData, type: string ) {
	if ( type == 'src' ) {
		let explosives = [-1, 2, 11];
		return explosives.includes(kill.weaponType) ? explosion : headShot;
	}
	else return kill.headShot || kill.weaponType == -1;
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
		weaponType: payload.weaponType,
		killStreak: payload.killStreak
	} as KillData;
}
// TODO manage deathmatch colors
function getKillClass( kill: KillData ) {
	let classes = '';
	
	classes += Teams[kill.killerTeam];
	
	if ( kill.killStreak > 2 ) classes += ' killstreak';
	
	return classes;
}
function getWeaponSvg(kill: KillData): string {
	return getWeaponIcon(kill.weaponType, kill.isAltFire);
}
function onPlayerKilled(payload: KillFeedLayout) {
	let kill = getPlayersTeamAndName(payload);
	if (kill == undefined) return;

	if (killsQueue.value.length >= killsQueueSize.value) {
		killsQueue.value.splice(0, 1);
	}
	killsQueue.value.push(kill);
}
</script>
