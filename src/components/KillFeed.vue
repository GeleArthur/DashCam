<template>
	<div class="kill_feed">
		Kill Feed
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import killFeed from "../models/HyperBashModels/killfeed";
	import store from "../store/store";
	
	export default defineComponent({
			mounted(){
					store.subscribe((mutation, state)=>{
							if(mutation.type == "killFeed"){
									this.onPlayerKilled(mutation.payload)
							}
					})
			},
			methods:{
					onPlayerKilled(payload: killFeed){
							console.log(`${store.state.PlayerData[payload.killer]?.name} killed -> ${store.state.PlayerData[payload.victim]?.name}`)
					}
			}
	});
</script>
