<template>
	<div class="bar" :style="barWidth">
		<div class="bar_text" v-if="text">{{text}}</div>
		<div class="bar_fill" :style="bar"></div>
		<div class="bar_track"></div>
	</div>
</template>

<style scoped lang="css">
	.bar{height:100%;position:relative;width:30px;}
	.bar_text{bottom:0;font-size:20px;left:0;position:absolute;right:0;top:0;z-index:10;}
	.bar_fill{display:block;height:100%;position:relative;transform:skew(-38deg);transition:width 0.1s ease-in-out;z-index:5;}
	.bar_track{background-color:rgba(0,0,0,0.3);bottom:-1px;left:-1px;position:absolute;right:-1px;top:-1px;transform:skew(-38deg);z-index:1;}
	
	.mode--domination .bar{line-height:21px;width:22px;}
	.mode--domination .bar .bar_fill,
	.mode--domination .bar .bar_track{border-radius:100%;transform:skew(0deg);}
	
	.mode--blue.mode--controlpoint .bar,
	.mode--blue.mode--payload .bar{transform: scaleX(-1);}
	
	.mode--blue .bar .bar_fill{background-color:#72aeff;}
	.mode--red .bar .bar_fill{background-color:#ff7272;}
	
	.mode--blue.mode--domination .bar .bar_fill{background-color:#0045ff;}
	.mode--red.mode--domination .bar .bar_fill{background-color:#ff0000;}
	
	.mode--domination .bar{line-height:28px;width:28px;}
</style>

<script lang="ts">
//TODO: Bar and buttons should be seprate componets

	import { defineComponent } from "vue";
	
	export default defineComponent({
		name: "Bar",
		computed: {
			bar() {
				var width = '0%';
				
				if ( this.compare == '<=' && this.index! <= this.value! ) width = '100%';
				else if ( this.compare == 'boolean' && this.value ) width = '100%';
				else if ( this.index == this.value ) width = '100%';
				
				return { width: width };
			},
			barWidth() {
				return { width: this.width !== undefined ? this.width : '' };
			}
		},
		props: {
			compare: {
				required: false,
			},
			index: {
				type: Number,
				required: false
			},
			text: {
				type: String,
				required: false
			},
			value: {
				required: true,
			},
			width: {
				type: String
			},
		},
	});
</script>