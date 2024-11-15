# `packet` <Badge type="info" text="Object" />

其实`packet`对象是整个`nem`最核心的对象，你的一切封包都要经过他来处理。

## `send` <Badge type="info" text="function" />

::: tip 小提醒
send会自动将一些模板占位符替换，例如`{uid}`、`{sid}`，你可以使用这些占位符来代替你的当前登录uid、sid。

如果你不想使用占位符，你也可以使用`nem.getUser()`来获取当前登录用户的数据。
:::

发送封包数据。

### nem.packet.send(payload)

- payload <Badge type="info" text="String" /> 经过JSON.stringify后的JSON字符串


```javascript
const payload = `{"head":{"cmdDataSplitLength":0,"cmdId":48,"cmdLength":0,"cmdSequence":"{cmdSequence}","cmdVersion":4,"headVersion":0,"timestamp":"{timestamp}","crcVerify":0,"platform":0,"reconnect":false,"sid":"{sid}","uid":"{uid}"},"type":1,"id":1,"subId":0,"targets":[{"type":11,"sd_id":1,"quality":2,"level":0},{"type":11,"sd_id":2,"quality":2,"level":0},{"type":11,"sd_id":3,"quality":2,"level":0}],"md5s":[],"fuid":"0","pvpAreaId":-1}`
const result = nem.packet.send(payload)
nem.logger('info', result)
```

## `gain2json` <Badge type="info" text="function" />

将gain转为json格式。

### nem.packet.gain2json(gain)

- gain <Badge type="info" text="String" /> 封包返回的gain值(eg: M2x20)

```javascript
const gain = `M2x20#`
const result = nem.packet.gain2json(gain)
nem.logger('info', result)
```

### 返回数据

```json
[
    {
        "name": "钻石",
        "color": "#409eff", // 对应游戏内装备品质颜色
        "num": "20"
    }
]
```


## `getActionTag` <Badge type="info" text="function" />

计算actions。

### nem.packet.getActionTag(start, actionInfos, level, type)

- start <Badge type="info" text="Integer" /> 起始位置，部分模式需要计算多次actions(例如攻打无尽需要重复计算，第二次计算的start就是上一次计算的actionInfos长度)。
- actionInfos <Badge type="info" text="String" /> 进入对局返回的actionInfos数组(需要JSON.stringify)。
- level <Badge type="info" text="Integer" /> 闯关填写关卡，无尽、PVP固定为1，BOSS关卡为难度+1。
- type <Badge type="info" text="String" /> 普通关卡(normal) | 英雄关卡(hero) | 白鸟座(bird) | 天龙座(loong) | 仙女座(female) | 天马座(horse) | 无尽(endless) | PVP金币场(pvp_gold) 。


```javascript
const actionInfos = [{"lootIds":[],"lootEnemyIds":[],"lootWaveIds":[],"norId":2},...]
const actions = nem.packet.getActionTag(0, JSON.stringify(actionInfos),1, 'pvp_gold');
nem.logger('success', `计算成功:${actions}`);
```

### 返回数据

成功返回action(Long)，失败返回错误信息(String)。
```
成功：232411781
失败：计算错误等其他异常信息
```