import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useExecutorStore = defineStore('executor', () => {
    const executor = ref([])

    const setExecutor = (e) => {
        executor.value = e
    }

    return { executor, setExecutor }
  })