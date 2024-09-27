import { defineStore } from 'pinia'
import { ref } from 'vue'
import commonUtils from '@/utils/common'

export const useLoggerStore = defineStore('logger', () => {
    const logger = ref([
        '<span class="el-text el-text--primary mx-1">任何问题请访问 <a href="https://github.com/LauZzL/leitingzhanji-ui/issues" target="_blank">Github Issues</a> 提交错误</span>'
    ])
    const add = (log) => {
        logger.value.push(`<span class="el-tag el-tag--info el-tag--light"><span class="el-tag__content">${commonUtils.getLocalDateTime()}</span><!--v-if--></span> ${log}`)
    }

    const packet_logger = ref([])

    const add_packet = (log) => {
        packet_logger.value.push(`<span class="el-tag el-tag--info el-tag--light"><span class="el-tag__content">${commonUtils.getLocalDateTime()}</span><!--v-if--></span> ${log}`)
    }

    const script_logger = ref([])

    const add_script = (log) => {
        script_logger.value.push(`<span class="el-tag el-tag--info el-tag--light"><span class="el-tag__content">${commonUtils.getLocalDateTime()}</span><!--v-if--></span> ${log}`)
    }

    return { logger, add, packet_logger, add_packet, script_logger, add_script }
  })