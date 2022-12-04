---
title: Chap8. 클래스로 인터페이스를 간결하게 유지하라
docType: book
---

## [37] 읽기 쉬운 클래스를 만들어라
JavaScript의 class 문법은 es6에 생겨났다.

> class 인터페이스

```js
class Coupon {
  // ...
}
const coupon = new Coupon();
```

### 생성자
```js
contructor()
```
* `this` context를 생성한다.
* 생성자 내부에서 `this.속성이름`으로 객체 내부의 속성을 추가할 수 있다.


### `private` 속성 및 메소드
`#` 를 이용하여 클래스의 private 속성 및 메소드를 생성할 수 있다.

```js
class Coupon {
  #privateField;
  
  #privateMethod() {

  }
}
```

## [39] 클래스로 기존의 프로토타입을 확장하라
자바스크립트는 프로토타입 언어이다. 자바스크립트에서는 새로운 인스턴스를 생성할 때 메소드를 복제하지 않는다.
대신 프로토타입에 대한 연결을 생성한다.
객체의 인스턴스에 있는 메소드를 호출하면 프로토타입에 있는 메소드를 호출한다.

### 생성자 함수
생성자 함수를 만드려면 함수명을 대문자로 시작해야 한다.
* 인스턴스를 생성할 때, `this` context를 바인딩하지만 메소드는 복제하지 않는다.
* `class` 문법은 단지 프로토타입을 사용하시 위한 속기법일 뿐이다. 그렇기 때문에 2가지 방식이 호환된다.
* 모든 인스턴스를 프로토타입에서 속성을 가져오기 때문에, 새로운 인스턴스를 생성한 후에도 추가한 메소드에 접근할 수 있다.


> `Coupon` 클래스의 생성자 함수 버전

```js
function Coupon(price, expiration) {
  this.price = price;
  this.expiration = expiration || '2주';
}

const coupon = new Coupon(5, '2개월');
coupon.price; // 5
```

> 생성자 함수를 `class`로 상속 받기
```js
class FlashCoupon extends Coupon {
  contructor(price) {
    super(price);
    // ...
  }
}
```



## [40] get과 set으로 인터페이스를 단순하게 만들어라
### `get`
```js
class Coupon {
  get priceText() {
    return `$ ${this.price}`;
  }
}

coupon.price = 10;
coupon.priceText; // $ 10
```
클래스의 메소드를 선언할 때 선행 키워드로 `get`을 사용하면 `getter`를 생성할 수 있다.
실제로는 코드가 실행되는 것이지만 속성에 접근하는 것처럼 작동한다.



### `set`
```js
class Coupon {
  set halfPrice(price) {
    this.price = price / 2;
  }
}

coupon.halfPrice = 20;
coupon.price; // 10
coupon.halfPrice; // undefined 💡
```
클래스의 메소드를 선언할 때 선행 키워드로 `set`을 사용하면 `setter`를 생성할 수 있다.
함수에 인자를 전달하여 실행하는 것이 아니라, 속성에 값을 대입하는 방식으로 동작한다.
해당 `setter`에 접근하려고 하면, `undefined`가 노출된다. 

그래서 일반적으로는 `getter`와 `setter`를 같은 이름을 사용한다.
그리고 게터나 세터의 이름과 같은 이름을 가진 속성을 선언할 수 없다.(아마 이게 가능하다면 get할 때 콜스택이 오버플로우될 것이다)

### `getter`와 `setter`를 사용하면
* 좋은 점
  * 기존의 코드를 리팩토링할 필요가 없다.
  * 복잡도를 숨길 수 있다.
* 안좋은 점
  * 의도까지 함께 가려진다. 실제로는 메소드를 호출하지만 속성을 설정한다고 생각할 수도 있다.

`getter`와 `setter`를 사용하면 디버깅도 어렵고 테스트하기도 어렵다.
그래서 충분한 테스트와 문서화를 통해 의도를 명확하게 전달하자!



### 비공개 속성
ECMA 2023 에는 나와있다!!! https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields

하지만 이전 버전의 스크립트에서는 비공개 속성을 선언하는 문법이 없으므로, 컨벤션을 지켜줘야 한다.

보통 속성의 앞에 `_`가 붙으면 건드리지 않는 게 좋다.
```js
class Coupon {
  contructor(price) {
    this._price = price;
  }

  get price() {
    return this._price;
  }

  set price(p) {
    const newPrice = price.toString().replace(/[^\d]/g, '');
    this._price = parseInt(newPrice, 10);
  }
}
```


## [41] 제너레이터로 이터러블 속성을 생성하라
`function*` 키워드를 사용하여 **제너레이터**를 만들 수 있다.
* 장점
  * 다른 개발자들이 클래스의 세부 구현 내용을 알 필요가 없다.
* 단점
  * 복잡도를 숨김으로써 디버깅을 더 어렵게 만든다.
* 주의할 점
  * 너무 많은 것을 숨기지 않도록 주의해야 한다.



```js
function* getMusicList() {
  yield 'A';
  yield 'B';
  yield 'C';
}

[...getMusicList()]; // A, B, C
```

게다가 `...` 연산자로 배열로 바로 만들 수 있다.
```js
function* getId() {
  let cnt = 0;
  while(true){
    yield cnt++;
  }
}
console.log([...getId()])
```

위 코드 같은 경우 당연히 무한루프에 걸린다.

### iterable이 필요하다면
```js
const iterable1 = {};

iterable1[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

console.log([...iterable1]);
```
`[Symbol.iterator]`를 사용해서 객체에 iterator를 넣을 수 있다.

```js
class FamilyTree() {
  * [Symbol.iterator]() { // 주목
    let cnt = 0;
    while(true) {
      yield this.어쩌고[cnt++];
    }
  }
}
```
`* [Symbol.iterator]()` 를 사용해서 클래스에 iterator를 넣을 수 있다.

## [42] `bind()`로 문맥 문제를 해결하라
클래스에서 속성은 생성자에서 설정하고, 메소드는 따로 위치한다. (메소드는 `[[Prototpe]]`에 존재한다)
그래서 클래스의 메소드 내에서 다른 메소드를 호출할 때 this 바인딩이 발생하여 `this`가 클래스를 가리키게 되지 않는다.
해결할 방법은
1. `this`에 접근하는 메소드를 생성자를 통해 화살표 함수로 통해 정의(속성으로 정의)
    ```js
    class Validator {
      contructor() {
        this.setInvalidMessage = field => `${field}${this.message}`;
      }
    }
    ```

    어떤 메소드는 속성으로, 다른 메소드는 클래스 메소드로 설정되기 때문에 비추하는 방법
2. `this`에 접근하는 메소드를 호출하는 메소드에서 해당 메소드를 `bind(this)`하여 호출
    ```js
    class Validator {
      setInvalidMessages(...fields) {
        return fields.map(this.setInvalidMessage.bind(this));
      }
    }
    ```

    보통 이렇게 해결한다.   
    그런데 호출할 때마다 `bind()`해주어야 해서, 속성에 `bind()`를 설정해서 여러 번 설정해주어야 하는 것을 피할 수 있다.

    ```js
    class Validator {
      constructor() {
        this.setInvalidMessage = this.setInvalidMessage.bind(this);
      }

      setInvalidMessages(...fields) {
        return fields.map(this.setInvalidMessage);
      }
    }
    ```
3. 생성자 밖에서 클래스 속성 설정
    babel 7.0부터 도입.
    화살표 함수 사용하면 this 바인딩이 없어서 문제 해결.
    ```js
    class Validator {
      setInvalidMessage = field => `${field}${this.message}`;
      setInvalidMessages(...fields) {
        return fields.map(this.setInvalidMessage);
      }
    }
    ```


### 클래스의 메소드는 `[[Prototpe]]`에 존재한다


❓ 근데 context binding, this binding은 어떻게 가능한건지


* * *
### 읽어볼 자료
* [MDN 클래스 개요](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes#Sub_classing_with_extends)
* [React Binding Patterns: 5 Approaches for Handling `this`](https://medium.com/free-code-camp/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56)


