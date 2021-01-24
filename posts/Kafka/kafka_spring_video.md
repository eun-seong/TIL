---
title: 'Reactive를 품은 Spring Kafka'
path: 'kafka_spring_video'
date: '2021-01-24 18:09:13'
template: 'post'
category: 'Kafka'
---

이 글은 이병찬 님의 강의를 요약한 내용입니다. 원본 강의는 [링크](https://youtu.be/HzQfJNusnO8)에서 확인하실 수 있습니다.

### Kafka
아주 인기있는 스트리밍 플랫폼   
Spring에서 Kafka를 사용하려면 Spring Kafka를 사용하면 된다.   
`@KafkaListner` 어노테이션을 붙이는 것만으로도 웹 MVC에서 리퀘스트 매핍을 한 것과 같은 역할을 할 수 있다.   
컨트롤러와 이 listner가 하는 일이 동일하다고 보면 된다.   

```java
@KafkaListener(topics="myTopic")
public void listen(ConsumerRecord<?, ?> record) throws Exception {
    logger.info(record.toString());
    // Do Something...
}
```

* "myTopic" 토픽의 이름을 통해 들어온 데이터를 `ConsumerRecord` 형태로 만들어서 전달이 된다.
* 하지만 한 가지 약점이 존재
    * 스레드를 점령한다
    * 한 시점에 하나 스레드에서 하나의 레코드만 처리할 수 있다.
    * 메소드 처리 시간이 오래 걸리면 큐에 쌓여 있는 데이터를 소모하는 시간보다 처리하는 시간이 더 길어져서 병목현상 발생할 수 있다.
    * 이 문제를 해결하기 위해 파티션을 쪼개서 병렬적으로 수행하게 한다.
    * 하지만 동시성을 준 것이 아니고 병렬성을 준 것이기 때문에 문제는 여전히 존재하게 된다.


### Streaming Platform의 본질?
구조
> producer ---publish---> stream <---subscribe--- consumer

* Reactive의 구조와 굉장히 유사

### ReactiveX의 Observable, Reactor의 Flux 본질??
* 어떤 대상을 **Asynce**하게 다루는 것
* **Async**하게 다룬 것을 **Stream**으로 처리하겠다.

* 그렇기 때문에 kafka에서 사용하는 것을 flux로 완전히 대체할 수 있다고 해석할 수 있다.

* consumer
    > 특정 토픽에 대해서 kafka에 구독을 하고, 이것을 flux로 받아서 한 건 한 건씩 비동기로 처리를 하겠어!

* producer
    > 그저 flux create를 하는 것 뿐이야! 데이터만 밀어 넣어주면 돼!

## Reactor Kafka
* Maven이나 Gradle에서 dependecy만 추가해주면 사용가능하다
* Spring Kafka 2.3.0부터 Reactor Kafka를 본격적으로 지원하기 시작했다.


* * *

# 기본 기능 구현하기


1. DB에 데이터가 업데이트되면 Detector는 그 정보를 메시지로 만들고 스트림으로 발행한다.   
2. Update 처리기를 메시지를 읽고 업데이트 정보를 프로세싱한다.

```java
public void process() {
    consume().flatMap(this::recordToEventObject)
             .flatMap(this::saveEvent)
             .flatMap(this::getReceivers)
             .flatMap(this::dataProcessing)
             .flatMap(this::saveResult)
             .subscribe();
}
```

### 메시지 중복 제거하기
* 5개의 detector가 존재한다.
* 동일한 이벤트가 중복 감지되는 건 무시해야 한다.
* `sampleFirst()`와 `groupBy()`를 이용한다.

```java
public void process() {
    consume().flatMap(this::recordToEventObject)
             .groupBy(Message::key)
             .flatMap(flux -> flux.sampleFirst(Duration.ofSeconds(30)))
             .flatMap(this::saveEvent)
             .flatMap(this::getReceivers)
             .flatMap(this::notify)
             .flatMap(this::saveResult)
             .subscribe();
}
```

### 데이터 모아서 처리하기
* 한 번에 많은 데이터를 모아서 처리한다.
* 기준 시간 동안 발생한 여러 이벤트는 하나의 메시지로 모아서 통지하자.
    - 이게 우리와 맞는 것인가?
* `buffer()`를 이용한다.

```java
public void process() {
    consume().flatMap(this::recordToEventObject)
             .groupBy(Message::key)
             .flatMap(flux -> flux.buffer(Duration.ofSeconds(30)))
             .flatMap(this::notify)
             .flatMap(this::saveResult)
             .subscribe();
}
```

### 정해진 양만큼만 처리하기
* 요청량이 과다해질 경우 장애가 발생할 수 있다.
  
#### 메시지가 흘러가는 큰 그림
![](../2021-01-24-19-59-06.png)

* Flow의 flow
    1. subscriber가 publisher에게 `subscribe()`
    2. publisher가 subscriber에게 `onSubscribe()`
    3. subscriber가 publisher에게 `request(n)`
    4. publisher는 subscriber에게 n개의 데이터만 제공

* Subscriber를 커스텀하면 된다.
  
```java
public class CustomSubscriber extends BaseSubscriber<~> {
    @Override
    protected void bookOnSubscribe(Subscription subscription) {
        request(10);
    }

    @Overrice
    protected void hookOnNext(ReceiverRecord<String, String> record) {
        Mono.just(record)
            .flatMap(/* Do something */)
            .subscribe(r -> {
                offsetSink.next(record);
                request(10);
            });
    }
}
```

### 시간을 달리는 메시지
#### offset이 증가하는 경우에만 Commit을 하자.

```java
public class CustomSubscriber extends BaseSubscriber<~> {
    private FluxSink<~> offsetSink;

    @Override
    protected void hookOnNext(ReceiverREcord<String, String> record) {
        ...
        Flux.<~>create(sink -> offsetSink = sink)
            .reduce(-1L, (last, r) -> last < r.offset()
                                    ? commit(r)
                                    : last)
            .subscribe();
    }
}
```

## 몇 가지 결론
* 구슬이 서 말이라도 꿰어야 보배라
* More Abstraction, Less Code!
* 깊이 알고 제대로 쓰자
* 모든 것을 공짜로 해결할 수 없다.


* * *

* [github 예제 코드](https://github.com/EleganceLESS/nhn-forward-2019)

