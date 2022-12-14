---
title: Chap1. 변수 할당으로 의도를 표현하라
docType: book
---



- const
- let
- template literal

> 변수를 작성할 때는 다른 개발자가 봤을 때 읽기 쉽고 예측 가능한 변수를 사용해야 한다.
> 

## [1] const로 변하지 않는 값을 표현하라

const는 재할당할 수 없는 변수이다. 하지만 **그 값이 불변값이 되는 것은 아니다.**   
값을 할당하고 변경하지 않을 것이라는 점을 표시하면, 해당 변수를 신경쓰지 않아도 된다고 말하는 것과 같다.

> example

```ts
const taxRate = 0.1;
const total = 100 + (100 * taxRate);
// 엄청나게 긴 코드
return `구매 금액은 ${total}입니다.`;
```

```ts
var taxRate = 0.1;
var total = 100 + (100 * taxRate);
// 엄청나게 긴 코드
return `구매 금액은 ${total}입니다.`;
```

`var`를 사용하면 저 `엄청나게 긴 코드` 를 다 읽어야 한다.   
`const` 와 `let` 을 적절하게 섞어 사용하면 

1. 할당이 변경되지 않는다
2. 변경될 수도 있다

는 점을 쉽게 알 수 있다.   
`let`을 사용한 경우 변경되는 부분을 예측할 수 있다.

하지만 배열, 객체 등 컬렉션의 경우는 `const` 로 선언하였더라도 **가변값**이다.   
그래서 될 수 있으면 조작(mutation)을 피해야 한다.   
→ 함수형 프로그래밍(filter, map …)


## [2] let과 const로 유효 범위 충돌을 줄여라

값이 변경되는 경우 가장 좋은 선택은 `let`이다.   
`var`와 `let`의 차이는 유효 범위이다.   

`var` ⇒ lexical scope    
`let` ⇒ block scope

❓ 그럼 `var` 을 꼭 사용해야만 하는 경우가 있을까?

## [3] 블록 유효 범위 변수로 정보를 격리하라

```tsx
// items.length === 3
for (var i=0;i<items.length;i++){
	items[i].onclick = function() {
		return i;
	};
}
```

이 경우 `items` 의 어떤 엘리먼트를 클릭해도 3이라는 숫자가 반환될 것이다.   
→ `var` 의 `hoisting` 때문에!

그럼 이걸 어떻게 해결하나?   
**→ 클로저, 고차 함수, 즉시 실행 함수**
혹은 `let` 을 사용하자.



## [4] 템플릿 리터럴로 변수를 읽을 수 있는 문자열로 변환하라

스트링 연산을 할 때 `+` 사용하지 말고 템플릿 리터럴을 적극적으로 활용하자.

---

|  | var | let | const |
|:---:|:---:|:---:|:---:|
| 재할당 | O | O | X |
| 유효 범위 | lexical scope | block scope | block scope |
| 같은 이름 변수 재선언 | O | X | X |
