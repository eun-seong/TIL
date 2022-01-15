---
title: 'Ch3. this'
---

# 03 this

자바스크립트에서 this는 어디에서나 사용할 수 있다.

## 상황에 따라 달라지는 this

this는 기본적으로 실행 컨텍스트가 생성될 때 함께 결정된다 === 함수를 호출할 때 결정된다

### 전역 공간에서의 this

전역 공간에서 this는 전역 객체(전역 컨텍스트를 생성하는 주체)를 가리킨다. 전역 객체는 런타임 환경에 따라 다른 이름과 정보를 가지고 있다. 
브라우저: `window`, Node.js : `global`
전역 변수를 선언하면 자바스크립트 엔진은 이를 전역 객체의 프로퍼티로도 할당한다.

> 자바스크립트의 모든 변수는 특정 실행 컨텍스트의 LexicalEnvironment의 프로퍼티이다.
> 실행 컨텍스트는 변수를 수집해서 L.E의 프로퍼티로 저장한다.

보통의 경우 `window`의 프로퍼티에 데이터를 직접 할당하면 전역 변수처럼 사용할 수 있다.

하지만 '삭제' 명령의 경우에는 조금 다르다.
처음부터 전역객체의 프로퍼티로 할당한 경우에는 삭제가 되지만, 전역변수로 선언한 경우에는 삭제가 되지 않는다. 전역 변수를 선언할 경우 엔진이 자동으로 전역 객체의 프로퍼티로 할당함과 동시에 해당 프로퍼티의 `configurable` 속성을 `false`로 정의한다.

이처럼 `var`로 선언한 전역 변수와 전역 객체의 프로퍼티는 호이스팅 여부와 `configurable`여부에서 차이를 보인다.

### 메소드로서 호출할 때 그 메소드 내부에서의 this

함수 : 그 자체로 독립적인 기능 수행
메소드 : 객체의 메소드로서 호출할 경우

함수 앞에 `.`이나 `[  ]`이 있으면 무조건 메소드로써 호출, 이 외에는 다 함수로써 호출

#### 메소드 내부에서의 this

호출한 주체(객체)에 대한 정보가 담긴다. 

### 함수로서 호출할 때 그 함수 내부에서의 this

#### 함수 내부에서의 this

호출한 주체를 알 수 없기 때문에 this가 지정되지 않는다. 
this가 지정되지 않는 경우 해당 this는 전역 객체를 가리킨다.

#### 메소드 내부함수에서의 this

메소드 내부에서도 호출한 객체가 있으면 해당 객체, 아니면 전역 객체를 가리킨다.

#### 메소드의 내부 함수에서의 this를 우회하는 방법

```js
var obj = {
  outer: function () {
    console.log(this); // { outer: f }
    var innerFunc1 = function () {
      console.log(this); // Window { ... }
    }
    innerFunc1();
    
    var self = this; // !!!!!!!!
    var innerFunc2 = function() {
      console.log(self); // { outer: f }
    }
    innerFunc2();
  }
}
obj.outer();
```

`outer` 안에서 `this`를 변수에 저장한 상태로 해당 변수를 참조하는 방식으로 우회할 수 있다.
ES5에서는 이 방법밖에 없다.

#### this를 바인딩하지 않는 함수

ES6에서는 this가 전역 객체를 바라보는 문제를 보완하고나 **this를 바인딩하지 않는 화살표 함수를 도입**했다. this 바인딩 과정 자체가 빠지게 되어 상위 스코프의 this를 그대로 활용할 수 있다.

### 콜백 함수 호출 시 그 함수 내부에서의 this

이전과 마찬가지로 `.`이 있을 경우 해당 객체, 없을 경우 전역 객체를 가리킨다.

### 생성자 함수 내부에서의 this

`new` 명령어와 함께 함수를 호출하면 해당 함수는 생성자로서 동작하게 된다.
그리고 이 생성자의 내부에서의 `this`는 곧 새로 만들 구체적인 인스턴스 자신이 된다.
생성자 함수를 호출하면 생성자의 `prototype` 프로퍼티를 참조하는 `__proto__`라는 프로퍼티가 있는 인스턴스를 만들고, 미리 준비된 공통 속성을 객체(this)에 부여한다.

```js
var Cat = function(name, age) {
  this.bark = '야옹';
  this.name = name;
  this.age = age;
}
var choco = new Cat('초코', 7);
console.log(choco); // Cat { bark:'야옹', name: '초코', age: 7}
```



## 명시적으로 this를 바인딩하는 방법

### `call()`

```js
Function.prototype.call(thisArg[, arg1[, arg2[, ...]]])
```

첫 번째 인자의 객체로 this가 바인딩된다.
두 번째 인자부턴 해당 함수(메소드)의 인자가 넘겨진다.

```js
var obj = {
  a: 1,
  method: function(x, y) {
    console.log(this.a, x, y)
  }
}

obj.method(2, 3);									// 1 2 3
obj.method.call({ a: 4 }, 5, 6);	// 4 5 6
```



### `apply()`

```js
Function.prototype.apply(thisArg[, argsArray)
```

call() 메소드와 기능적으로 동일하다.
다른 점은, 인자가 2개이며 해당 함수(메소드)의 인자가 <u>배열의 형태</u>로 넘겨진다.

```js
var obj = {
  a: 1,
  method: function(x, y) {
    console.log(this.a, x, y)
  }
}

obj.method.call({ a: 4 }, [5, 6]);	// 4 5 6
```

### `Object.call()`, `Object.apply()` 활용하기

#### 유사배열객체에 배열 메소드를 적용

유사배열객체 : 배열은 아니고 index, length가 있는 객체, String, NodeList 등

```js
var obj = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
};
Array.prototype.push.call(obj, 'd');
console.log(obj); 						// ES5
console.log(Array.from(obj));	// ES6
// { 0: 'a', 1: 'b', 2: 'c', 3: 'd', length: 4}
```

배열의 `push()`를 `call()`을 통해 객체를 순회할 수 있다.
ES6에서는 `Array.from()` 메소드를 통해 객체를 순회할 수 있다.

다만 `String`은 length가 읽기 전용이기 때문에 원본 문자열에 변경을 가하는 push, pop, shift, unshift, splice 등 메소드를 에러가 난다.

#### 생성자 내부에서 다른 생성자 호출

생성자에 this를 넘길 경우 상속처럼 사용

```js
function Person(name, gender) {
  this.name = name;
  this.gender = gender;
}
function Student(name, gender, school) {
  Preson.call(this, name, gender);
  this.school = school;
}
var by = new Student('보영', 'female', '단국대')
```

#### 여러 인수를 묶어 하나의 배열로 전달하고 싶을 때

```js
var numbers = [10, 20, 3, 16, 45];
// ES5
var max = Math.max.apply(null, numbers);
var min = Math.min.apply(null, numbers);

// ES6
const max = Math.max(...numbers);
const min = Math.min(...numbers);
```

### `bind()`

```js
Function.prototype.bind(thisArg[, arg1[, arg2[, ...]]])
```

call()과 비슷하지만 즉시 호출하지는 않고 넘겨 받은 this 및 인수들을 바탕으로 새로운 함수를 반환하기만 한다.
다시 새로운 함수를 호출할 때 인수를 넘기면 그 인수들은 기존 bind 메소드를 호출할 때 전달했던 인수들의 <u>뒤에 이어서 등록된다</u>(부분 적용 함수).

```js
var func = function(a, b, c, d) {
  console.log(this, a, b, c, d);
};
func(1, 2, 3, 4);				// Window{ ... } 1 2 3 4 

var bindFunc1 = func.bind({ x: 1 });
bindFunc1(5, 6, 7, 8);	// { x:1 } 5 6 7 8 

var bindFunc2 = func.bind({x: 1}, 4, 5);
bindFunc2(6, 7);				// { x:1 } 4 5 6 7 
bindFunc2(8, 9);				// { x:1 } 4 5 8 9 
```

#### name 프로퍼티

`bind()` 메소드를 통해 새로 만든 함수는 `name` 프로퍼티에 `'bound'` 라는 접두어가 붙는다

#### 상위 컨텍스트의 this를 내부함수나 콜백 함수에 전달하기

ES5에서 this를 `self`를 통해 우회했던 방법을 `call`, `bind`를 통해 깔끔하게 할 수 있다.

```js
// call
var obj = {
  outer: function() {
    var innerFunc = function() {
      console.log(this);
    };
    innerFunc.call(this);
  }
}
// bind
var obj = {
  outer: function() {
    var innerFunc = function() {
      console.log(this);
    }.bind(this);
    innerFunc();
  }
}
```

콜백함수에 전달할 때도

```js
var obj = {
  logThis: function() {
    console.log(this)
  },
  logThisLater: function() {
    setTimeout(this.logThis.bind(this), 500);
  }
}
obj.logThisLater(); // obj { logThis: f, ... }
```

### 화살표 함수의 예외사항

화살표 함수 내부에는 this가 아예 없으며, 접근하고자 하면 스코프체인상 가장 가까운 this에 접근한다.

