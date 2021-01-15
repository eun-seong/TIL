---
title: 'C++ 문법: 함수 포인터'
path: 'syntex_function_pointer'
date: '2021-01-15 13:41:37'
template: 'post'
category: 'C++'
---

## 함수 포인터란?
포인터는 주소를 저장하는 메모리 공간의 이름입니다. 그렇다면 함수 포인터는 무엇일까요?   
바로 **함수**의 시작 주소를 저장하는 포인터입니다.   

예제를 한 번 볼까요?

```c++ {numberLines}
#include <iostream>
using namespace std;

int print(int n) {
    cout << "파라미터 정수 : " << n <<'\n';
}

int main() {
    void (*pf)(int);
    pf = print;

    print(10);      // 1) 10
    pf(20);         // 2) 20
    (*pf)(30);      // 3) 30
}
```

`pf`는 `print()` 함수의 시작 주소입니다.   
`print()` 함수는 메모리 한 부분에 저장이 되어 있고, `*pf`가 그 메모리의 시작 부분을 가리키는 셈이 되는 거죠!   

2번과 3번은 기능에 있어서 같은 코드라 보아도 무방합니다.   
차이점은 2번은 암시적 역참조, 3번은 명시적 역참조 방법입니다. 암시적 역참조 방법은 일반 함수를 호출하는 것과 동일하게 생겼습니다. 현대 컴파일러는 대부분 이 방법을 지원합니다.

### 함수 포인터 종류
함수 호출에 따라서 함수 포인터의 종류가 결정됩니다.   
하나씩 살펴봅시다.   

1. 정적 함수 호출   
    이제까지 보았던 함수 포인터의 예제는 정적 함수 호출이었습니다.   
    전역 함수 외에도 네임스페이스, 객체의 정적 멤버 함수도 정적 함수에 속합니다.

    ```c++ {numberLines} 
    #include <iostream>
    using namespace std;

    int print(int n) {
        cout << "파라미터 정수 : " << n <<'\n';
    }

    int main() {
        void (*pf)(int);
        pf = print;

        print(10);      // 1) 10
        pf(20);         // 2) 20
        (*pf)(30);      // 3) 30
    }
    ```
2. 객체로 멤버 함수 호출   
    이제까지 만들었던 `Point` 클래스 예제로 살펴보겠습니다.

    ```c++ {numberLines} 
    int main() {
        Point point(2, 3);

        void (Point::*pf)();
        pf = &Point::print;

        point.(*pf)();        // 2, 3

        return 0;
    }
    ```
3. 객체의 주소로 멤버 함수 호출

    ```c++ {numberLines} 
    int main() {
        Point point(2, 3);
        Point *p = &point;

        void (Point::*pf)();
        pf = &Point::print;

        (p->*pf)();         // 2, 3

        return 0;
    }
    ```

### 클라이언트 코드와 서버 코드
기능을 제공해주는 쪽을 서버, 받는 쪽을 클라이언트라고 합니다. 일반적으로 클라이언트가 서버 코드를 호출(Call)하지만, 때때로 서버가 클라이언트 코드를 호출해야 할 때(CallBack)가 있습니다.   

#### CallBack
C++ STL에선 `<algorithm>` 헤더에 `for_each()` 함수가 존재합니다. 이 함수의 예제를 살펴보겠습니다.

```c++ {numberLines} 
#include <algorithm>
using namespace std;

void Print(int n) {
    cout << "정수 : " << n << '\n';
}

int main() {
    int arr[5] = {1, 2, 3, 4, 5};

    for_each(arr, arr+5, Print);
    /*
    정수 : 1
    정수 : 2
    정수 : 3
    정수 : 4
    정수 : 5
    */

    return 0;
}
```

`for_each()`는 배열의 시작과 끝 주소를 받아 세 번째 인자인 함수 포인터에 값을 전달해주는 것입니다.
`algorithm` 헤더가 서버이고, `Print()` 함수가 클라이언트라고 하면, 서버 코드는 단순히 함수 포인터에 인자를 전달해주는 역할을 하게 됩니다. 모든 기능의 결정은 클라이언트가 하게 되죠.   
