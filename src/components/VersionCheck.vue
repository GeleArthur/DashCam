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

<script lang="ts">
import store from "@/store/store";
import { defineComponent } from "vue";
import { latestHyperBashVersion } from "../Util/ConstVars";

export default defineComponent({
	data() {
		return {
			display: false,
			timeLeft: 0,
		};
	},
	watch: {
		"$store.state.connection"(val) {
			if (val == "") {
				this.display = false;
				var timer = setInterval(()=>{
					this.checkVersion();
					clearInterval(timer);
				}, 1000);
			}
		},
	},
	methods: {
		checkVersion() {
			var currentVersion = store.state.version.replaceAll("\.","");
			var highestVersion = latestHyperBashVersion.replaceAll("\.","");

			if (highestVersion > currentVersion) {
				this.display = true;
				this.timeLeft = 20;
				this.startCountDown();
			}
		},

		startCountDown() {
			var interval = setInterval(() => {
				this.timeLeft -= 1;
				if (this.timeLeft <= 0) {
					this.display = false;
					clearInterval(interval);
				}
			}, 1000);
		},
	},
	computed: {
		latestHBVersion() {
			return latestHyperBashVersion;
		},
		currentHBVersion() {
			if(store.state.version == ""){
				return "unknown??"
			}

			return store.state.version;
		},
	},
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
