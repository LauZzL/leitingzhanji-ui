import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingStore = defineStore('setting', () => {
    
    const setting = ref({
        boss: {
            level: 'horse',
            sub: 2,
            nums: 1,
            attack_timer: 35
        },
        endless: {
            daoju: 0,
            buy_num: 1,
            nums: 1,
            attack_timer: 60,
            boss_num: 1,
            zhufu: 0,
            enable_zhufu: false,
        },
        huodong: {
            level: 'meteorite',
            sub: 2,
            nums: 1,
            attack_timer: 35
        },
        level: {
            level_payload: {
                level: 1,
                num: 1,
                sleeps: 1000,
                attack_timer: 5,
                is_hero: false,
                two_gain: 0,
            },
            cailiao_payload: {
                cailiao: 0,
                sleeps: 1000,
                attack_timer: 5,
                vip_level: 0,
            },
            rule_payload: {
                attack_rule: '95,96',
                sleeps: 1000,
                attack_timer: 5,
                is_hero: false,
            },
            gold_times: 100,
            enable_gold_times: false,
            three_two: false,
            activeName: 'one'
        },
        other: {
            anti_01: false,
            hdsybj: false,
            fhbjzs: false,
            wudi: false,
            changwanka: false,
        },
        shuzhi: {
            engineDamage: 100000,
            weaponDamage: 100000,
            wingmanDamage: 100000,
            engineHp: 5000000,
            score: 100,
        },
        pvp: {
            type: 0,
            nums: 1
        },
        cdk_str: ''
    })

    const setSetting = (e) => {
        setting.value = e
    }

    return { setting, setSetting }
  })