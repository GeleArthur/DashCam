<template>
    <div class="modal" v-if="showSettings">
        <div class="modal_wrapper">
            <div class="modal_content">
                <h1>Settings</h1>
                <p>Press <b>S</b> to close</p>
                <h2>TeamIcon</h2>
                <div id="iconURL">
                    <div>
                        <label for="TeamIconDashLeague">DashLeague</label>
                        <input type="radio" name="iconURL" v-model="iconURLSetting" value="0" id="TeamIconDashLeague" /><br>

                        <label for="TeamIconHyperCup">HyperCup</label>
                        <input type="radio" name="iconURL" v-model="iconURLSetting" value="1" id="TeamIconHyperCup" /><br>

                        <label for="TeamIconCustom">Custom</label>
                        <input type="radio" name="iconURL" v-model="iconURLSetting" value="2" id="TeamIconCustom" /><br>
                    </div>
                    <div v-if="iconURLSetting == 2" id="inputForm">
                        <label for="redInput">RedTeam:</label>
                        <input type="url" name="redInput" class="inputURL inputRed" v-model="redIconURLSetting">
                        <img :src="redIconURLSetting" alt="unable to load image">

                        <label for="blueInput">BlueTeam:</label>
                        <input type="url" name="blueInput" class="inputURL inputBlue" v-model="blueIconURLSetting">
                        <img :src="blueIconURLSetting" alt="unable to load image">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { iconModes } from "@/interfaces/StoreInterfaces/StoreState";
import { useSettingStore } from "@/stores/SettingsStore";
import { ref, onMounted, computed } from "vue";

const state = useSettingStore();

const showSettings = ref(false);

onMounted(() => {
    document.addEventListener("keypress", e => {
        if (e.repeat) return;
        if (e.key == "s") {
            showSettings.value = !showSettings.value;
        }
    })
})

const iconURLSetting = computed({
    get() {
        return state.IconSettings.iconMode
    },
    set(newValue: iconModes) {
        state.IconSettings.iconMode = newValue;
    }
});

const redIconURLSetting = computed({
    get() {
        return state.IconSettings.customRedIcon
    },
    set(newValue: string) {
        state.IconSettings.customRedIcon = newValue;
    }
});

const blueIconURLSetting = computed({
    get() {
        return state.IconSettings.customBlueIcon
    },
    set(newValue: string) {
        state.IconSettings.customBlueIcon = newValue;
    }
});
</script>

<style scoped lang="scss">
.modal {
    align-items: center;
    bottom: 0;
    display: flex;
    justify-content: center;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 5;
}

.modal:before {
    background-color: rgba(0, 0, 0, 0.3);
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
}

.modal_wrapper {
    height: 50vh;
    overflow: hidden;
    overflow-y: scroll;
    position: relative;
    width: 800px;
    z-index: 1;
    background-color: #fff;
}

.modal_content {
    padding: 2em;

    select {
        font-size: 1.5em;
    }
}

.inputURL {
    font-size: 1.5em;
}

#iconURL {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: min-content 1fr;
    gap: 0px 0px;
    grid-template-areas:
        "."
        "inputForm";

    #inputForm {
        display: grid;
        grid-template-columns: min-content 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        gap: 0px 0px;
        grid-template-areas:
            ". ."
            ". .";
        grid-area: inputForm;

        align-items: center;
    }

    img {
        height: 94px;
        width: 94px;
    }
}
</style>