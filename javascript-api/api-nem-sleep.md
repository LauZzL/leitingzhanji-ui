## `sleep` <Badge type="info" text="function" />

同等于Python中的time.sleep。

### nem.sleep(time)

- time: 毫秒(1000=1秒)

```javascript
nem.logger('info', '等待1秒后再输出下一句');
nem.sleep(1000);
nem.logger('info', '1秒后')
```