---
title: 'Ch5. 클로저'
---

# 05 클로저

## 클로저의 의미 및 원리 이해

Closure : 어떤 함수 A에서 선언한 변수 a를 참조하는 내부함수 B를 외부로 전달할 경우, A의 실행 컨텍스트가 종료된 이후에도 변수 a가 사라지지 않는 현상

* 클로저는 여러 함수형 프로그래밍 언어에서 나타나는 보편적인 특성이다.
* 어떤 함수에서 **선언한 변수를 참조하는 내부함수**에서만 발생한다.
* 지역 변수를 참조하는 내부함수가 외부로 전달되는 경우가 유일하다(return 혹은 콜백함수).
* 실행 컨텍스트가 제거되었는데도 계속 참조하고 있는 변수나 함수가 있어 GC가 수집하지 않는다.

```js
var outer = function() {
  var a = 1;
  var inner = function() {
    return ++a;
  }
  return inner;
};
var outer2 = outer();
console.log(outer2());	// 2
console.log(outer2());	// 3
```

## 클로저와 메모리 관리

변수의 참조 카운트가 0이 되면 GC가 해당 변수를 수거해간다. 클로저를 사용한 후에 참조 카운트를 0으로 만들면 클로저를 없앨 수 있다.
보통은 `null`혹은 `undefined`를 대입한다.

```js
var outer = (function() {
  var a = 1;
  var inner = function() {
    return ++a;
  }
  return inner;
})();
console.log(outer());
outer = null;	// outer 식별자의 inner 함수 참조를 끊어버림
```

## 클로저의 활용 사례

### 콜백 함수 내부에서 외부 데이터를 사용할 때

```js
var alertFruit = function(fruit) {
  alert('your choice is ', fruit);
}
fruits.forEach(function(fruit) {
  var $li = document.createElement('li');
  $li.innerText = fruit;
  $li.addEventListener('click', alertFruit);
  $ul.appendChild($li);
});
document.body.appendChild($ul);
alertFruit(fruits[1]);
```

이 경우에는 과일 이름이 아닌 `[object MouseEvent]`가 출력된다. `bind`로 해결할 수 있다.

```js
fruits.forEach(function(fruit) {
  var $li = document.createElement('li');
  $li.innerText = fruit;
  $li.addEventListener('click', alertFruit.bind(null, fruit));
  $ul.appendChild($li);
})
```

하지만 이렇게 하면 `this`의 값이 달라진다. 이런 변경사항을 해결하기 위해선 고차함수를 활용하면 된다.

```js
var alertFruitBuilder = function(fruit) {
  return function() {
  	alert('your choice is ', fruit);
  }
}
fruits.forEach(function(fruit) {
  var $li = document.createElement('li');
  $li.innerText = fruit;
  $li.addEventListener('click', alertFruitBuilder(fruit));
  $ul.appendChild($li);
});
```

`alertFruitBuilder`는 실행되어 실행 컨텍스트가 종료되었지만, `alertFruitBuilder`가 반환한 익명 함수는 `alertFruitBuilder`의 L.E를 참조하고 있기 때문에 `fruit`에 정상적으로 접근이 가능하게 된다.

### 접근 권한 제한(정보 은닉)

```js
var outer = function() {
  var a = 1;
  var inner = function() {
    return ++a;
  }
  return inner;
};
var outer2 = outer();
console.log(outer2());	// 2
console.log(outer2());	// 3
```

외부에서 `outer`라는 변수를 통해서 `outer` 함수를 실행할 수는 있지만, `outer` 함수 내부에는 개입은 할 수 없다.

이처럼 외부에 공개하고자 하는 정보들을 모아서 return 하고, 아닌 것들은 return하지 않는 것으로 접근 권한을 제한할 수 있다.
또, return된 변수를 덮어씌우는 것을 방지하기 위해선 `Object.freeze()`를 활용하면 된다.

### 부분 함수 적용

`bind` 메소드를 통하여 부분 함수를 적용할 수 있다. 이 부분 함수 적용은 **디바운스** 기능을 구현하는데 적합하다.

```js
var debounce = function(evenetName, func, wait) {
  var timeoutId = null
  return function(event) {
    var self = this;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func.bind(self, event), wait);
  }
}

var moveHandler = function(e) {
  console.log('move event 처리')
}
var wheelHandler = function(e) {
  console.log('wheel event 처리')
}
document.body.addEventListener('mousemove', debounce('move', moveHandler, 500))
document.body.addEventListener('mousewheel', debounce('wheel', wheelHandler, 700))
```

### 커링 함수

**커링 함수(currying function)** : 여러 개의 인자를 받는 함수를 하나의 인자만 받는 함수로 나눠서 순차적으로 호출될 수 있게 체인 형태로 구성한 것
커링은 한 번에 하나의 인자만 전달하는 것을 원칙으로 한다. 마지막 인자가 전달되기 전까 원본 함수가 실행되지않고, 중간 과정에서 실행된 함수는 다음 인자를 받기 위해 대기한다. 이를 함수형 프로그래밍에서 **지연 실행(lazy execution)**이라고 한다.

```js
var curry5 = func => a => b => c => d => e => func(a, b, c, d, e);
```

Redux에서 ` logger`, `thunk`는 `store`, `next`를 미리 전달받고, 이후에는 `action`만 받아 처리할 수 있게끔 한 것이다.

