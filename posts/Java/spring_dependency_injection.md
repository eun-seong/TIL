---
title: '[Spring] 의존 객체(DI)'
path: 'spring_dependency_injection'
date: '2021-01-22 16:31:14'
template: 'post'
category: 'Java'
---

# DI(Dependency injection)
의존성 주입   
예시) 배터리 일체형 장난감 vs 배터리 분리형 장난감 => 모두 배터리를 의존하지만 더 효율적인건 분리형 장난감     
=> 분리하고 캡슐화하는 것은 OOP에서도 아주 중요하다.

## 의존성이 있는 bean 생성
* `<bean>`에 `id`와 `class`를 작성한다.
* 그 안에 `<constructor-arg>` 태그를 이용하여 해당 클래스의 생성자에 대한 정보를 쓸 수 있다.
    * **`ref`**에는 생성자가 **의존할** 객체를 넣으면 된다(의존 객체 주입)

```xml
<bean id="registerService" class="ems.member.service.StudentRegisterService">
    <constructor-arg ref="studentDao" ></constructor-arg>
</bean>
```

### setter를 이용한 의존 객체 주입
* setter함수의 이름에서 set을 제외하고 첫 글자를 소문자로 변경하여 `property`의 `name`에 전달한다.
    * `setJdbUrl()` 함수 => `jdbUrl`
* 아래 예시는 인수가 `String`인 경우

```xml
<bean id="dataBaseConnectionInfoDev" class="ems.member.DataBaseConnectionInfo">
    <property name="jdbcUrl" value="jdbc:oracle:thin:@localhost:1521:xe" />
    <property name="userId" value="scott" />
    <property name="userPw" value="tiger" />
</bean>
```

### List 타입 의존 객체 주입
* `name`은 setter 함수와 동일하게 작성
* `value` 속성을 사용하지 않고 `property` 태그 안에 `list` 태그 삽입

```xml
<bean id="informationService" class="ems.member.service.EMSInformationService">
    <property name="developers">
        <list>
            <value>Cheney.</value>
            <value>Eloy.</value>
            <value>Jasper.</value>
            <value>Dillon.</value>
            <value>Kian.</value>
        </list>
    </property>
</bean>
```

### Map 타입 객체 주입
* `name`은 setter 함수와 동일하게 작성
* `value` 속성을 사용하지 않고 `property` 태그 안에 `map` 태그 삽입
    - `entry` 태그를 사용하여 데이터를 추가할 수 있다.

```xml
<bean id="informationService" class="ems.member.service.EMSInformationService">
    <property name="administrators">
        <map>
            <entry>
                <key>
                    <value>Cheney</value>
                </key>
                <value>cheney@springPjt.org</value>
            </entry>
            <entry>
                <key>
                    <value>Jasper</value>
                </key>
                <value>jasper@springPjt.org</value>
            </entry>
        </map>
    </property>
    <property name="dbInfos">
        <map>
            <entry>
                <key>
                    <value>dev</value>
                </key>
                <ref bean="dataBaseConnectionInfoDev"/>
            </entry>
        </map>
    </property>
</bean>
```

## 스프링 설정 파일 분리
하나의 xml 파일에 내용이 너무 많아지면, 유지/보수하기 힘들도 가독성도 떨어지는 문제가 발생    
* 스프링 설정 파일을 분리하여 해결할 수 있다.
* `GenericXmlApplicationContext`에 배열 형태로 전달

* 기존 코드   

    ```java
    GenericXmlApplicationContext ctx = 
                    new GenericXmlApplicationContext("classpath:applicationContext.xml");
    ```

* xml 분리 후 코드

    ```java
    String[] appCtxs = {"classpath:appCtx1.xml", "classpath:appCtx2.xml", "classpath:appCtx3.xml"};
    GenericXmlApplicationContext ctx = new GenericXmlApplicationContext(appCtxs);
    ```

## 스프링 설정 파일 import
여러 개의 xml 파일을 import 할 수 있다.
* `<import/>` 태그 사용

```xml
<import resource="classpath:appCtx2.xml"/>
<import resource="classpath:appCtx3.xml"/>
```

배열 형태로 가져오지 않고 하나의 파일로 모두 가져올 수 있다.
```java
GenericXmlApplicationContext ctx = new GenericXmlApplicationContext("classpath:appCtxImport.xml");
```

### baen의 범위
* Singleton
    - 스프링 컨테이너에서 생성된 Bean 객체의 경우 기본적으로 **한 개**만 생성이 된다.
    - `getBean()` 함수가 호출될 경우 모두 동일한 객체가 반환된다.
    - 레퍼런스는 다르지만 같은 메모리 공간을 가리키고 있다.
* Prototype
    - 싱글톤과 다르게 `getBean()` 함수가 호출될 때마다 새로운 객체가 생성되어 반환된다.
    - 스프링 설정 xml 파일에서 `<bean>` 태그에 `scope="prototype"` 속성을 추가하면 된다.


## 의존객체 자동 주입
스프링 설정 파일에 `annotation-config` 태그를 추가해야 한다.
```xml
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:context="http://www.springframework.org/schema/context"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.springframework.org/schema/beans 
 		http://www.springframework.org/schema/beans/spring-beans.xsd 
 		http://www.springframework.org/schema/context 
 		http://www.springframework.org/schema/context/spring-context.xsd">

	<context:annotation-config />
    
    <bean .../>
    ...
</bean>
```


### Autowired Annotation
* 주입하려고 하는 객체의 **타입**이 일치하는 객체를 자동으로 주입한다.   
* `@Autowired` 어노테이션를 사용하여 생성자/함수/프로퍼티 위에 작성한다.
    * 클래스의 메소드나 프로퍼티에 사용할 경우 **디폴트 생성자를 꼭 만들어야 주어야 한다**
*  이 어노테이션이 붙은 생성자는 컨테이너에서 생성될 때 자동으로 해당 객체를 찾는다.

```java
@Autowired
public WordRegisterService(WordDao wordDao) {
    this.wordDao = wordDao;
}
```

### Resource Annotation
* 주입하려고 하는 객체의 **이름**이 일치하는 객체를 자동으로 주입한다.
* `@Resource` 어노테이션을 사용하여 함수/프로퍼티 위에 작성한다.
    * 생성자에는 사용할 수 없고, **디폴트 생성자를 꼭 만들어 주어야 한다.**
* 이 어노테이션이 붙은 생성자는 컨테이너에서 생성될 때 자동으로 해당 객체를 찾는다.

