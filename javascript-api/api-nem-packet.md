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