# 分享您的脚本

如果你不想公开脚本代码，你可以编译后上传到我们的 github 对应的仓库(暂时未创建)。

## 自行分享

1. fork [https://github.com/LauZzL/leitingzhanji-docs](https://github.com/LauZzL/leitingzhanji-docs) 仓库
2. 将代码拉取到本地
3. 打开项目根目录`.vitepress/config.mjs`文件

在文件中这里添加代码，并在`javascript-api`文件夹创建md文件，他需要携带`script-eg-`前缀，例如：`script-eg-share-my-script`

```javascript
{
    text: '走马观花',
    base: '/javascript-api/script-eg-',
    items: [
        { text: '如何共享您的脚本？', link: 'how-to-share' },
        { text: '获取当前登录游戏用户信息', link: 'get-user-login' },
        // 在这里添加，例如
        { text: '脚本描述', link: '对应javascript-api的文件名，文件名需要填写(script-eg-)前缀' },
    ]
}
```

4. 提交修改
5. 创建PR
6. 等待合并

## 提交源代码

1. 在issues中创建一个提交脚本的issue
2. 提交脚本代码并填写相关描述
3. 等待我们验证后添加

