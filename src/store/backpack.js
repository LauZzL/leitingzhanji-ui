import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBackPackStore = defineStore('backpack', () => {
    const backpack = ref({
        items: [],
        equips: []
    })

    const setBackPack = (e) => {
        backpack.value = e
    }

    return { backpack, setBackPack }
  })