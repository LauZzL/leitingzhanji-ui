## `prompt` <Badge type="info" text="function" />

等同于JavaScript中的`prompt`函数。

### nem.prompt(title,message)

- title <Badge type="info" text="String" /> 提示框标题
- message <Badge type="info" text="String" /> 提示框内容

```javascript
const level = nem.prompt('提示','请输入要攻打的关卡');
nem.logger('info', `开始攻打第${level}关`)
```