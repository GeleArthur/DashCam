<template>
	<div v-if="display">
        <p>UPDATE >:(</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { lastestHyperBashVersion } from "../Util/ConstVars";

export default defineComponent({
	data() {
		return {
			display: false,
		};
	},

	watch: {
		"this.$store.state.connection"(val) {
			if (val == "") {
				this.display = false;
				setInterval(this.checkVersion, 1000);
			}
		},
	},
	methods: {
		checkVersion() {
			if (this.$store.state.version != lastestHyperBashVersion) {
				this.display = true;
			}
		},
	},
});
</script>
