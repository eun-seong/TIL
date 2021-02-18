---
title: '[Spring] 내가 보려고 만든 CheatSheet'
path: 'my_spring_cheatsheet'
date: '2021-01-26 10:58:17'
template: 'post'
category: 'Java'
---

* web 관련 사용하려면 web 관련 dependency 필수
    * `@Controller`, `@RestController` 등

    ```xml
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    ```

### `map()`
* 단일 스트림의 원소를 매핑시킨 후, 그 값을 다시 스트림으로 변환하는 중간 연산 담당
* 객체에서 원하는 원소를 변경/추출하는 역할

### `flatMap()`
* Array나 Object로 감싸져 있는 모든 원소를 단일 원소 스트림으로 반환
* 