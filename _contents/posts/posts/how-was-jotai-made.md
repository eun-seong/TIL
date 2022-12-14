---
title: jotai 톺아보기
tags: FE, jotai, state
category: post
---


요즘 새로운 `React` 전역 상태 관리 라이브러리가 많이 보이는 것 같아요.
저는 최근에 회사에서 `Jotai`가 여러 번 언급되어서 한 번 찍먹해봤는데, 꽤 재밌는 부분이 있어서 코드를 뜯어보려 합니다.




# Jotai 살펴보기

Jotai 공식 홈페이지에서 Jotai에 대한 설명을 보면 "React를 위한 원시적이고 유연한 라이브러리(Primitive and flexible state management for React)"라고 설명하고 있어요.

그리고 제가 찍먹하면서 느낀 특이점은 이렇습니다.
* atomic하게 state를 조작할 수 있어요.
* `Provider`를 감싸지 않고, 전역 상태 관리를 할 수 있어요. (이게 가장 신기했어요)
* read-only, write-only, read-write 등 state를 다양하게 설정할 수 있어요.
* get, set에서 다른 atom과 조합하고 조작할 수 있어요.

이 모든 특징이 공식 문서에서 말하고 있는 것처럼 Primitive하고 Flexible하게 느껴졌습니다.

## 구성과 사용 방법

jotai를 이용해서 `atom`을 생성할 수 있어요.
그리고 생성한 `atom`을 통해 
* read-only
* write-only
* read-write
atom을 또 다시 생성할 수 있어요.

이 과정에서 다른 `atom`들의 값을 가져오고 업데이트할 수도 있어요.


> jotai 공식 예제
```js
import { atom } from 'jotai'
// atom을 생성합니다.
export const priceAtom = atom(10)

export const readOnlyAtom = atom((get) => get(priceAtom) * 2)
export const writeOnlyAtom = atom(
  null, // write-only의 경우 첫 번째 인자를 null로 주는 것이 컨벤션이에요.
  (get, set, update) => {
    set(priceAtom, get(priceAtom) - update.discount)
  }
)
export const readWriteAtom = atom(
  (get) => get(priceAtom) * 2,
  (get, set, newPrice) => {
    // 다른 atom을 가져와서 수정할 수 있어요.
    set(priceAtom, newPrice / 2)
  }
)
```

> 사용할 때는
```js
import { useAtom } from 'jotai'
import { readWriteAtom } from './price.atom'

const 리액트컴포넌트 = () => {
  const [doubledPrice, setHalfPriceAtom] = useAtom(readWriteAtom)
}
```



# Jotai의 동작 원리
그럼 본격적으로 jotai의 코드를 살펴볼게요.
일단 제가 궁금한 점은 3가지입니다.
1. `Provider` 보일러플레이트를 작성하지 않았는데, 어떻게 전역 상태 공유가 되는 걸까?
2. jotai 내부에서 `atom`은 어떻게 관리되고 있을까?
3. 

## `atom()` 

모든 atom에 유니크한 `key`가 존재하고, `atom`이 생성될 때마다 `1`씩 증가합니다.
`atom()` 메소드를 사용하여 `atom`을 생성할 경우에는 아래처럼 객체가 생성됩니다.

```js
{
  key,
  init,
  read,
  write,
}
```


이렇게 생성된 `atom`을 사용하려면
1. `useAtom(atom)`
2. `useAtomValue(atom)`
3. `useSetAtom(atom)`
중 하나를 이용해야 합니다.


## `useAtom()`
`atom` 객체를 인자로 받아서 `[useAtomValue(), useSetAtom()]`를 반환해요.


## `useAtomValue()`
이 hook은 `atom`이 "값"만 가져오는 hook입니다.

모듈 `import` 부분을 먼저 살펴보면, 눈에 띄는 점이 있습니다.
```ts
import { useContext, useDebugValue, useEffect, useReducer } from 'react'
```

바로 `useContext`와 `useReducer`를 사용하고 있다는 점입니다.

`useAtom()`과 `useAtomValue()`는 두 번째 파라미터(optional)로 `scope`을 전달 받을 수 있다.
이 `scope`의 타입은
```ts
type Scope = symbol | string | number
```

이 optional한 파라미터 `scope`은 `context`를 가지고 있는 `Map`의 키가 된다.
`ScopeContextMap`이 특정 `scope`을 가지고 있지 않으면 `context`를 새로 생성한다.
가지고 있다면 해당 `context`를 반환한다.
[해당 코드](https://github.com/pmndrs/jotai/blob/main/src/core/contexts.ts#L33)

`context`는 `React.createContext()` API를 사용하여 생성한다.
이 생성된 `context`를 `useContext()`로 `state`를 가져온다.





