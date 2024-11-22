## `message` <Badge type="info" text="function" />

弹出一个全局提示信息。

### nem.message(type, message)

- type <Badge type="info" text="String" /> 提示类型('success' | 'warning' | 'info' | 'error')
- message <Badge type="info" text="String" /> 提示内容


```javascript
nem.message('info', '信息')
nem.message('success', '成功~')
nem.message('warning', '警告！')
nem.message('danger', '错误信息×')
```