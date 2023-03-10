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
import store from "./store/store";
import { WebsocketStatusTypes } from "./interfaces/StoreInterfaces/StoreState";
import { CreateFakeData } from "@/TestingScripts"
import { createWebsocketManager } from "./WebsocketManager";
import {initStore} from "@/stores/HyperBashCalls"

const openHelp = ref(false);

function showHelp() {
	openHelp.value = !openHelp.value;
}

function switchTeam() {
	for (let i = 0; i < store.state.PlayerData.length; i++) {
		if (store.state.PlayerData[i].isActive) {
			store.commit("switchTeam", {
				playerID: i,
				team: !store.state.PlayerData[i].team, // Invert
			});
		}
	}
}

function AddFakeData() {
	CreateFakeData()
}

onMounted(()=>{
	store.commit("init");
	initStore();
	createWebsocketManager();
})

const ShouldDisplayDebugMenu = computed(() => {
	return store.state.WebsocketStatus != WebsocketStatusTypes.connected;
})

const ConnectingMessage = computed(() => {
	switch (store.state.WebsocketStatus) {
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
