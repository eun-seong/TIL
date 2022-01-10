---
title: 아이템3) 코드 생성과 타입이 관계없음을 이해하기
---

타입스크립트 컴파일러의 역할

1. 스크립트를 브라우저에서 동작할 수 있도록 구버전의 자바스크립트로 트랜스파일
2. 코드의 타입 오류 체크

이 둘은 완벽히 독립적이다. 타입 체크에서 오류가 있어도 컴파일이 가능하다. 

컴파일을 하면 타입 구문은 모두 사라진다. 즉 런타임에는 타입 체크가 불가능하다. 

런타임에 타입 정보를 유지하는 방법

1. 객체에 특정 속성이 존재하는지 체크
    
    if ( 'height' in shape )
    
2. 태그 기법
    
    타입 정보를 명시적으로 저장
    
    - 태그드 유니온
        
        Square | Rectangle
        
    
    if (shape.height === 'rectangle' )
    
3. 타입을 클래스로 만들기
    
    생성자응 통해 속성 받음
    

주의하자

- 타입 연산은 런타임에 영향을 주지 않는다
    
    as 연산의 경우 자바스크립트에선 아무런 영향이 없다! 타입 체크가 필요할 경우 typeof 연산자 사용
    
- 런타임 타입은 선언된 타입과 다를 수 있다
    
    선언된 타입은 언제든지 달라질 수 있다.
    
- 타입스크립트의 타입은 런타임과 무관하기 때문에 타입으로 오버로드 할 수 없다
- 타입스크립트 타입은 런타임 성능에 영향을 주지 않는다