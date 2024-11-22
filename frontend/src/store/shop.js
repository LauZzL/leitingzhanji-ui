import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useShopStore = defineStore('shop', () => {
    const shop = ref({})

    const setShop = (e) => {
        shop.value = e
    }

    return { shop, setShop }
  })