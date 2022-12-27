---
title: 'spring kafka 샘플 프로젝트'
path: 'kafka_spring_kafka_first_sample_project'
date: '2021-01-26 20:38:25'
template: 'post'
category: 'Kafka'
---

* [Github Repo](https://github.com/eun-seong/spring-kafka-demo)
  
#### 실행 방법
1. kafka 실행   
   
    ```shell
    $ bin/zookeeper-server-start.sh config/zookeeper.properties
    $ bin/kafka-server-start.sh config/server.properties
    ```

2. 스프링 서버 실행   
   
    ```shell
    $ mvn spring-boot:run
    $ curl http://localhost:8080/start
    ```


* * *
### Spring Reactor
* `Mono` : 한 개의 값을 전달하는 reactor 객체
* [`Flux`](https://projectreactor.io/docs/core/release/api/reactor/core/publisher/Flux.htm) : 여러 개의 값을 전달하는 reactor 객체
    * `map()` : `Flux` 데이터를 1-1 방식으로 변환한다. 인자로는 `Flux`의 타입을 받는다.
    * `flatMap()` : `Flux` 데이터를 1-N 방식으로 변환하여 시퀀스를 생성한다. 인자로는 `Flux`의 타입을 받는다.
    * `donOnNext()` : `Flux`가 Subscriber에 next 신호를 발생할 때 호출된다. 인자로는 `Flux`의 타입을 받는다.

### `pom.xml`
<details>
<summary>Code 보기</summary>

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.2.1.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.nhn.forward2019</groupId>
    <artifactId>reactive-kafka</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>reactive-kafka</name>
    <description>Demo project for Spring Boot</description>

    <properties>
        <java.version>11</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-webflux</artifactId>
        </dependency>

        <!-- https://mvnrepository.com/artifact/io.projectreactor.kafka/reactor-kafka -->
        <dependency>
            <groupId>io.projectreactor.kafka</groupId>
            <artifactId>reactor-kafka</artifactId>
            <version>1.2.0.RELEASE</version>
        </dependency>

        <!-- https://mvnrepository.com/artifact/org.springframework.kafka/spring-kafka-test -->
        <dependency>
            <groupId>org.springframework.kafka</groupId>
            <artifactId>spring-kafka</artifactId>
            <version>2.3.3.RELEASE</version>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
            <exclusions>
                <exclusion>
                    <groupId>org.junit.vintage</groupId>
                    <artifactId>junit-vintage-engine</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
        <dependency>
            <groupId>io.projectreactor</groupId>
            <artifactId>reactor-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>
```
</details>

* io.projectreactor.kafka:reactor-kafka
    * 1.2.0.RELEASE
* org.springframework.kafka:spring-kafka
    * 2.3.3.RELEASE
* org.springframework.boot:spring-boot-starter-test


### `KafkaManager`
<details>
<summary>Code 보기</summary>

```java
@Component
public class KafkaManager {
    private static final String BOOTSTRAP_SERVERS = "localhost:9092";   // kafka host
    private final Map<String, Object> consumerProps;                    // consumer settings
    private final Map<String, Object> producerProps;                    // producer settings

    public KafkaManager() {
        this.consumerProps = Map.of(
                ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, BOOTSTRAP_SERVERS,
                ConsumerConfig.CLIENT_ID_CONFIG, "consumer",
                ConsumerConfig.GROUP_ID_CONFIG, "group",
                ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class,
                ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class,
                ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");

        this.producerProps = Map.of(
                ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, BOOTSTRAP_SERVERS,
                ProducerConfig.CLIENT_ID_CONFIG, "producer",
                ProducerConfig.ACKS_CONFIG, "all",
                ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class,
                ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
    }

    public Flux<SenderResult<String>> producer(final Publisher<? extends SenderRecord<String, String, String>> publisher) {
        final SenderOptions<String, String> options = SenderOptions.create(producerProps);

        return KafkaSender.create(options)
                .send(publisher);
    }
    
    public Flux<ReceiverRecord<String, String>> consumer(final String topic) {
        final ReceiverOptions<String, String> options = ReceiverOptions.<String, String>create(consumerProps)
                .subscription(List.of(topic));

        return KafkaReceiver.create(options)
                .receive();
    }
}

```

</details>

* ProducerConfig
    * `BOOTSTRAP_SERVERS_CONFIG` : kafka server
    * `CLIENT_ID_CONFIG` : client id
    * `ACKS_CONFIG` : 프로듀서가 메세지를 보내고 그 메세지를 kafka가 잘 받았는지 확인할 것인지 아닌지
    * `KEY_SERIALIZER_CLASS_CONFIG` : broker에게 보낼 객체를 바이트 배열로 변환하기 위해 serializing을 한다.
    * `VALUE_SERIALIZER_CLASS_CONFIG` : broker에게 보낼 객체를 바이트 배열로 변환하기 위해 serializing을 한다.

* [`ConsumerConfig`](https://kafka.apache.org/24/javadoc/org/apache/kafka/clients/consumer/ConsumerConfig.html)
    * `BOOTSTRAP_SERVERS_CONFIG` : kafka server
    * `CLIENT_ID_CONFIG` : client id
    * `GROUP_ID_CONFIG` : group id
    * `KEY_DESERIALIZER_CLASS_CONFIG` : broker가 보낸 바이트 배열을 객체로 변환하기 위해 deserializing을 한다.
    * `VALUE_DESERIALIZER_CLASS_CONFIG` : broker가 보낸 바이트 배열을 객체로 변환하기 위해 deserializing을 한다.
    * `AUTO_OFFSET_RESET_CONFIG` : auto.offset.reset
        * latest : 가장 마지막 offset부터
        * earliest : 가장 처음 offset부터
        * none : 해당 consumer group이 가져가고자 하는 topic의 consuer offset 정보가 없으면 exception을 발생시킴.

#### `producer()`
* 인자로 토픽 이름을 받아 `SenderOptions` 옵션을 생성한다.
* `KafkaSender.create(SenderOptions<K,V> options)`
    * kafka에 레코드 시퀀스를 보내고 각 레코드의 파티션과 오프셋이 포함된 레코드 메타데이터 응답의 Flux를 반환한다.
    * 응답은 각 파티션에 대해 재시도 없이 순서가 지정되지만, 다른 파티션의 응답은 요청과 다른 순서로 인터리브될 수 있댜.
    * 추가 상관 관계 메타데이터는 Kafka로 전송되지 않지만 요청에 대한 응답을 일치시키기 위해 응답 Flux에 포함되어 있는 SenderRecord에서 전달될 수 있다.


#### `consumer()`
* 인자로 토픽 이름을 받아 `ReceiverOptions` 옵션을 생성한다.
* `KafkaReceiver.create(ReceiverOptions<K,V> options)`
    * 레코드나 receiver에 설정된 파티션을 컨슈밍하는 Kafka receiver를 시작한다.
    * 레코드는 kafka에서 소비되고 Flux에서 요청을 할 때 Flux가 반환된다.
    * Flux가 종료될 때 kafka 컨슈머도 종료된다.

### DemoController
<details>
<summary>Code 보기</summary>

```java
@RestController
@RequestMapping("/")
public class DemoController {
    private DemoService service;
    private AtomicBoolean running;

    public DemoController(DemoService service) {
        this.service = service;
        this.running = new AtomicBoolean(false);
    }

    @GetMapping("/start")
    public Mono<String> start() {
        return running.compareAndSet(false, true)
                ? service.start()
                : Mono.just("Already Running");
    }

    @GetMapping("/stop")
    public Mono<String> stop() {
        return running.compareAndSet(true, false)
                ? service.stop()
                : Mono.just("Not Running Now");
    }
}
```

</details>

* `@RestController`
    * View를 반환하는 `@Controller`에 Data를 반환하는 `@ResponseBody`가 추가된 어노테이션
    * json 형태로 객체 데이터를 반환한다.
* `@RequestMapping({NAME})`
    * `NAME`과 일치하는 path는 모두 해당 컨트롤러로 전달된다.
* `@GetMapping({NAME})`
    * 컨트롤러의 path 뒤에 `NAME`과 일치하는 path는 모두 해당 메소드로 전달된다.
* `Atomic` Type
    * 멀티스레드에서 동시성 문제를 해결할 수 있는 타입이다.
    * 해당 프로젝트에서는 spring 서버의 상태를 동기화하기 위해 사용되었다.
* 콘솔에서 실행할 때 맵핑메소드가 리턴하는 값이 콘솔에 출력된다.

### DemoService
<details>
<summary>Code 보기</summary>

```java
@Service
public class DemoService {
    private static final Logger logger = LoggerFactory.getLogger(DemoService.class);
    private static final String SERVICENAME = "demo";

    KafkaManager kafkaManager;
    Disposable disposable;

    public DemoService(KafkaManager kafkaManager) {
        this.kafkaManager = kafkaManager;
    }

    public Mono<String> start() {
        consume();
        produce();
        return Mono.just("START");
    }

    public Mono<String> stop() {
        dispose(disposable);

        return Mono.just("STOP");
    }

    protected void dispose(Disposable disposable) {
        if (disposable != null && !disposable.isDisposed()) {
            disposable.dispose();
        }
    }

    /***** produce *****/
    protected void produce() {
        final Flux<SenderRecord<String, String, String>> records = generateSource()
                .doOnNext(comp -> logger.info("Create - name: {}\tmajor: {}",comp.getT1(), comp.getT2()))
                .map(Object::toString)
                .map(i -> SenderRecord.create(new ProducerRecord<>(SERVICENAME, i, i), i));

        kafkaManager.producer(records)
                .subscribe();
    }

    /***** consume *****/

    protected void consume() {
        disposable = kafkaManager.consumer(SERVICENAME)
                .subscribe();
    }


    /***** general *****/
    protected Flux<Tuple2<String, String>> generateSource(){
        return Flux.just(
                Tuples.of("eun", "computer"),
                Tuples.of("lobster", "statistics"),
                Tuples.of("zooho", "computer"),
                Tuples.of("hyeon", "mechanical"),
                Tuples.of("nayng", "electronic"))
                .delayElements(Duration.ofMillis(1000));
    }
}
```

</details>

* `@Service`
    * 해당 어노테이션을 붙인 클래스를 서비스가 된다.
    * 컨트롤러에서 서비스를 생성자 주입한다.
* `start()` method
    * 서버가 동작하면 `consume()`과 `produce()` 메소드르 실행한다. 

#### `produce()`

```java
protected void produce() {
    final Flux<SenderRecord<String, String, String>> records = generateSource()
            .doOnNext(comp -> logger.info("Create - name: {}\tmajor: {}",comp.getT1(), comp.getT2()))
            .map(Object::toString)
            .map(i -> SenderRecord.create(new ProducerRecord<>(SERVICENAME, i, i), i));

    kafkaManager.producer(records)
            .subscribe();
}
```

* `Flux`가 값을 1초마다 publish한다.
    * `doOnNext()`에서 `Flux` 객체를 받아 컨슘한 후 로그를 찍는다.
* `SenderRecord.create(ProducerRecord<topic, K, V> record, T correlationMetadata)`
    * 레코드에 카프카 토픽 파티션을 추가하는 kafka sender 객체를 생성한다.
    * `correlationMetadata`는 kafka로 전송되진 않지만 `SenderResult`를 이 레코드에 일치시키기 위한 응답에 포함된 부가적인 상관 관계 메타데이터이다.
* `ProducerRecord<>(String topic, K key, V value)` 
    * kafka로 보낼 key/value 이다.
* `kafkaManager.producer()`는 `Flux<SenderRecord<String, String>>`를 반환한다.
    * `Flux.subscribe()`는 해당 `Flux`를 subscribe하고 무한대의 요구를 요청할 수 있다.


#### `consume()`

```java
protected void consume() {
    disposable = kafkaManager.consumer(SERVICENAME)
            .subscribe();
}
```

* `kafkaManager.producer()`는 `Flux<ReceiverRecord<String, String>>`를 반환한다.
    * `Flux.subscribe()`는 해당 `Flux`를 subscribe하고 무한대의 요구를 요청할 수 있다.

