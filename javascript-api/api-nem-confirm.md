## `confirm` <Badge type="info" text="function" />

等同于JavaScript中的`confirm`函数。

### nem.prompt(title,message)

- title <String> - 提示框标题
- message <String> - 提示框内容

```javascript
const flag = nem.prompt('提示','是否要双倍领取材料？');
if(flag){
    nem.logger('info', '双倍领取');
}else {
    nem.logger('info', '不进行双倍领取');
}
```