<template>
	<div
		:class="{
			'dash dash--normal': playerData.dashes == 3,
			'dash dash--max': playerData.dashes == 5,
		}"
	>
		<div class="dashes__fill" :style="dashesLeft"></div>
		<div class="dashes__track"></div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { mapState } from "vuex";
	
	export default defineComponent({
		name: "PlayerDashes",
		computed: mapState({
			dashesLeft() {
				var dashWidth = '0%';
				console.log(this.n + ': ' + this.playerData.dash + '/' + this.playerData.dashes);
				
				if ( this.n <= this.playerData.dash ) dashWidth = '100%';
				else {
					var diff = 1 - (this.n - this.playerData.dash);
					
					if ( diff < 0 ) dashWidth = '0%';
					else dashWidth = diff * 100 + '%';
				}
				
				return { width: dashWidth };
			},
		}),
		props: {
			n: {
				type: Number,
				required: true
			},
			playerData: {
				type: Object,
				required: true,
			},
		},
	});
</script>