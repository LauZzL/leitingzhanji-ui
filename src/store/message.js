import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMessageStore = defineStore('message', () => {
    const messages = ref([
        
    ])

    const capture = ref(false)

    const network = ref([

    ])


    const addMessage = (e) => {
        messages.value.push(e)
    }

    const addNetwork = (e) => {
        network.value.push(e)
    }

    const clearMessage = () => {
        messages.value = []
    }

    const clearNetwork = () => {
        network.value = []
    }


    return { messages, network, capture, addMessage, addNetwork, clearMessage, clearNetwork }
  })