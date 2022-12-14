---
title: Chap9. 프라미스를 이용해 비동기적으로 데이터를 가져오라
docType: book
---

외부 데이터에 접근하는 것은 이른바 단일 페이지 웹 어플리케이션에서 매우 중요하다.

### async/await
실제로 이 둘은 분리된 두 개의 동작이다.

* `async` 키워드로 선언한 함수는 비동기 데이터를 사용한다는 것을 의미한다.
* 비동기 함수 내부에서 `await` 키워드를 사용하면 값이 반환될 때까지 함수의 실행을 중지시킬 수 있다.

* 알아둘 점
  1. async/await이 `Promise`를 대체하지 않는다.   
      단지 `Promise`를 더 나은 문법으로 감싸는 것에 불과하다.

### `fetch` ajax 호출

`fetch()`는 자바스크립트 명세가 아니다.
WHATWG(Web Hypertext Application Technology Working Group)이 정의한다.
**그래서 `Node.js`에서는 기본적으로 지원되지 않는다.**

* 특징
  * status code가 `400`대인 경우에도 응답 본문을 반환한다. 그래서 `catch()`로 에러를 처리할 수 없다.
     -> 직접 status code 확인해야 함
  




* * *
### 읽어볼 자료
* [Introduction to Asynchronous JavaScript](https://www.pluralsight.com/guides/introduction-to-asynchronous-javascript)
* [MDN AJAX](https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX/Getting_Started#step_4_%E2%80%93_working_with_the_xml_response)