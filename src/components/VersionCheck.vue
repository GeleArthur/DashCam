<template>
	<div v-if="display">
		<div class="modal">
			<div class="modal_wrapper">
				<div class="modal_content">
					<h1>Update HyperBash</h1>
					<p>
						You are currenlty running {{ currentHBVersion }}. please update to
						{{ lastestHBVersion }}
					</p>
					<p class="highlight">
						{{ currentHBVersion }} -> {{ lastestHBVersion }}
					</p>
					<p>This message will disapear in {{ timeleft }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { lastestHyperBashVersion } from "../Util/ConstVars";

export default defineComponent({
	data() {
		return {
			display: false,
			timeleft: 0,
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
			if (this.$store.state.version != lastestHyperBashVersion) {
				this.display = true;
				this.timeleft = 20;
				this.startCountDown();
			}
		},

		startCountDown() {
			var interval = setInterval(() => {
				this.timeleft -= 1;
				if (this.timeleft <= 0) {
					this.display = false;
					clearInterval(interval);
				}
			}, 1000);
		},
	},
	computed: {
		lastestHBVersion() {
			return lastestHyperBashVersion;
		},
		currentHBVersion() {
			if(this.$store.state.version == ""){
				return "unknown??"
			}

			return this.$store.state.version;
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
