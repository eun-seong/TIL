---
title: 'Ch4. 콜백 함수'
---
# 04 콜백 함수

콜백함수는 다른 코드에게 인자로 넘겨줌으로써 그 제어권도 함께 위임한 함수이다.

어떤 함수의 인자에 객체의 메소드를 전달하더라도 이는 결국 메소드가 아니라 함수일 뿐이다.

```js
var obj = {
  vals: [1, 2, 3],
  logValues: function(v, i) {
    console.log(this, v, i);
  }
};
obju.logValues(1, 2);							// obj { vals: [1, 2, 3], logValues: f } 1 2	
[4, 5, 6].forEach(obj.logValues);	// Window { ... } 4 0
```

