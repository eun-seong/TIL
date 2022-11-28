---
title: '[Typescript] 타입스크립트 컴파일러 설정하기'
path: 'compiler'
date: '2021-01-17 17:27:05'
template: 'post'
category: 'Typescript'
---

### typescript 컴파일러 설치하기
```shell
$ npm install -g typescript
```

### typescript 컴파일러 실행하기
```shell
$ tsc hello.ts
```

#### 옵션
* `target`   
    javascript 버전에 대한 옵션을 줄 수 있다.
    ```shell
    $ tsc hello.ts --target es6
    ```
    
* `lib`   
    다른 버전의 라이브러리를 포함시킬 수 있다.
    ```shell
    $ tsc hello.ts --lib ex2015.promise, dom
    ```

### typescript 컴파일러 설정 파일 생성하기
> `/tsconfig.json`

```json
{
    "include": [
        "src/**/*.ts"
    ],
    "exclude": [
        "node_modules"
    ],
    "compilerOptions" :{
        "module": "commonjs",
        "rootDir": "src",
        "outDir": "dist",
        "target": "es5",
        "sourceMap": true,
        "removeComments": true,
        "noImplicitAny": true,
    }
}
```

* `include` : 컴파일러에 포함될 파일들
* `exclude` : 제외할 파일들
* `compilerOptions` : 컴파일 옵션들
    * `outDir` : 컴파일 완료 후 output이 들어갈 폴더
    * `sourceMap` : 브라우저 콘솔에서 js 파일과 함께 ts파일도 확인 가능
    * `removeComments` : 주석 제거
    * `noImplicitAny` : 암묵적 any type 제거

