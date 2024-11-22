import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNemStore = defineStore('nem', () => {
    const nem = ref([])

    const setNem = (e) => {
        nem.value = e
    }

    return { nem, setNem }
  })