<template>
	<AdminBar @openHelp="() => openHelp = !openHelp" />
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
import { createWebsocketManager } from "./HyperBashLogic/WebsocketManager";
import { useMatchStateStore } from "./stores/MatchStateStore";
import AdminBar from "./components/AdminBar.vue";
import { initStore } from "./HyperBashLogic/HyperBashCalls";

const state = useMatchStateStore();

const openHelp = ref(false);

onMounted(() => {
	state.$reset();
	initStore();
	createWebsocketManager();
})
</script>

<style>
#app {
	font-family: "Roboto", sans-serif;
}

body {
	background: rgba(100, 100, 100, 1);
	margin: 0px;
	padding: 0px;
}
</style>
