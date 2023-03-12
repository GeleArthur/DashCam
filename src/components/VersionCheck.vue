<template>
	<div v-if="display">
		<div class="modal">
			<div class="modal_wrapper">
				<div class="modal_content">
					<h1>Update HyperBash</h1>
					<p>
						You are currently running {{ currentHBVersion }}. please update to
						{{ latestHBVersion }}
					</p>
					<p class="highlight">
						{{ currentHBVersion }} -> {{ latestHBVersion }}
					</p>
					<p>This message will disappear in {{ timeLeft }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { WebsocketStatusTypes } from "@/interfaces/StoreInterfaces/StoreState";
import { useMatchStateStore } from "@/stores/MatchStateStore";
import { useSettingStore } from "@/stores/SettingsStore";
import { MutationType } from "pinia";
import { ref, watch, computed } from "vue";
import { latestHyperBashVersion } from "../Util/ConstVars";

const state = useMatchStateStore();
const settingsState = useSettingStore();

const display = ref(false);
const timeLeft = ref(0);

watch(() => state.WebsocketStatus, (connection) => {
	if (connection == WebsocketStatusTypes.connected) {
		display.value = false;
		var timer = setInterval(() => {
			checkVersion();
			clearInterval(timer);
		}, 1000);
	}
})

function checkVersion() {
	var currentVersion = settingsState.Version.replaceAll("\.", "");
	var highestVersion = latestHyperBashVersion.replaceAll("\.", "");

	if (highestVersion > currentVersion) {
		display.value = true;
		timeLeft.value = 20;
		startCountDown();
	}
}

function startCountDown() {
	var interval = setInterval(() => {
		timeLeft.value -= 1;
		if (timeLeft.value <= 0) {
			display.value = false;
			clearInterval(interval);
		}
	}, 1000);
}

const latestHBVersion = computed(() => {
	return latestHyperBashVersion;
})
const currentHBVersion = computed(() => {
	if (settingsState.Version == "") {
		return "unknown??"
	}

	return settingsState.Version;
});
</script>

<style scoped lang="css">
.modal {
	align-items: center;
	bottom: 0;
	display: flex;
	justify-content: center;
	left: 0;
	position: fixed;
	right: 0;
	top: 0;
	z-index: 6;
}

.modal:before {
	background-color: rgba(0, 0, 0, 0.3);
	bottom: 0;
	content: "";
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
	z-index: 1;
}

.modal_wrapper {
	height: 90vh;
	position: relative;
	width: 800px;
	z-index: 1;
}

.modal_content {
	background-color: #fff;
	border: red 10px;
	border-style: solid;
	padding: 2em;
	text-align: center;
}

.modal h1 {
	margin-top: 0;
}

.highlight {
	font-size: x-large;
}
</style>
