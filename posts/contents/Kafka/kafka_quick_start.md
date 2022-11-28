---
title: 'Kafka 기본 개념 및 Quick Start'
path: 'kafka_quick_start'
date: '2021-01-19 18:37:11'
template: 'post'
category: 'Kafka'
---

## Kafka가 어디에 쓴느 물건인가
이름은 Apache Kafka   
LinkedIn에서 **분산 메시징 시스템**으로써 오픈소스로 공개했다.   
대용량의 실시간 로그처리에 특화되었다.   


### 용어 정리
#### topic
producer가 생성하고 consumer가 소비하는 메세지

#### partition
* `topic` 안에서 여러 개의 partition으로 나누어져 있다.   
* 메세지를 쓰고 읽을 때 분산 처리하여 빠르게 수행 가능하다.   
* consumer group 당 하나의 consumer**만** 접근이 허용된다.
* log : `partition`의 한 칸을 뜻한다.

#### broker
* topic 기준으로 메세지를 관리한다.
* producer에게 받은 메시지를 topic 별로 분류하여 쌓아 놓는다.

#### producer
* 메세지를 생성하고 topic에 메세지를 broker에게 전달한다.   
* producer는 consumer의 존재를 모른다.

#### consumer
* topic을 구독하여 broker에게서 해당 토픽에 있는 메세지를 소비한다.
* 해당 topic 내에 각 파티션에 존재하는 offset의 위치를 통해서 이전에 소비했던 offset의 위치를 기억하고 관리한다.
* producer가 consumer에게 메시지를 push하는 방식이 아닌, **consumer가 producer로부터 pull하는 방식**
* 

#### consumer group
* consumer들의 묶음
* 반드시 해당 topic의 파티션은 그 consumer group과 1:n 매칭을 해야 한다.
* 그룹을 생성할 때 동일한 이름의 그룹이 있는지 체크해 봐야 한다.
* 존재하는 이유?
    1. 그룹 내 컨슈머 하나가 장애가 발생하더라도 멈추지 않고 작업을 이어갈 수 있다.
    2. group 별로 자신만의 offset을 관리하기 때문에, 동일한 토픽을 여러 consumer group이 consume하더라도 데이터의 손실 없이 가져갈 수 있다.

* topic의 partition >= consumer group의 consumer 이어야 한다.
    * partition < consumer 의 경우 : 놀고 있는 consumer가 발생하여 비효율적이다.

#### replication
* partition을 복제하여 클러스터에 분산시킬 수 있다.
* replication factor N으로 설정할 경우 N개의 replica가 생성된다.
* replica에는 1개의 leader와 N-1개의 follower로 구성된다.
* partition에 대한 읽기와 쓰기는 모두 leader에서 이루어진다.
    * follower들은 단순히 leader를 복제한다.
* 만약 leader에 장애가 발생할 경우 follwer 중 하나가 새로운 leader가 된다.



# Kafka Quick Start
#### STEP 1: kafka 설치
[Download](https://www.apache.org/dyn/closer.cgi?path=/kafka/2.7.0/kafka_2.13-2.7.0.tgz)에서 다운로드한다.
```shell
$ tar -zxf kafka_2.13-2.7.0.tgz
$ cd kafka_2.13-2.7.0
```

#### STEP 2: kafka 환경 시작하기
1. terminal(1) zookeeper 서비스를 시작한다.
    ```shell
    $ bin/zookeeper-server-start.sh config/zookeeper.properties
    ```
2. terminal(2) kafka broker 서비스를 시작한다.
    ```shell
    $ bin/kafka-server-start.sh config/server.properties
    ```
모두 성공하였다면 기본 Kafka 환경이 실행되고 있고 사용할 준비가 된 것이다.

#### STEP 3: 이벤트를 저장할 topic 생성하기
이벤트는 records, messages 라고도 불린다.   
Kafka는 event streaming platform이기 때문에 다양한 기종에서 이벤트를 읽기, 쓰기, 저장하기, 프로세싱이 가능하다.
이벤트들은 토픽에 저장된다. 아주 간단하게 말하자면 토픽은 파일 시스템의 폴더와 유사하고, 이벤트는 폴터 안의 파일이다.   
이벤트를 쓰기 전에, 토픽을 생성해야 한다.
1. terminal(3) 토픽 생성
    ```shell
    $ bin/kafka-topics.sh --create --topic quickstart-events --bootstrap-server localhost:9092
    ```

* Kafka의 커맨드 라인 툴은 모두 추가 옵션을 가지고 있다. 예를 들어 새로운 토픽의 디테일을 보여주는 밑 예제
    ```shell
    $ bin/kafka-topics.sh --describe --topic quickstart-events --bootstrap-server localhost:9092
    ```

#### STEP 4: 토픽에 이벤트 쓰기
Kafka 클라이언트는 이벤트를 쓰거나 읽기 위해 네트워크를 통해서 borker와 소통한다.   
이벤트를 한 번 받으면 borker는 내구성이 좋은 방식으로 이벤트를 저장한다.
1. console(3) producer 생성하기
    ```shell
    $ bin/kafka-console-producer.sh --topic quickstart-events --bootstrap-server localhost:9092
    > Hello world
    ```

#### STEP 5: 이벤트 읽기
1. console(4) consumer 생성하기
    ```shell
    $ bin/kafka-console-consumer.sh --topic quickstart-events --from-beginnig --bootstrap-server localhost:9092
    Hello world
    ```
#### SETP 6: kafka 커넥트로 데이터를 이벤트 스트림으로 import/export 하기

#### STEP 7: kafka streams로 이벤트 처리하기
데이터를 kafka의 이벤트로 저장을 하게 되면, Java/Scala로 kafka streams 클라이언트 라이브러리로 데이터를 처리할 수 있다. 라이브러리는 정확히 한 번, 상태 저장 작업 및 집계, 윈도우 설정, 조인, 이벤트 시간에 따른 처리 등을 지원한다.
* [Kafka streams: mission critical real-time application과 마이크로 서비스를 작성하기 가장 쉬운 방법](https://kafka.apache.org/25/documentation/streams/)
* [Kafka 데모 앱 만들기](https://eun-seong.github.io/TIL/posts/Kafka/kafka_streams_write_app_tutorial)

#### STEP 8: kafka 종료하기
1. producer, consumer 종료
2. kafka broker 종료
3. zookeeper 서버 종료

* kafka 환경의 이벤트를 포함한 모든 데이터를 지우고 싶을 때
    ```shell
    $ rm -rf /tmp/kafka-logs /tmp/zookeeper
    ```


* * *

* [Kafka Consumer Group](https://www.popit.kr/kafka-consumer-group/)
* [Kafka DOCS](https://kafka.apache.org/quickstart#quickstart_kafkastreams)