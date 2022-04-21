<template>
	<div
		class="dash"
		:class="[
		  playerData.dashPickup ? 'dash--max' : 'dash--normal'
		]"
	>
		<div class="dashes_fill" :style="dashesLeft"></div>
		<div class="dashes_track"></div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { mapState } from "vuex";
	
	export default defineComponent({
		name: "PlayerDashes",
		computed: mapState({
			dashesLeft() {
				var dashWidth = 0;
				
				if ( this.index <= this.playerData.dash ) dashWidth = 100;
				else {
					var diff = 1 - (this.index - this.playerData.dash);
					
					dashWidth = diff < 0 ? 0 : diff * 100;
				}
				
				return { width: dashWidth + '%' };
			},
		}),
		props: {
			index: {
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