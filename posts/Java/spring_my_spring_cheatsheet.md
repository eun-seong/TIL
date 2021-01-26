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