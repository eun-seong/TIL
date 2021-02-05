---
title: '[Spring] 테스트 코드 작성하기'
path: 'spring_writing_test_code'
date: '2021-02-05 16:45:58'
template: 'post'
category: 'Java'
---

* `main`에 있는 패키지와 동일하게 `test`에 패키지를 생성한다.
* 보통 java에서 테스트 클래스의 이름은 `메인 클래스의 이름 + test`로 작성한다.
* 클래스 안의 함수마다 테스트를 할 수 있다.
    * 테스트를 할 함수에는 `@Test` 어노테이션 작성
    * `main` 함수를 작성하는 것처럼 작성하면 된다.
    * `org.assertj.core.api.Assertions` 패키지의 `assertThat`을 요즘 많이 사용한다고 한다.
  
        ```java
        assertThat(실제값).isEqualTo(기대하는값);
        ```

* 테스트 코드는 빌드될 때 포함되지 않는다.
* 그래서 영어권 사람들과 협업하지 않으면 테스트 함수를 한글로 작성하는 경우도 많다고 한다.
* 테스트는 독립적으로 실행되어야 한다.


```java
class MemberServiceTest {
    @Test
    void 회원가입() {
        // given
        Member member = new Member();
        member.setName("deveun");

        // when
        Long saveId = memberService.join(member);

        // then
        Member findMember = memberService.findOne(saveId).get();
        Assertions.assertThat(member.getName()).isEqualTo(findMember.getName());
    }
}
```

* given : 이러한 상황이 주어졌을 때
* when : 이걸 실행하면
* then : 이런 결과가 나와야 한다

### 예외 상황에 대한 테스트

* 테스트 케이스는 정상 플로우도 중요하지만 **예외 플로우**를 처리하는 것도 중요하다.
* `org.assertj.core.api.Assertions` 패키지의 `assertThrows`을 사용한다.

    ```java
    assertThrows(예외클래스.class, 람다 함수);
    ```

    * `람다 함수`에 해당하는 로직이 실행되면 `예외클래스`의 예외가 발생해야 한다.
    * 이 함수의 반환값이 실제로 예외가 발생했을 떄 반환되는 값이다.
    * 반환값을 다시 `assertThat` 함수를 이용하여 확인할 수 있다.


```java
@Test
public void 중복_회원_예약() {
    // given
    Member member1 = new Member();
    member1.setName("hello");

    Member member2 = new Member();
    member2.setName("hello");

    // when
    memberService.join(member);
    IllegalStateException e = assertThrows(IllegalStateException.class, () -> memberService.join(member2));
    
    assertThat(e.getMessage()).isEqualTo("이미 존재하는 회원입니다");
}
```


### 각 테스트 함수가 시작되기 전
* 각 함수가 시작하기 전마다 실행되어야 하는 코드를 작성할 수 있다.
* `@BeforeEach` 어노테이션을 붙인 함수를 사용한다.

```java
@BeforeEach
public void beforeEach() {
    // 각 함수가 시작되기 전에 해야 하는 일
    // 가령, 필드 할당 및 초기화
}
```


### 각 테스트 함수가 완료된 후
* 각 함수가 끝날 떄마다 실행되어야 하는 코드를 작성할 수 있다.
* `@AfterEach` 어노테이션을 붙인 함수를 사용한다.

```java
@AfterEach
public void afterEach() {
    // 각 함수가 끝나고 해야 하는 일
    // 가령, repository 초기화(clear)
}
```


# SpringBoot Test
* `@SpringBootTest` 어노테이션 사용
* `@Transactional` 어노테이션 사용

