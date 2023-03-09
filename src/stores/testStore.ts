import { defineStore } from "pinia";
import { ref } from "vue";


export const useMatchStateStore = defineStore('testStore', () => {
    const thatsHot = ref(false);
    function yeaItsHot(){
        thatsHot.value = true;
    }

    return { thatsHot, yeaItsHot }
})
