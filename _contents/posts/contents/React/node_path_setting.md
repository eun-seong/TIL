---
title: '[React] NODE_PATH 설정하기, .env 파일 안됨'
path: 'node_path_setting'
date: '2021-02-10 12:23:10'
template: 'post'
category: 'React'
---

예전에 잘 되었던 `NODE_PATH` 설정이 안되어서 해멨다.

기존에는 루트 디렉토리에 `.env` 파일을 추가하여
```
NODE_PATH=src
```

만 적어주어도 작동을 잘 했었지만,

현재 `react-script`에서 이렇게 하는 방법은 deprecate되었다.

### 해결 방법

루트 디렉토리에 `jsconfig.json` 파일을 생성한다.

```json
{
    "compilerOptions": {
        "baseUrl": "src"
    },
    "include": [
        "src"
    ]
}
```

해당 파일에 입력한다.


* * *

겨우 1년도 안지났을뿐인데 많은 것이 바뀐 것 같다.   
나도 그만큼 성장했나 살펴보면 확신은 없지만 열심히 하려고 하는 것 같다..!