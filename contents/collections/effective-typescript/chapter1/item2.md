---
title: 아이템2) 타입스크립트 설정 이해하기
---


noImplicitAny : 변수들이 미리 정의된 타입을 가져야 하는지 여부

strictNullchecks : null과 undefined가 모든 타입에서 허용되는지

예) number 타입에 null값 들어갈 수 있냐없냐

설정할 경우 number | null 과 같이 타입 정의해야 함