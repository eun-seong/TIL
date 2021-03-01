---
title: '[Spring] Reactor, Flux, Mono'
path: 'spring_reactor'
date: '2021-02-25 18:10:00'
template: 'post'
category: 'Java'
---

# 비동기(async) vs. 동기(sync)
비동기는 어떤 함수를 호출했을 때 바로 리턴을 받아서 나는 내 할 일 하고 일 시킨 함수는 그 함수대로 일하고.
스레드가 분기돼서 작업을 실행한 후 완료가 되면 콜백함수를 호출한다.

동기는 어떤 함수를 호출했을 때 리턴을 바로 받고, 그 함수가작업이 끝났는지 안끝났는지 직접 확인해야 한다.

# 블락(block) vs. 논블락(non-block)
블락은 어떤 함수를 호출했을 때 내가 아무것도 못함. 그 함수 끝날 때까지 기다려야 됨

논블락은 호출하고 나서 바로 리턴된다. 제어권이 계속 나에게 있음 

# WebFlux는?
적은 수의 스레드가 이벤트 룹을 돌면서 이벤트가 발생했을 때 콜백함수를 등록한다.
webflux에서는 reactive library인 `Reactor`를 사용하고, `Reactor`가 `Reactive Streams`의 구현체이다.

`Reactive Streams`는 비동기 스트림 처리 표준을 처리하기 위함이다.

### 사용 이유
스트림으로 처리하게 되면 작업이 5개일 경우 `Max(5개의 작업이 각각 걸리는 시간)`의 시간이 걸리기 때문   
블락킹으로 하면 `sum(5개의 작업이 각각 걸리는 시간)`
