---
title: Chap2. 배열로 데이터 컬렉션을 관리하라
docType: book
---


## [5] 배열로 유연한 컬렉션을 생성하라

<details>
    <summary>❗️ 배열의 순서가 기술적으로 보장되지 않는다</summary>
    [Is a JavaScript array order guaranteed?](https://stackoverflow.com/questions/34955787/is-a-javascript-array-order-guaranteed)

    배열은 `length` 프로퍼티로 길이를 판단한다. 

    ```tsx
    const arr = [];
    arr[10] = 'hi';
    ```

    이 경우 `arr` 의 길이는 `11` 이 될 것이다.

    하지만 `.forEach` 메소드를 돌려보면 원소 한 개만 출력될 것이다.

    0~8의 index는 사라져 버린 것이다.
</details>
    

배열은 놀라운 수준의 유연성을 갖추고 있다.   

자체적으로 이터러블이 존재하거나(문자열), 이터러블로 변환할 수 있는 데이터 형식이라면
배열에 수행하는 모든 동작을 동일하게 실행할 수 있다.


## [6] Includes()로 존재 여부를 확인하라

`Array.prototype.includes()` 메소드는 `while` 을 돌면서 그 값이 들어있는지 아닌지 확인한다.
⇒ `O(N)` 인 셈

특이한 점은 `[NaN].includes(NaN) === true` 라는 것이다.
이 경우 비교할 a, b가 숫자인지 확인한 후  타입이 숫자이면 둘 다 NaN인지 확인한다.

## [7] 펼침 연산자로 배열을 본떠라

## [8] push() 메소드 대신 펼침 연산자로 원본 변경을 피하라

mutation은 예상치 못한 결과를 낳을 수 있다. mutation이 항상 문제를 일으키는 것은 아니지만, 잠재적으로 문제가 되는 것은 사실이다. 실제로 redux는 직접 mutation을 허용하지 않는다.

함수를 호출할 때는 함수에 전달한 값을 변경하지 않을 것이라는 신뢰가 필요하다.

## [9] 펼침 연산자로 정렬에 의한 혼란을 피하라

sort() 함수는 원본을 조작하는데,
복사본을 사용하면 조작을 막을 수 있다.

---

## JavaScript의 비교 연산 4종류

1. Abstract Equality : `==`
    
    비교할 때 **타입 변환**이 발생한다. `NaN`, `-0`, `+0`은 특별하게 취급된다.
    
    ```tsx
    // 모두 true
    NaN != NaN
    -0 == +0
    false == 0
    true == 1
    null == undefined
    ```
    
    > **IsLooselyEqual(x, y) 알고리즘**
    > 
    > 
    > [ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-islooselyequal)
    > 
    > 1. x와 y의 타입이 같으면 `IsStrictlyEqual(x, y)` 호출
    > 2. `null` 과 `undefined` 의 비교는 `true`
    > 3. String과 Number의 비교는 String → Number 로 타입 변환 후 다시 비교
    > 4. BigInt와 String의 비교는 String → BigInt로 타입 변환 후
    >     1. n = String → BigInt
    >     2. n이 `undefined` 이면 `false`
    >     3. 비교
    > 5. Boolean 타입이 들어오면 Boolean → Number로 타입 변환 후 다시 비교
    > 6. Object 타입이 들어오면 Object → Primitive로 타입 변환 후 다시 비교(string을 String 으로)
    > 7. BigInt와 Number일 경우
    >     1. 둘 중 하나라도 Infinite일 경우 `false`
    >     2. 숫자로만 둘을 비교
2. Strict Equality : `===`
    
    Abstract Equality와 동일한 비교를 수행한다.
    
    하지만 **타입 변환이 발생하지 않는다.**
    
    타입이 다르면 `false` 를 반환한다.
    
    ```tsx
    // 모두 true
    NaN !== NaN
    -0 === +0
    false !== 0
    true !== 1
    ```
    
    > **IsStrictlyEqula(x, y) 알고리즘**
    > 
    > 
    > [ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-isstrictlyequal)
    > 
    > 1. 타입이 다르면 `false`
    > 2. x가 Number이면 `Number::equal(x, y)` 리턴
    > 3. `SameValueNonNumber(x, y)` 리턴
    - 사용처
        - `Array.prototype`
            - `indexof()`
            - `lastIndexOf()`
        - `TypedArray.prorotype`
            - `index()`
            - `lastIndexOf()`
        - case 문
3. SameValue : `Object.is()`
    
    타입 변환도 없고, 특별한 핸들링(NaN, +0, -0)도 없다.
    
    ```tsx
    Object.is(NaN, NaN) // true
    Object.is(false, 0) // false
    Object.is(-0, +0) // false
    ```
    
    > **SameValue(x, y) 알고리즘**
    > 
    > 
    > [ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-samevalue)
    > 
    > 1. 타입이 다르면 `false`
    > 2. x가 Number이면, `Number::sameValue(x, y)` 리턴
    > 3. `SameValueNonNumber(x, y)` 리턴
4. SameValueZero : 빌트인 연산에서 많이 사용됨
    
    > **SameValueZero(x, y) 알고리즘**
    > 
    > 
    > [ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-samevaluezero)
    > 
    > 1. type이 다르면 `false`
    > 2. x가 Number이면, `Number::sameValueZero(x, y)` 리턴
    > 3. `SameValueNonNumber(x, y)` 리턴
    - 사용처
        - `Array.prototype`
            - `includes()`
        - `TypedArray.prototype`
            - `includes()`
        - Map, Set의 키 비교를 위한 메소드들

> **Number::sameValueZero(x, y) 알고리즘**
> 
> 
> **-0 == +0**
> 
> 1. x와 y가 NaN이면, `true`
> 2. **x가 +0이고, y가 -0이면, `true`**
>     1. 그 반대도 적용
> 3. x가 y와 같은 값이면, `true`
> 4. 그 외 `false`

> **Number::sameValue(x, y) 알고리즘**
> 
> 
> **-0 ≠ +0**
> 
> 1. x와 y가 NaN이면, `true`
> 2. **x가 +0이고, y가 -0이면, `false`**
>     1. 그 반대도 적용
> 3. x가 y와 같은 값이면, `true`
> 4. 그 외 `false`

### `Object.is()` vs `===`

메타 프로그래밍을 해야 할 상황(+0과 -0의 구분)이 아니면 그냥 `===` 쓰자.

만약 `NaN === NaN` 이 `true`여야할 상황이 온다면, `Number.isNaN()` 을 사용하자.

