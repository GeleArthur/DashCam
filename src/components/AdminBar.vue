<template>
    <div id="admin" v-if=ShouldDisplayDebugMenu>
        <a>{{ ConnectingMessage }}</a>
        <button @click="AddFakeData">Fake Data</button>
        <button @click="$emit('openHelp')">Help</button>
        <button @click="switchTeam">switchTeams</button>
    </div>
</template>

<script setup lang="ts">
import { useMatchStateStore } from "@/stores/MatchStateStore";
import { ref, computed } from "vue";
import { WebsocketStatusTypes } from "@/interfaces/StoreInterfaces/StoreState";
import { CreateFakeData } from "@/HyperBashLogic/TestingScripts"
import { initStore } from "@/HyperBashLogic/HyperBashCalls"
import { EventSwitchTeam } from "@/HyperBashLogic/HyperBashEvents"
import { Teams } from "@/interfaces/StoreInterfaces/MatchInfo";

const state = useMatchStateStore();

function switchTeam() {
    for (let i = 0; i < state.PlayerData.length; i++) {
        if (state.PlayerData[i].isActive) {
            EventSwitchTeam.invoke({
                type: "switchTeam",
                playerID: i,
                team: state.PlayerData[i].team == Teams.red ? Teams.blue : Teams.red,
            })
        }
    }
}

function AddFakeData() {
    CreateFakeData()
}

const ShouldDisplayDebugMenu = computed(() => {
    return state.WebsocketStatus != WebsocketStatusTypes.connected;
})

const ConnectingMessage = computed(() => {
    switch (state.WebsocketStatus) {
        case WebsocketStatusTypes.connected:
            return "";
        case WebsocketStatusTypes.connecting:
            return "Connecting";
        case WebsocketStatusTypes.disconnected:
            return "Failed. Enable websocket and restart HyperDash";
        default:
            return "Something broke????";
    }
})
</script>

<style scoped>
#admin {
    background-color: rgba(0, 0, 0, 0.5);
    bottom: 0;
    color: #fff;
    display: grid;
    grid-template-columns: auto repeat(3, 100px);
    left: 0;
    padding: 1em;
    position: fixed;
    right: 0;
    z-index: 10;
    white-space: nowrap;
}
</style>