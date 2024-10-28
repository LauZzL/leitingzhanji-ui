## `getUser` <Badge type="info" text="function" />

获取当前登录用户信息。

### nem.getUser(DEBUG)

- DEBUG <Badge type="info" text="Boolean" /> 更详细的信息

> DEBUG为可选参数，当DEBUG为true时，返回的用户信息会包含更多字段：`所有装备`、`所有物品`、`幸运值`。

```javascript
const userInfo = nem.getUser();
nem.logger('info', userInfo);
```

### 返回数据

```json
{
    "uid": "xxxxxx",
    "sid": "xxxxxx",
    "avatar": "https:xxxxxxxxxxx", // 头像url
    "nickname": "昵称",
    "gold": 279210982, // 金币
    "diamonds": 29084, // 钻石
    "pack": "298/300", // 背包
    "recharge": 6, // 充值金额
    "zhanli": 15012, // 战力
    "week_score": 290123, // 本周无尽
    "vip": 1, // 贵族等级
    "energy": 120, // 体力
}
```