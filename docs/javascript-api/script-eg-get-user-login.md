![script-eg-getuserlogin](../images/script-eg-getuserlogin.png)

```javascript
function getUserInfo(){
  return nem.getUser();
}
const user = getUserInfo();
nem.logger('success', `获取用户信息结果:${user}`);
```