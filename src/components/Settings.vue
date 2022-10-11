<template>
    <div class="modal">
        <div class="modal_wrapper">
            <div class="modal_content">
                <h1>Settings {{$store.state.settings.iconURL}}</h1>
                <select v-model="$store.state.settings.iconURL" id="Icon">
                    <option value="DashLeague">DashLeague</option>
                    <option value="HyperCup">HyperCup</option>
                    <option value="Custom">Custom</option>
                </select>
                <br/>
                <input v-if="$store.state.settings.iconURL == 'Custom'" >
            </div>
        </div>
    </div>

</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>

<style scoped>
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

.modal h1 {
    margin-top: 0;
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
    height: 90vh;
    overflow: scroll;
    position: relative;
    width: 800px;
    z-index: 1;
}

.modal_content {
    background-color: #fff;
    padding: 2em;
}
</style>