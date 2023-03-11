<template>
	<div class="dash" :class="[
		playerData.dashPickup ? 'dash--max' : 'dash--normal'
	]">
		<div class="dashes_fill" :style="dashesLeft"></div>
		<div class="dashes_track"></div>
	</div>
</template>

<script setup lang="ts">
import { PlayerStateInfo } from "@/interfaces/StoreInterfaces/StoreState";
import { computed } from "vue";

const dashesLeft = computed(() => {
	var dashWidth = 0;

	if (props.index <= props.playerData.dash) dashWidth = 100;
	else {
		var diff = 1 - (props.index - props.playerData.dash);

		dashWidth = diff < 0 ? 0 : diff * 100;
	}

	return { width: dashWidth + '%' };
})

const props = defineProps<{
	index: number,
	playerData: PlayerStateInfo
}>()
</script>