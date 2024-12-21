## `p.f` <Badge type="info" text="uri" />

对应JavaScriptApi中的`nem.packet.send`方法，用于模拟发送封包请求至服务器。

### 请求地址

`http://{BASE.URL}:{BASE.PORT}/open-api/p.f`

### 请求参数

- payload <Badge type="info" text="JSON" /> 封包数据

### 示例代码

#### 使用Node

```javascript
const axios = require('axios');

let data = {...}
let config = {
    method: 'post',
    url: 'http://localhost:2026/open-api/p.f',
    headers: {
        'Content-Type': 'application/json'
    },
    data : data
};
axios.request(config)
    .then((response) => {
        console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
        console.log(error);
    });
```
#### 使用Python

```python
import requests
import json

url = "http://localhost:2026/open-api/p.f"

payload = json.dumps({...})
headers = {
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)

```
### 使用Go

```go
package main

import (
  "fmt"
  "strings"
  "net/http"
  "io"
)

func main() {

  url := "http://localhost:2026/open-api/p.f"
  method := "POST"

  payload := strings.NewReader(`{}`)

  client := &http.Client {
  }
  req, err := http.NewRequest(method, url, payload)

  if err != nil {
    fmt.Println(err)
    return
  }
  req.Header.Add("Content-Type", "application/json")

  res, err := client.Do(req)
  if err != nil {
    fmt.Println(err)
    return
  }
  defer res.Body.Close()

  body, err := io.ReadAll(res.Body)
  if err != nil {
    fmt.Println(err)
    return
  }
  fmt.Println(string(body))
}
```