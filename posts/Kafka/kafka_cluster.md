---
title: 'Kafka cluster 구성'
path: 'kafka_cluster'
date: '2021-01-29 17:39:25'
template: 'post'
category: 'Kafka'
---

## zookeeper
분산 시스템에 사용되는 코디네이션 서비스 시스템이다. 분산 시스템의 문제는 시스템간의 정보를 어떻게 공유하고, 클러스터에 있는 서버들의 상태를 어떻게 체크하며, 분산된 서버들 간에 동기화를 위한 lock을 처리하는 것 등이 있다.

이 문제를 해결하는 대표적인 시스템이 zookeeper이다.

주키퍼를 먼저 띄운 후 카프카를 띄운다.