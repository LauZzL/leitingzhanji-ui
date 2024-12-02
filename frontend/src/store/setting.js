import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingStore = defineStore('setting', () => {

    const setting = ref({
        day: {
            activeNames: ['1'],
        },
        boss: {
            level: 'horse',
            sub: 2,
            nums: 1,
            attack_timer: 10
        },
        endless: {
            daoju: 0,
            buy_num: 1,
            nums: 1,
            attack_timer: 10,
            boss_num: 1,
            zhufu: 0,
            enable_zhufu: false,
        },
        huodong: {
            level: 'meteorite',
            sub: 2,
            nums: 1,
            attack_timer: 5
        },
        level: {
            level_payload: {
                level: 1,
                num: 1,
                sleeps: 1000,
                attack_timer: 10,
                is_hero: false,
                two_gain: 0,
            },
            cailiao_payload: {
                cailiao: 0,
                sleeps: 1000,
                attack_timer: 10,
                vip_level: 0,
            },
            rule_payload: {
                attack_rule: '[{"level":1,"is_hero":false,"two_gain":0,"attack_timer":10}]',
                sleeps: 1000,
                attack_timer: 10,
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
            kapipei: false,
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
            nums: 1,
            max_match_num: 5
        },
        cdk_str: '',
        backpack: {
            activeName: 'equips'
        },
        autoDay: {
            c: [],
            a: {
                enable: false,
                attack_rule: '[{"level":1,"is_hero":false,"two_gain":0,"attack_timer":10}]'
            },
            b: {
                n: [
                    {
                        label: "天龙座(装甲)",
                        type: 'loong',
                        value: 1,
                        nums: 0,
                    },{
                        label: "白鸟座(副武器)",
                        type: 'bird',
                        value: 2,
                        nums: 0,
                    },{
                        label: "天马座(战机)",
                        type: 'horse',
                        value: 0,
                        nums: 0,
                    },{
                        label: "仙女座(僚机)",
                        type: 'female',
                        value: 3,
                        nums: 0,
                    },
                ]
            },
            h: {
                n: [
                    {
                        label: "陨石陷阱(金币)",
                        type: 'meteorite',
                        id: 0,
                        value: [],
                        nums: 0,
                    },{
                        label: "激光迷宫(经验)",
                        type: 'laser',
                        id: 1,
                        value: [1,2],
                        nums: 0,
                    },{
                        label: "导弹猎场(材料)",
                        type: 'missile',
                        id: 2,
                        value: [0,1,2],
                        nums: 0,
                    }
                ]
            },
        },
        player_id: -1,
    })

    const setSetting = (e) => {
        setting.value = e
    }

    return { setting, setSetting }
})