import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useScriptStore = defineStore('script', () => {

    const code = ref("function getUserInfo(){\n  return nem.getUser();\n}\nconst user = getUserInfo();\nnem.logger('success', `获取用户信息结果:${user}`);")

    const setScript = (e) => {
        code.value = e
    }

    return {code, setScript}
})