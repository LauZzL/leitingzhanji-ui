## `logger` <Badge type="info" text="function" />

在日志中输出信息。

### nem.logger(type, message)

- type: 日志类型('primary' | 'success' | 'warning' | 'danger' | 'info')
- message: 日志内容


```javascript
nem.logger('info', '信息')
nem.logger('primary', '主要信息')
nem.logger('success', '成功信息')
nem.logger('warning', '警告信息')
nem.logger('danger', '错误信息')
```