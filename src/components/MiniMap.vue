<template>
	<div id="minimap"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import * as PIXI from "pixi.js";
import store from "../store/store";
import playerJoins from "../models/HyperBashModels/playerJoins";

import abyssMap from "../assets/Maps/Payload_Abyss_2.png";

export default defineComponent({
	data() {
		return {
			app: new PIXI.Application({
				backgroundAlpha: 0.3,
				width: 200,
				height: 200,
			}),
			world: new PIXI.Container(),
			playerContainer: new PIXI.Container(),
			players: [] as PIXI.Graphics[],
			dragging: false,
		};
	},

	mounted() {
		var c = document.getElementById("minimap") as HTMLCanvasElement;
		c.appendChild(this.app.view);

		this.app.stage.addChild(this.world as PIXI.Container);

		this.world.position.set(this.app.view.width / 2, this.app.view.height / 2);
		this.world.addChild(this.playerContainer as PIXI.Container);

		const loader = PIXI.Loader.shared;

		loader.add("Abyss", abyssMap);
		loader.load((loader, resources) => {
			let backgroundImage = new PIXI.Sprite(resources.Abyss.texture);
			backgroundImage.scale.set(1.0);
			backgroundImage.position.set(0, 0);
			this.world.addChildAt(backgroundImage, 0);
		});

		// store.subscribe((mutation, state) => {
		// 	switch (mutation.type) {
		// 		case "playerPos":
		// 			this.updatePlayerPos();
		// 			break;
		// 		case "playerJoins":
		// 			this.addPlayer(mutation.payload);
		// 			break;
		// 		case "playerLeaves":
		// 			this.removePlayer(mutation.payload);
		// 			break;
		// 	}
		// });

		this.app.view.addEventListener("pointermove", (e) => {
			if (this.dragging == false) return;
			this.world.position.set(
				this.world.position.x + e.movementX,
				this.world.position.y + e.movementY
			);
		});
		this.app.view.addEventListener("pointerdown", () => {
			this.dragging = true;
		});
		this.app.view.addEventListener("pointerup", () => {
			this.dragging = false;
		});
		this.app.view.addEventListener("pointerleave", () => {
			this.dragging = false;
		});
	},

	methods: {
		addPlayer(playerJoined: playerJoins) {
			let newPlayer = new PIXI.Graphics();
			this.world.addChild(newPlayer);
			newPlayer.beginFill(playerJoined.team ? 0x0000ff : 0xff0000);
			newPlayer.moveTo(0, -60);
			newPlayer.lineTo(30, 0);
			newPlayer.lineTo(-30, 0);
			newPlayer.lineTo(0, -60);
			newPlayer.endFill();
			newPlayer.scale.set(0.1, 0.1);
			this.players.push(newPlayer);

			this.playerContainer.addChild(newPlayer);
		},

		removePlayer(playerLeaves: any) {
			this.playerContainer.removeChildAt(playerLeaves.spectatorIndex);
			this.players.splice(playerLeaves.spectatorIndex, 1);
		},

		updatePlayerPos() {
			for (let i = 0; i < this.$store.state.PlayerData.length; i++) {
				this.players[i].position.set(
					this.$store.state.PlayerData[i].feetPosition.X,
					this.$store.state.PlayerData[i].feetPosition.Z
				);
				this.players[i].angle = this.$store.state.PlayerData[i].feetRotation;
			}
		},
	},

	computed: {},
});
</script>
