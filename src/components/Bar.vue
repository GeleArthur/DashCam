<template>
	<div class="bar" :style="barWidth">
		<div class="bar_text" v-if="text">{{ text }}</div>
		<div class="bar_fill" :style="bar"></div>
		<div class="bar_track"></div>
	</div>
</template>

<style scoped lang="css">
.bar {
	height: 100%;
	position: relative;
	width: 30px;
}

.bar_text {
	bottom: 0;
	font-size: 20px;
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
	z-index: 10;
}

.bar_fill {
	display: block;
	height: 100%;
	position: relative;
	transform: skew(-38deg);
	transition: width 0.1s ease-in-out;
	z-index: 5;
}

.bar_track {
	background-color: rgba(0, 0, 0, 0.3);
	bottom: -1px;
	left: -1px;
	position: absolute;
	right: -1px;
	top: -1px;
	transform: skew(-38deg);
	z-index: 1;
}

.mode--domination .bar {
	line-height: 21px;
	width: 22px;
}

.mode--domination .bar .bar_fill,
.mode--domination .bar .bar_track {
	border-radius: 100%;
	transform: skew(0deg);
}

.mode--blue.mode--controlpoint .bar,
.mode--blue.mode--payload .bar {
	transform: scaleX(-1);
}

.mode--blue .bar .bar_fill {
	background-color: #72aeff;
}

.mode--red .bar .bar_fill {
	background-color: #ff7272;
}

.mode--blue.mode--domination .bar .bar_fill {
	background-color: #0045ff;
}

.mode--red.mode--domination .bar .bar_fill {
	background-color: #ff0000;
}

.mode--domination .bar {
	line-height: 28px;
	width: 28px;
}
</style>

<script setup lang="ts">
//TODO: Bar and buttons should be seprate componets

import { computed } from "vue";

// Should get a rework
const bar = computed(() => {
	var width = '0%';

	if (props.compare == '<=' && props.index! <= props.value!) width = '100%';
	else if (props.compare == 'boolean' && props.value) width = '100%';
	else if (props.index == props.value) width = '100%';

	return { width: width };
})

const barWidth = computed(() => {
	return { width: props.width !== undefined ? props.width : '' };
})

const props = defineProps<{
	compare?: string,
	index?: number,
	text?: string,
	value: any,
	width?: string
}>()
</script>