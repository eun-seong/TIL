---
title: JSX란 무엇인가
tags: react
---


# What
JSX는 `React.createElement(component, props, ...children)` 함수를 호출하는 다른 방법의 문법이다.
다르게 말하면 JSX를 호출하면 `createElement()` 함수가 호출된다는 뜻이다.

## 사용 규칙
### import `React`
위에서 언급한 것처럼 JSX는 `React`안의 함수에서 호출되는 것이기 때문에 `import React`를 꼭 해주어야 한다. 앱을 빌드하면 JSX 문법이 바벨을 통해 `createElement()`로 변한되는데, 이 때 `React`가 없다면 이 함수를 찾을 수 없을 것이다.
하지만 바벨을 사용하지 않고 `<script>` 태그를 통해 React를 불러왔다면 `React`가 전역 변수로 존재하기 때문에 import 할 필요 없다.

### 대문자로 시작
소문자일 경우 리액트는 웹 컴포넌트로 인식하기 때문에, 사용자 컴포넌트라면 반드시 대문자로 시작해야 한다.

### children
JSX 두 태그 사이에 내용은 `children` 이라는 특수한 prop으로 넘겨진다.
자식을 넘기는 방법은 여러 가지가 있다.
1. 문자열 리터럴
2. 여러개의 컴포넌트
3. 배열
4. `{}`에 감싼 JavaScript 표현식
5. 함수
6. `boolean`, `null`, `undefined`는 무시된다   
    이것들은 유효한 자식이지만 렌더링은 되지 않는다.
    ```jsx
    // 모두 같음
    <div/>
    <div></div>
    <div>{false}</div>
    ```
7. *falsy*한 값은 렌더링이 된다
    ```jsx
    <div>
      {
        0 && <div>hello</div>
      }
    </div>
    // 0 출력
    ```


# How
위에서 언급한 것처럼 JSX 문법을 바벨로 트랜스파일링하면 `createElement()` 함수를 호출하게 된다.
이 함수는

```jsx
function createElement(type, config, children) { }
```

모양으로 구성되어 있다.

* `type` : 태그의 타입
  * 웹 컴포넌트 태그일 경우는 



# Why


