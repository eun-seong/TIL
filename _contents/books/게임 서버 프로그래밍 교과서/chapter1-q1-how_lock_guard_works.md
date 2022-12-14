# `lock_guard`는 어떻게 동작하는 걸까?

## `lock_guard`를 사용하는 이유
`lock_guard`는 c++에서 `mutex`의 사용을 조금 더 용이하게 만들어준다.
mutex를 사용하려면 `lock()`과 `unlock()`를 쌍으로 사용해야 한다. 
`lock()`를 할 경우 무조건 `unlock()`를 해주어야 하며, 그렇지 않을 경우 데드 락에 빠질 수 있다. 
`lock_guard`를 사용하면 `unlock()`를 해주지 않아도 자동으로 뮤텍스를 unlock해준다.
이게 어떻게 가능할까?

### 데드락(dead lock)이란?
두 스레드가 있는데, 서로가 상대방이 작업을 끝내기를 기다리고 있을 경우 발생한다.
예를 들어, X라는 공유 변수가 있고 A, B 스레드 모두 X를 사용해야 하는 상황을 생각해보자.


## `lock_guard`란?
`mutex` header에 존재한다.

[공식 문서](https://en.cppreference.com/w/cpp/thread/lock_guard)를 보면
>이 클래스는 뮤텍스 래퍼이다. 이것은 scope block에서 뮤텍스를 소유하기 위해 RAII 스타일의 작동 방식을 제공한다.
>`lock_gaurd` 객체가 생성되면, 이 객체는 주어진 뮤텍스에 대해 소유권을 가져오려고 시도한다. 이 객체가 생성되었던 scope가 제어권을 잃으면, 이 객체는 소멸되면서 뮤텍스를 해제한다.
>`lock_gaurd` 클래스는 복사할 수 없다.

...이게 무슨 말일까?
대충 이해한 바로는 lock_guard를 사용하면 block scope(`{ ... }`)에 해당하는 기간동안, `lock_guard` 객체가 뮤텍스의 소유권을 가지게 되고,
block scope가 끝났을 때 `lock_guard`의 소멸자를 통해 뮤텍스를 해제함으로써
뮤텍스의 사용을 안전하게 해준다는 것 같다.

이러한 작동 방식이 RAII인가보다.


## RAII 란?
[RAII](https://en.cppreference.com/w/cpp/language/raii)는 *Resource Acquisition Is Initialization* 의 약자이다. 이 말을 직역해보면 "리소스 획득은 초기화"이다. C++ 프로그래밍 기술에서 사용되는 하나의 패턴이다.

이 기술은
어떤 변수 혹은 객체를 사용하기 전에 획득해야 하는 리소스의 life cycle를 RAII를 통해 생성한 객체의 lifetime에 바인딩한다. 여기서 리소스는 할당된 힙 메모리, 스레드, 소켓, 파일, 뮤텍스, 디스크, 데이터 베이스 등 유한한 자원의 모든 것을 말한다.

RAII는 RAII 객체에 접근하는 모든 함수에게 리소스가 사용 가능하도록 보장한다. 그리고 이 RAII 객체의 수명이 끝나면(이 객체가 선언된 block scope가 종료되면), RAII 객체가 가져갔던 모든 리소스 획득의 역순으로 리소스가 해제된다.
만약 리소스 획득이 실패한다면(생성자가 exception으로 종료되었다거나), 이전까지 얻었던 모든 리소스를 역순으로 해제한다.

GC가 없는 c++에선 개발자가 메모리 관리를 모두 직접 해주어야 하는데, 이 패턴을 사용하면 메모리 leak이나 exception 안전을 보장할 수 있다.

이 패턴을 적용한 **RAII 래퍼**를 제공해주는 라이브러리는
* `std::unique_ptr`
* `std::shared_ptr`
* `std::lock_guard`
* `std::unique_lock`
* `std::shared_lock`
가 있다.

이 패턴을 이용하여 자체적으로 리소스를 관리하는 클래스는
* `std::string`
* `std::vector`
* `std::jthread`
가 있다.



## 예시1) RAII Wrapper
그렇다면 `lock_guard`를 사용하는 예시를 보자.

```c++
#include <mutex>

std::mutex m;
 
void bad() 
{
    m.lock(); // mutex lock
    f(); // 이 함수에서 Exception이 있다면, mutex는 영영 해제할 수 없음..
    if(!everything_ok()) return;// early return되었다면, mutex는 영영 해제할 수 없음..
    m.unlock(); // 여기까지 도달해야만 mutex 해제 가능
}
 
void good()
{
    std::lock_guard<std::mutex> lk(m); // RAII class
    f();  // 이 함수에서  Exception이 일어나면 lk가 mutex를 해제해줄 것임
    if(!everything_ok()) return; // early return이 있어도 lk가 mutex를 해제해줄 것임
}
```

## 예시2) RAII 패턴을 이용한 Custom Class
RAII 패턴을 이용하여 직접 클래스를 구현할 수도 있다.

```c++
class myClass {
public:
	char* c = nullptr;

	myClass(size_t len) { c = new char[len]; }

	~myClass() { delete c; }
};
```

`myClass`를 통해서 문자열을 할당하면, 사용 도중 에러가 발생하더라도 소멸자를 통해 메모리를 해제해줄 수 있다.



