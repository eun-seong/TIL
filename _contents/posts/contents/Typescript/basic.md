---
title: '[Typescript] 타입스크립트 변수 선언 및 타입'
path: 'basic'
date: '2021-01-17 17:45:30'
template: 'post'
category: 'Typescript'
---

### 변수 선언 키워드
`var` : 함수 block 단위의 scope => 가장 가까운 함수 block 안에서는 모두 접근 가능하다.   
`let` : block 단위의 scope => 가장 가까운 block 안에서만 접근 가능하다.   
`const` : 선언과 동시에 초기값을 지정해주어야 한다. 선언된 이후 값 변경을 불가능하다.

#### type 지정

변수의 선언과 정의를 함께 할 때, 변수의 타입은 정해진 후 바꿀 수 없다.   
밑 예제에서는 `score`를 30으로 정의해서 `number` 타입으로 설정이 되었고, `string` 타입의 값을 대입할 경우 에러가 발생한다.   
```ts {numberLines}
let score = 30;
score = 10;
score = "30";       // 에러 발생!
```

변수를 선언할 때 정의를 하지 않는다면 `any` 타입으로 설정이 된다.   
`any` 타입은 어떠한 타입도 모두 들어갈 수 있다.
```ts {numberLines}
let score;
score = 10;
score = "30";       // 에러 발생하지 않음
```

### type annotation
`typescript`에서는 타입을 명시적으로 지정해줄 수 있다.

```ts {numberLines}
let score: number;
score = 30;
```

## typescript의 기본 타입
|type|desc|
|---|---|
|`nunber`|숫자형 타입, 정수, 실수, n진수|
|`string`|문자열 타입, `'`, `"`, `${1+3}`|
|`boolean`|true, false|
|`undefined`|`undefined`, `null`|
|`null`|`undefined`, `null`|
|`object`|객체형 타입, 원시형 타입 제외하고 모두 가능|
|`symbol`|보통 `object`의 프로퍼티로 사용, `Symbol()`로 타입 정의|

* 배열일 경우
    ```ts {numberLines}
    let nameList: string[];     // 배열일 경우
    nameList = [
        'dev',
        'eun'
    ]
    ```

* inline literal
    ```ts {numberLines}
    let user1: {name: string, score: number};
    user1 = {
        name: 'dev_eun',
        score: 100,
    };
    ```

* tuple
    ```ts {numberLines}
    let tuple1 = [number, string, number];
    tuple1 = [1, 'hi', 5];
    ```

### interface
메소드나 속성에 대해서 타입을 지정해 줄 수 있다.
```ts {numberLines}
interface TV {
    name: string;
    turnOn(): void;
    turnOff(): void;
}

const myTV: TV = {
    name: 'myTV',
    turnOn() {
        console.log('turn on');
    },
    turnOff() {
        console.log('turn off');
    }
}

const tryTurnOn = (tv: TV) => {
    tv.turnOn();
}

tryTurnOn(myTV);
```

속성에서 있을 수도 없을 수도 있는 속성은 `:` 앞에 `?`를 붙이면 된다.
```ts {numberLines}
interface Cell {
    col: number;
    row: number;
    piece?: Piece;
}
```

#### 특징
* `interface`는 javascript에는 존재하지 않는 개념이기 때문에 컴파일하면 `js` 파일에서 사라진다.
* `interface`를 사용하는 이유는 컴파일 할 당시에 타입 체킹을 하기 위함이다.
* 아무리 길게 작성을 하더라도 컴파일하면 모두 없어지기 때문에 큰 영향을 주지 않는다.

## 함수형 type

#### 함수 인자에 annotation 설정
```ts {numberLines}
const add = (x: number, y: number): number => {
    return x + y;
}

const result = add(1, 2);
```

#### 함수 인자의 기본값 설정
```ts {numberLines}
const buildUserInfo = (name = '-', email = '-')=> {
    return {name, email};
}
```

#### 함수 오버로드 시그니쳐
* 함수 시그니쳐: `type` 키워드를 통해서 함수의 인자를 먼저 지정하는 것    
* 함수 오버로드: 같은 이름의 함수를 여러 개 선언하는 것   
* 유니온 타입 : 매개변수를 여러 개 중 하나로 선언한 것   

```ts {numberLines}
interface Circle {
    name: string
}

interface Rectangle {
    name: string
}

// 오버로드 목록
function store(type: '원'): Circle;
function store(type: '사각형'): Rectangle;

// 구현체
function store(type: '원' | '사각형') {
    if(type === '원') return { name: 'circle'}
    else if(type==='사각형') return {name: 'rectangle'}
    else throw new Error('unsupported');
}

const s = store('원');
console.log(s.name);
```

## enum type
`enum` 키워드를 통하여 선언할 수 있다. 문자열에 대한 값을 숫자로 지정해준다.   

```ts {numberLines}
enum StarbuksGrade {
    WELCOME,        // 0
    GREEN,          // 1
    GOLD            // 2
}

const getDiscount = (v: StarbuksGrade): number => {
    switch(v) {
        case StarbuksGrade.WELCOME:
            return 0;
        case StarbuksGrade.GREEN:
            return 5;
        case StarbuksGrade.GOLD:
            return 10;
        default:
            return -1;
    }
}

console.log(getDiscount(StarbuksGrade.GREEN));
```

중간에 `enum`의 값이 추가되어 코드가 꼬이는 걸 방지하기 위해 값을 직접 지정해주거나, `string`값을 넣어줄 수 있다.

```ts {numberLines}
enum StarbuksGrade {
    WELCOME = 0,
    GREEN = 1,
    GOLD = 2
}
```

```ts {numberLines}
enum StarbuksGrade {
    WELCOME = 'WELCOME',
    GREEN = 'GREEN',
    GOLD = 'GOLD'
}
```

