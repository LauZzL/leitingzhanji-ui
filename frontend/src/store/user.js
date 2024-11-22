import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    const user = ref()

    const setUser = (e) => {
        user.value = e
    }

    return { user, setUser }
  })