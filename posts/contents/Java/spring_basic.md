---
title: '[Spring] (1) Spring 개요'
path: 'spring_basic'
date: '2021-01-21 17:50:17'
template: 'post'
category: 'Java'
---

# 스프링 프레임워크
스프링은 **모듈**로 이루어져 있다. 상황에 따라 필요한 모듈만 붙여서 사용하면 된다.
* 주요 기능(방법론적)
    * DI(Dependency Injection)
    * IoC(Inersion of Control)
    * AOP
    * JDBC(Java DataBase Connector)

### 스프링 컨테이너
* Container : 객체를 생성하고 조립
    * Bean : 컨테니어를 통해 생성된 객체

* 컨테이너 역할을 하는 `resources.xml`을 

### Maven Project 생성
* Group id : 전체 큰 프로젝트를 이루는 이름
* Artifact id : 작은 프로젝트(모듈 등)

#### 파일 구조
* src
    * main
        * **java** : 실제로 프로그래밍하는 구현 부분, java 파일 관리
        * **resources** : 자원을 관리하는 폴더, 스프링 설정 파일, 프로퍼티 파일 존재
    * test
* pom.xml : Maven 설정 파일, 라이브러리 연결 및 빌드   
    `<dependencies>`에 필요한 모듈을 `<dependency>`로 추가하면 된다.   

## Spring 프로젝트
* **Maven 프로젝트** 생성
* resources 폴더에 있는 applicationContext.xml로 컨테이너를 만들 수 있다.
    - Class에서 직접 객체를 선언하지 않아도 해당 클래스가 메모리에 로드된다.
        - 로드된 곳 : **Spring Container**
    - beans에 있는 스키마는 거의 동일
    - `<bean/>`에 id는 알아서, class는 `{pakageName.classFullName}`으로 작성

    ```xml {numberLines}
    <?xml version="1.0" encoding="UTF-8"?>

    <beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.springframework.org/schema/beans 
            http://www.springframework.org/schema/beans/spring-beans.xsd">

        <bean id="tWalk" class="lec03Pjt001.TransportationWalk" />
        
    </beans>
    ```

### Spring Container에서 bean 가져오기
* `GenericXmlApplicationContext` 클래스를 이용해 컨테이너를 생성할 수 있다.
    - 이 컨테이너가 객체 생성을 알아서 하기 때문에 갖다 쓰기만 하면 된다.
* 이에 생상된 객체에서 `getBean({id}, {class Name})`을 사용하면 컨테이너에 있는 bean을 가져올 수 있다.

```java {numberLines}
GenericXmlApplicationContext ctx = new GenericXmlApplicationContext("classpath:applicationContext.xml");

TransportationWalk transportationWalk  = ctx.getBean("tWalk", TransportationWalk.class);
transportationWalk.move();

ctx.close();
```
