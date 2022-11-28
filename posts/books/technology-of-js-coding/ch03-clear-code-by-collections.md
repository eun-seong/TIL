---
title: Chap3. 특수한 컬렉션을 이용해 코드 명료성을 극대화하라
docType: book
---



데이터에 사용하는 컬렉션이 결국은 데이터를 다루는 방법을 바꾼다.

## [10] 객체를 이용해 정적인 키-값을 탐색하라

## [11] Object.assign() 으로 조작없이 객체를 생성하라

> **Object.assign()**
> 
> 
> 참조 객체들의 모든 이터러블한 프로퍼티를 복사해 대상 객체에 붙인다. 그 후 대상 객체를 반환한다.
> 

```tsx
const c = Object.assign(a, b);
c === a; // true
```

가장 첫 번째 파라미터의 객체에 그 이후에 오는 객체의 프로퍼티를 얕은 복사하여 넣는다.
그래서 원본을 조작(mutation)하게 된다.

조작을 피하기 위해서는 가장 첫 번째 객체를 새로 생성하면 된다.

```tsx
const c = Object.assign({}, a, b);
c === a; // false
```

하지만 이 경우에도 얕은 복사이기 때문에, 원시값이 아닌 객체 프로퍼티일 경우 참조자만 복사된다.
이 경우에는 그 객체를 또 `Object.assign()` 해주면 되긴 된다.

혹은 `lodash` 의 `_.cloneDeep()` 을 사용하던가.

아니면 `...` spread 연산자 사용하던가.

## [12] 객체 펼침 연산자로 정보를 갱신하라

Object.assign()과 같은 기능 `...`

assign과 마찬가지로 같은 키를 가진 값이 있으면, 마지막에 선언된 키의 값이 사용된다.

## [13] 맵으로 명확하게 키-값 데이터를 갱신하라

### Map

- map은 key-value로 이루어진 데이터 형식이다.
- 모든 key는 하나의 Map 안에서 유일하다.
- 이터레이션이기 때문에 `[key, value]`으로 `for ... of` 를 사용할수 있다.
- iteration을 실행하면, 삽입된 순서로 순회한다.
- 값 비교는 `SameValueZero` 알고리즘에 베이스를 둔다. (브라우저마다 다르긴하다. `SameValue` 사용하는 데도 있다)

### Object vs Map

- Object에는 기본으로 가지고 있는 프로퍼티가 있기 때문에, 내가 직접 어떤 키를 객체에 주입하려면 이미 가지고 있는 키가 아닌지 주의해야 한다.
Map은 아무것도 없다. 주입한 키만 키이다.
- Map의 key 타입은 어떠한 것도 가능하다. 함수, 객체, 원시 타입 모두~
객체는 `String` 혹은 `Symbol` 만 가능하다.
- Map의 key 순서는 Map에 엔트리가 삽입된 순서의 키와 동일하다.
Object는 프로퍼티 순서가 복잡하다. 최선의 방법은 프로퍼티 순서에 의존하지 않는 것이다.
- Map의 크기는 `size` 프로퍼티가 결정한다.
Object의 크기는 수동으로 결정되어야 한다. (length, size 없음)
- Map은 iterable하다. 바로 접근할 수 있다.
Object는 iteration protocol을 가지고 있지 않다. 그래서 `for ... of` 를 디폴트로 직접 사용할 수 없다. 대신 `for ... in` 은 enumerable 프로퍼티를 접근하기 때문에 객체에서 이건 사용할 수 있다.
- 잦은 삽입, 삭제가 있는 상황에선 Map의 성능이 더 낫다.
- Map은 직렬화와 파싱 지원 메소드가 없다. 대신 `JSON.stringify()` 와 `JSON.parse()` 의 두 번째 인자로 변환 콜백을 넘겨서 직렬화&파싱 함수를 직접 만들 수 있다.

### Map이 명세에 추가된 이유

많은 데이터를 가진 객체를 보다 쉽고, 명료하게 관리하기 위해서

```tsx
function addFilters(filters, kaykey value) {
	filters[key] = value;
}
function deleteFilters(filters, key) {
	delete filters[key]
}
function clearFilters(filters) {
	filters = {};
	return filters;
}
```

1. 삽입 : **객체 자체의 메소드**를 사용했다. `[ ]`
2. 삭제 : **언어에 정의된 `delete` 키워드**를 사용했다.
3. 초기화 : 원래 가지고 있던 객체의 프로퍼티를 flushing한 게 아니라, **새 객체를 생성했다.**

**3가지 동작을 하는데, 3가지 패러다임을 사용했다.**

```tsx
const petFilters = new Map();
function addFilters(filters, key, value) {
	filters.set(key);
}
function deleteFilters(filters, key) {
	filters.delete(key);
}
function clearFilters(filters) {
	filters.clear();
} 
```

모든 동작과 의도가 매우 명료하게 되었다.

## [14] 맵과 펼침 연산자로 키-값 데이터를 순회하라

## [15] 맵 생성 시 부수 효과를 피하라

## [16] 세트를 이용해 고윳값을 관리하라

---

## Iteration protocols

[Iteration protocols - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)

## ECMA-262에서의 Map

[ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/multipage/keyed-collections.html#sec-map-objects)