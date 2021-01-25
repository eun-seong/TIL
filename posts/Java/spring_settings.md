---
title: '[Spring] (3)생명주기 및 설정 파일'
path: 'spring_lifeCycle_and_Settings'
date: '2021-01-24 15:51:32'
template: 'post'
category: 'Java'
---

# 생명주기(Life Cycle)
1. `GenericXmlApplicationContext` 객체를 `new`로 생성할 때 컨테이너가 생성된다.
    - Spring Container와 Bean 객체가 생성되는 시점은 동일하다.
2. `getBean()` 를 이용하여 Bean 객체를 이용
3. `close()`를 이용하여 컨테이너와 빈 소멸

### 빈 객체
* `afterPropertiesSet()`
    * Bean 객체 생성 시점에 호출된다.
    * `InitializingBean` 인터페이스에서 제공한다.
    * 사용하려면 이 인터페이스를 구현하면 된다.
    * 보통 DB 연결 시에 많이 사용된다.
* `destroy()`
    * Bean 객체 소멸 시점에 호출된다.
    * `DisposableBean` 인터페이스에서 제공한다.

# Java 파일로 스프링 설정 파일 생성하기
* `@Configuration` 어노테이션을 사용하여 클래스를 설정 파일로 생성할 수 있다.
* `@Bean` 어노테이션을 사용하여 빈 객체인 것을 표시해준다.
* `property` 태그는 `setter`를 이용한다.
* `list` 태그는 `ArrayList<>`를 이용한다.
* `map` 태그는 


```xml
<!-->xml 설정 파일<-->
<baen id="studentDat" class="ems.member.dao.StudentDao"/>

<bean id="dataBaseConnectionInfoDev" class="ems.member.DataBaseConnectionInfo">
    <property name="jdbcUrl" value="jdbc:oracle:thin:@localhost:1521:xe" />
    <property name="userId" value="scott" />
    <property name="userPw" value="tiger" />
</bean>

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
</bean>
```

```java
// xml과 동일한 java 설정 파일
@Configuration
public class MemberConfig {
    @Bean
    public StudentDao studentDao() {
        return new StudentDat();
    }

    @Bean
    public DataBaseConnectionInfoDev dataBaseConnectoinInfoDev() {
        DataBaseConnectionInfoDev infoDev = new DataBaseConnectionInfoDev();
        infoDev.setJdbcUrl("jdbc:oracle:thin:@localhost:1521:xe");
        infoDev.setUserId("scott");
        infoDev.setUserPw("tiger");

        return infoDev;
    }

    @Bean
    public InformationService informationService() {
        InformationService info = new InformationService();

        ArrayList<String> developers = new ArrayList<String>();
        developers.add("Cheney.");
        developers.add("Eloy.");
        developers.add("Jasper.");
        developers.add("Dillon.");
        developers.add("Kian.");

        info.setDevelopers(developers);

        Map<String, String> administrators = new HashMap<String, String>();
        adnubustrators.put("Cheney", "cheney@springPjt.org");
        adnubustrators.put("Jaspter", "jasper@springPjt.org");

        info.setAdministrators(administrators);
    }
}
```

## 스프링 설정 파일 가져오기
* `AnnotationConfigApplicationContext(ClassName.class)`를 이용하여 가져올 수 있다.

```java
public static void main(String[] arg) {
    AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext(MemberConfig.class);
}
```

## 설정 파일 나누기

```java
public static void main(String[] arg) {
    AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext(MemberConfig1.class, MemberConfig2.class, MemberConfig3.class);
}
```

* 한 설정 파일에서 다른 설정 파일에 있는 빈을 사용해야 한다면 해당 파일에 `@Autowired`로 필요한 객체를 생성해주면 된다.


### 설정 파일 import
* `@Import()` 어노테이션을 사용하여 해당 설정 파일을 import 할 수 있다.

```java
// 설정 파일
@Configuration
@Import({MemberConfig2.class, MemberConfig3.class})
public class Memberfig1 {
    ...
}
```

```java
// main 클래스
public static void main(String[] arg) {
    AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext(MemberConfig1.class);
}
```

