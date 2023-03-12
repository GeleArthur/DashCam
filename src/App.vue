<template>
	<div id="admin" v-if=ShouldDisplayDebugMenu>
		<a>{{ ConnectingMessage }}</a>
		<button @click="AddFakeData">Fake Data</button>
		<button @click="showHelp">Help</button>
		<button @click="switchTeam">switchTeams</button>
	</div>
	<layout />
	<instructions v-if="openHelp" />
	<versionCheck />
	<Settings />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import Layout from "./components/Layout.vue";
import Instructions from "./components/Instructions.vue";
import versionCheck from "./components/VersionCheck.vue";
import Settings from "./components/Settings.vue";
import { WebsocketStatusTypes } from "./interfaces/StoreInterfaces/StoreState";
import { CreateFakeData } from "@/TestingScripts"
import { createWebsocketManager } from "./WebsocketManager";
import { hyperBashCalls, initStore } from "@/stores/HyperBashCalls"
import { useMatchStateStore } from "./stores/MatchStateStore";

const state = useMatchStateStore();

const openHelp = ref(false);

function showHelp() {
	openHelp.value = !openHelp.value;
}

function switchTeam() {
	for (let i = 0; i < state.PlayerData.length; i++) {
		if (state.PlayerData[i].isActive) {
			hyperBashCalls.switchTeam({
				playerID: i,
				team: !state.PlayerData[i].team, // Invert
			})
		}
	}
}

function AddFakeData() {
	CreateFakeData()
}

onMounted(() => {
	state.$reset();
	initStore();
	createWebsocketManager();
})

const ShouldDisplayDebugMenu = computed(() => {
	return state.WebsocketStatus != WebsocketStatusTypes.connected;
})

const ConnectingMessage = computed(() => {
	switch (state.WebsocketStatus) {
		case WebsocketStatusTypes.connected:
			return "";
		case WebsocketStatusTypes.connecting:
			return "Connecting";
		case WebsocketStatusTypes.disconnected:
			return "Failed. Enable websocket and restart HyperDash";
		default:
			return "Something broke????";
	}
})
</script>

<style>
#app {
	font-family: "Roboto", sans-serif;
}

#admin {
	background-color: rgba(0, 0, 0, 0.5);
	bottom: 0;
	color: #fff;
	display: grid;
	grid-template-columns: auto repeat(3, 100px);
	left: 0;
	padding: 1em;
	position: fixed;
	right: 0;
	z-index: 10;
	white-space: nowrap;
}

body {
	background: rgba(100, 100, 100, 1);
	margin: 0px;
	padding: 0px;
}
</style>
