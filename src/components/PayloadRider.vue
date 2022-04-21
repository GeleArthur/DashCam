<template>
	<div class="rider">
		<div class="rider_fill" :style="riders"></div>
		<div class="rider_track"></div>
	</div>
</template>

<style scoped lang="css">
	.rider{height:100%;position:relative;width:30px;transform: scaleX(-1);}
	.rider_fill{background-color:#72aeff;display:block;height:100%;position:relative;transform:skew(-38deg);transition:width 0.1s ease-in-out;z-index:5;}
	.rider_track{background-color:rgba(0,0,0,0.3);bottom:-1px;left:-1px;position:absolute;right:-1px;top:-1px;transform:skew(-38deg);z-index:1;}
</style>

<script lang="ts">
	import { defineComponent } from "vue";
	import { mapState } from "vuex";
	
	export default defineComponent({
		name: "PayloadRider",
		computed: mapState({
			riders() {
				return { width: this.index <= this.load ? '100%' : '0' };
			},
		}),
		props: {
			index: {
				type: Number,
				required: true
			},
			load: {
				type: Number,
				required: true,
			},
		},
	});
</script>