---
title: '[번역] spring kafka 공식 reference'
path: 'kafka_spring_kafka_reference_translate'
date: '2021-01-26 14:12:51'
template: 'post'
category: 'Kafka'
---

원본 : [https://docs.spring.io/spring-kafka/reference/html/#reference](https://docs.spring.io/spring-kafka/reference/html/#reference)

### kafka와 연결하기
* `KafkaAdmin`
* `ProducerFactory`
* `ConsumerFactory`

#### Factory Listeners
버전 2.5부터, DefaultKafkaProducerFactory와 DefaultKafkaConsumerFactory를 Listener로 구성하여 producer와 consumer가 생성되고 닫힐 때마다 알림을 받을 수 있습니다.

```java
// Producer Factory Listner
interface Listener<K, V> {

    default void producerAdded(String id, Producer<K, V> producer) {
    }

    default void producerRemoved(String id, Producer<K, V> producer) {
    }

}
```

```java
// Consumer Factory Listner
interface Listener<K, V> {

    default void consumerAdded(String id, Producer<K, V> consumer) {
    }

    default void consumerRemoved(String id, Producer<K, V> consumer) {
    }

}
```

### Topic 설정
어플리케이션에 `KafkaAdmin` bean을 정의하였다면, 어플리케이션은 자동으로 토픽을 브로커에 추가합니다. 이렇게 하기 위해선 각 토픽마다 `NewTopic` 타입의 `@Bean`을 추가해야 합니다. 버전 2.3은 bean 생생성에 대한 편의를 위해 `TopicBuilder` 클래스를 새로 도입하였습니다.

```java
@Bean
public KafkaAdmin admin() {
    Map<String, Object> configs = new HashMap<>();
    configs.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, ...);
    return new KafkaAdmin(configs);
}

@Bean
public NewTopic topic1() {
    return TopicBuilder.name("thing1")
            .partitions(10)
            .replicas(3)
            .compact()
            .build();
}

@Bean
public NewTopic topic2() {
    return TopicBuilder.name("thing2")
            .partitions(10)
            .replicas(3)
            .config(TopicConfig.COMPRESSION_TYPE_CONFIG, "zstd")
            .build();
}

@Bean
public NewTopic topic3() {
    return TopicBuilder.name("thing3")
            .assignReplicas(0, Arrays.asList(0, 1))
            .assignReplicas(1, Arrays.asList(1, 2))
            .assignReplicas(2, Arrays.asList(2, 0))
            .config(TopicConfig.COMPRESSION_TYPE_CONFIG, "zstd")
            .build();
}
```

2.6 버전 부터, `.partitions()`와 `replicas()`를 생략할 수 있으며 브로커가 이 속성들을 적용할 것입니다. 브로커의 버전은 2.4.0 이상이어야 합니다.

```java
@Bean
public NewTopic topic4() {
    return TopicBuilder.name("defaultBoth")
            .build();
}

@Bean
public NewTopic topic5() {
    return TopicBuilder.name("defaultPart")
            .replicas(1)
            .build();
}

@Bean
public NewTopic topic6() {
    return TopicBuilder.name("defaultRepl")
            .partitions(3)
            .build();
}
```

디폴트로, 브로커가 사용가능하지 않을 때, 메세지는 기록되지만, 컨텍스트는 계속해서 로드됩니다. 프로그래밍적으로 admin의 `initialize()`를 호출할 수 있습니다. 만약 이 조건이 중요하게 여겨지길 바란다면, admin의 `fatalIfBrokerNotAvailable` 속성을 `true`로 설정하십시오. 컨텍스트는 이니셜에 실패할 것입니다.   

`AdminClient`를 사용하면 더 많은 advanced feature을 사용할 수 있습니다.

```java
@Autowired
private KafkaAdmin admin;

...

    AdminClient client = AdminClient.create(admin.getConfigurationProperties());
    ...
    client.close();
```

### 메세지 보내기
#### `KafkaTemplate` 사용하기
`KafkaTemplate`은 producer를 감싸고 Kafka 토픽에게 데이터를 보내는 편리한 메소드를 제공합니다.

`sendDefault` API를 사용하려면 템플릿에 디폴트 토픽이 제공되어야 합니다.

API는 타임스탬프를 매개 변수로 사용하고 이 타임스탬프를 레코드에 저장합니다. 사용자가 제공한 타임스탬프의 저장 방법은 Kafka 항목에 구성된 타임스탬프 유형에 따라 다릅니다. 항목이 `CREATE_TIME`를 사용하도록 구성된 경우, 사용자 지정 타임스탬프가 기록되거나 지정되지 않은 경우 생성됩니다. 항목이 `LOG_APPEND_TIME`을 사용하도록 구성된 경우, 사용자 지정 타임스탬프가 무시되고 브로커가 로컬 브로커 시간에 추가됩니다.

`metrics`와 `partitionFor` 메서드는 기본 `Producer`에서 동일한 메서드에 위임됩니다. `execute` 메서드는 기본 `Producer`에 직접 액세스할 수 있습니다.

템플릿을 사용하려면 생산자 팩토리를 구성하고 템플릿 생성자에 제공할 수 있습니다. 다음 예에서는 이 방법을 보여 줍니다.

```java
@Bean
public ProducerFactory<Integer, String> producerFactory() {
    return new DefaultKafkaProducerFactory<>(producerConfigs());
}

@Bean
public Map<String, Object> producerConfigs() {
    Map<String, Object> props = new HashMap<>();
    props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
    props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
    props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
    // See https://kafka.apache.org/documentation/#producerconfigs for more properties
    return props;
}

@Bean
public KafkaTemplate<Integer, String> kafkaTemplate() {
    return new KafkaTemplate<Integer, String>(producerFactory());
}
```

기본적으로 템플릿은 `LoggingProducerListener`로 구성되어 있으며, 전송에 성공하면 오류를 기록하고 아무 작업도 수행하지 않습니다.

편의를 위해 메소드 중 하나만 구현하려는 경우 기본 메서드 구현이 제공됩니다.

전송 메소드는 `ListenableFuture<SendResult>`을 반환합니다. 수신기에 콜백을 등록하여 비동기식으로 전송 결과를 수신할 수 있습니다.

```java
ListenableFuture<SendResult<Integer, String>> future = template.send("myTopic", "something");
future.addCallback(new ListenableFutureCallback<SendResult<Integer, String>>() {

    @Override
    public void onSuccess(SendResult<Integer, String> result) {
        ...
    }

    @Override
    public void onFailure(Throwable ex) {
        ...
    }

});
```

`SendResult`에는 `ProducerRecord`와 `RecordMetadata` 두 가지 속성이 있습니다. 이러한 개체에 대한 자세한 내용은 Kafka API 설명서를 참조하십시오.

실패 시 던질 수 있는 것은 `KafkaProducerException`에게 던져줄 수 있습니다.예외: 실패한 `ProducerRecord` 속성에 실패한 레코드가 포함되어 있습니다.

버전 2.5부터, `ListenableFutureCallback` 대신 `KafkaSendCallback`을 사용할 수 있습니다. `ListenableFutureCallback`을 사용하면 실패한 `ProducerRecord`를 쉽게 추출할 수 있으므로 `Throwable`을 캐스팅할 필요가 없습니다.

```java
ListenableFuture<SendResult<Integer, String>> future = template.send("topic", 1, "thing");
future.addCallback(new KafkaSendCallback<Integer, String>() {

    @Override
    public void onSuccess(SendResult<Integer, String> result) {
        ...
    }

    @Override
    public void onFailure(KafkaProducerException ex) {
        ProducerRecord<Integer, String> failed = ex.getFailedProducerRecord();
        ...
    }

});
```

람다식으로도 표현가능합니다.

```java
ListenableFuture<SendResult<Integer, String>> future = template.send("topic", 1, "thing");
future.addCallback(result -> {
        ...
    }, (KafkaFailureCallback<Integer, String>) ex -> {
            ProducerRecord<Integer, String> failed = ex.getFailedProducerRecord();
            ...
    });
```

#### 샘플
```java
public void sendToKafka(final MyOutputData data) {
    final ProducerRecord<String, String> record = createRecord(data);

    ListenableFuture<SendResult<Integer, String>> future = template.send(record);
    future.addCallback(new KafkaSendCallback<SendResult<Integer, String>>() {

        @Override
        public void onSuccess(SendResult<Integer, String> result) {
            handleSuccess(data);
        }

        @Override
        public void onFailure(KafkaProducerException ex) {
            handleFailure(data, record, ex);
        }

    });
}
```

### 메세지 받기
`MessageListnerContainer`를 설정하거나 메세지 리스너를 제공하거나 `@KafkaListener` 어노테이션을 사용하여 메세지를 받을 수 있습니다.

#### Message Listner
message listner container을 사용할 경우, 데이터를 받기위한 리스너를 항상 제공해야 합니다. 현재 8가지의 지원되는 인터페이스가 존재합니다.

```java
public interface MessageListener<K, V> { 
    void onMessage(ConsumerRecord<K, V> data);
}
```