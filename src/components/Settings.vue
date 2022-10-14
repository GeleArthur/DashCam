<template>
    <div class="modal">
        <div class="modal_wrapper">
            <div class="modal_content">
                <h1>Settings {{iconURLSetting}}</h1>
                <h2>TeamIcon</h2>
                <div id="iconURL">
                    <div>
                        <label for="TeamIconDashLeague">DashLeague</label>
                        <input type="radio" name="iconURL" v-model="iconURLSetting" value="DashLeague" id="TeamIconDashLeague"/><br>

                        <label for="TeamIconHyperCup">HyperCup</label>
                        <input type="radio" name="iconURL" v-model="iconURLSetting" value="HyperCup" id="TeamIconHyperCup"/><br>

                        <label for="TeamIconCustom">Custom</label>
                        <input type="radio" name="iconURL" v-model="iconURLSetting" value="Custom" id="TeamIconCustom"/><br>
                    </div>
                    <div v-if="iconURLSetting == 'Custom'" id="inputForm">
                        <label for="redInput">RedTeam:</label>
                        <input type="url" name="redInput" class="inputURL inputRed">
                        <label for="blueInput">BlueTeam:</label>
                        <input type="url" name="blueInput" class="inputURL inputBlue">
                    </div>
                </div>
                <!-- <h2>Something else</h2>
                <h2>Something else</h2>
                <h2>Something else</h2>
                <h2>Something else</h2> -->

            </div>
        </div>
    </div>

</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    data() {
        return {
            iconURLSetting: "DashLeague",
        }
    },
    methods: {

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
    width: 100%;
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
        grid-template-columns: min-content 2fr;
        grid-template-rows: 1fr 1fr;
        gap: 0px 0px;
        grid-template-areas:
            ". ."
            ". .";
        grid-area: inputForm;

        align-items: center;
    }
}
</style>