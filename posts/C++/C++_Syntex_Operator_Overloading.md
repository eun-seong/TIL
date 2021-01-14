---
title: 'C++ 문법: 연산자 오버로딩'
path: 'syntex_operator_overloading'
date: '2021-01-14 17:27:09'
template: 'post'
category: 'C++'
---

# 연산자 오버로딩
#### 연산자 오버로딩이란?
C++에서 제공하는 기본 타입이 아닌 **클래스 타입**에도 연산자를 사용할 수 있게 하는 문법입니다.

예를 들어 아래와 같이 기본 타입에 대해서는 덧셈 연산이 가능하지만,
```c++
int a1 = 1;
int a2 = 2;

cout << a1 + a2;
```

아래와 같이 사용자 정의 타입인 클래스에 대해서는 연산이 불가능합니다.
```C++
#include <iostream>
using namespace std;

// 2차원 평면에 한 점을 나타내는 클래스 Point
// 앞으로 계속해서 이 클래스를 사용합니다.
Class Point {
    Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    int x;
    int y;
};

int main() {
    Piont point1(1, 2);
    Point point2(3, 4);

    cout << point1 + point2;     // 에러 발생!
}
```

이를 **연산자 오버로딩** 을 통하여 해결할 수 있습니다.   


#### 연산자 오버로딩을 왜 사용해야 되죠?
연산자 오버로딩을 사용하면 코드의 직관성과 가독성을 좋게할 수 있습니다.
연산자 오버로딩을 사용하지 않으면, 위 `Point` 클래스의 `point1 + point2`의 연산을 어떻게 할 수 있을까요?
```c++
int main() {
    Piont point1(1, 2);
    Point point2(3, 4);

    cout << point1.x + point2.x << ", " << point1.y + point2.y;
    // 4, 6
}
```

어떠신가요?   
이 클래스가 좌표 평면의 점을 나타내는 것임을 알고 있기 때문에 그렇게 읽지 힘들지는 않지만, 클래스가 거대해지고 코드가 길어지면 가독성이 떨어지고 사용하기 불편할 것입니다. 연산을 할 때마다 저 긴 코드를 항상 써야 하죠.

### 연산자 오버로딩 정의하고 사용하기
연산자 오버로딩을 하면 클래스 타입의 객체에 연산자를 사용하면 **컴파일러는 정의된 함수를 호출**합니다.   
방법은 2가지가 있습니다.   
1. 멤버 함수를 이용
2. 전역 함수를 이용

먼저 멤버함수를 이용하는 방법으로 연산자 오버로딩을 정의해보겠습니다.

기본적으로 연산자는
```c++
object.operator+(object2)
```
처럼 생겼습니다.

Point 연산을 할 경우 컴파일러는 2번째 코드처럼 인식합니다.
```C++
// 같은 코드
p1 + p2;
p1.operator+(p2);
```

우리는 클래스에 이 연산자를 정의해주면 됩니다.
```c++
// 2차원 평면에 한 점을 나타내는 클래스 Point
Class Point {
public:
    Point(int x, int y) {
        this.x = x;
        this.y = y;
    }
    void print() {
        cout<< this.x << ", " << this.y <<'\n';
    }
    /***** 연산자 오버로딩 *****/
    const void operator+(const Point pointArg) const{
        Point tmpPoint;
        tmpPoint.x = this.x + pointArg.x;
        tmpPoint.y = this.y + pointArg.y;
        
        return tmpPoint;
    }

private:
    int x;
    int y;
};

int main() {
    Piont point1(1, 2);
    Point point2(3, 4);
    Point point3;

    point3 = point1 + point2;   // 정상 작동
    point3.print();             // 4, 6
    point3 = point1.operator+(point2);
    point3.print();             // 4, 6
}
```

#### 주의할 점 `const`
연산자 오버로딩할 때 리턴 타입, 매개 변수, 내부 함수에 있어서 `const` 키워드를 붙여야 합니다.    
각각은 리턴할 객체가, 매개 변수가 불변하다는 것을, 내부 함수에서 클래스 내부의 어떠한 변수도 수정하지 않겠다는 것을 보장해줍니다.

### 단항 연산자 오버로딩
위에서 본 예제는 이항 연산자 였습니다. 매개 변수가 앞 뒤로 있었죠?
```c++
p1.operator(p2);
```

단항 연산자는 항이 하나인 연산자입니다.    

|operator|종류|
|---|---|
|`++` `--`|증감 연산자|
|`+` `-`|부호 연산자|
|`!`|논리 연산자|
|`~`|비트 연산자|
|`*` `&`|타입 연산자|

그럼 `++` 연산자를 예제로 오버로딩 해봅시다.

2개의 증감 연산자에는 후위 연산자와 전위 연산자가 존재합니다.   
**후위 연산자**는 증가하기 전 값을 리턴한 후 그 변수를 1 증가시키며, `a++` 처럼 작성합니다.   
**전위 연산자**는 변수를 먼저 증가시킨 후 그 값을 리턴해주며, `a--` 처럼 작성합니다.    
각각 컴파일러와 약속된 함수는 `operator++(int)`와 `operator++()` 입니다.   

```c++
class Point {
public:
    Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    void print() {
        cout<< this.x << ", " << this.y <<'\n';
    }

    /***** 연산자 오버로딩 *****/
    const void operator+(const Point pointArg) const{
        Point tmpPoint;
        tmpPoint.x = this.x + pointArg.x;
        tmpPoint.y = this.y + pointArg.y;
        
        return tmpPoint;
    }

    const Point& operator++(int) {  // 후위 ++
        Point pt(x, y);
        ++this.x;
        ++this.y;

        return pt;
    }

    const Point& operator() {       // 전위 ++
        ++this.x;
        ++this.y;

        return *this;
    }

private:
    int x;
    int y;
};

int main() {
    Piont point1(1, 2), point2(1, 2);
    Point result1, result2;

    result1 = ++point1;
    point1.print();         // 2, 3
    result1.print();        // 2, 3

    result2 = point2++;
    point2.print();         // 2, 3
    result2.print();        // 1, 2
}
```

`--` 연산자도 같은 방식으로 오버로딩합니다. 직접 한 번 해보세요!   

### 이항 연산자 오버로딩
이항 연산자는 피연산자가 2개인 연산자를 뜻합니다.

|operator|종류|
|---|---|
|`+` `-` `*` `/`|산술 연산자|
|`==` `!=` `<` `>=`|비교 연산자|
|`=` `+=` 등 |대입 연산자, 복합대입 연산자|
|`&&` `||`|논리 연산자|
|`&` `|` `^`|비트 연산자|
|`<<` `>>`|shift 연산자|

피연산자의 예제로 더하기 연산자인 `operator+`를 이미 살펴보았습니다.   
모든 이항 연산자는 이와 같이 오버로딩할 수 있습니다.

다른 예제로 `==`와 `!=` 연산자를 살펴보겠습니다.

```c++
class Point {
public:
    // ...생략
    bool operator==(const Point& arg) const {
        return this.x == arg.x && this.y == arg.y ? true : false;
    }
    bool operator!=(const Point& arg) const {
        return !(*this == arg);     // 위에 정의한 operator== 이용
    }

private:
    int x;
    int y;
};

int main() {
    Piont point1(1, 2), point2(2, 3), point3(1, 2);

    if(p1 != p2) cout << "p1 is not equal to p2\n";     // 실행
    if(p1 != p3) cout << "p1 is not equal to p3\n";
}
```

### 전역 함수를 이용한 연산자 오버로딩
일반적으로는 멤버 함수를 이용하여 연산자 오버로딩을 사용하지만, 이렇게 하지 못하는 상황에선 전역 함수를 이용하여 연산자를 오버로딩합니다. 멤버 함수를 이용하지 못하는 경우는 이항 연산의 왼쪽 피연산자가 오버로딩 객체가 아닌 경우입니다.   
예를 들어 `point1 + point2`가 아닌, `k + point2`이 경우입니다. `k`는 `Point` 클래스의 인스턴스가 아니기 때문에 연산자 오버로딩을 할 수 없습니다.

이 경우엔 `p1.operator+(p2)` 함수가 아닌 `operator+(p1, p2)`을 호출해야 합니다.   

이번 예제는 `-` 연산자 오버로딩을 **전역 함수**로 호출해보겠습니다.

```c++
class Point {
public:
    Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    void print() {
        cout<< this.x << ", " << this.y <<'\n';
    }

    friend const Point operator-(const Point&, const Point&);

private:
    int x;
    int y;
};

/***** 전역 함수 연산자 오버로딩 *****/
const Point operator-(const Point& argL, const Point& argR) {
    Point tmp(argL.x - argR.x, argL.y - argR.y);

    return tmp;
}

int main() {
    Piont point1(1, 2), point2(2, 5);
    Point point3;

    point3 = point1 - point2;
    point3.print();                 // -1, -3
}
```

`Point` 클래스에 연산자 오버로딩 함수를 `friend` 키워드로 선언해주는 이유는 전역 함수의 경우 클래스 내부의 멤버 변수에 접근할 수 없기 때문입니다.   
`friend`를 사용하고 싶지 않다면, 클래스 내부에 `getter` 함수를 생성하여 접근할 수 있습니다.


## STL에 필요한 주요 연산자 오버로딩
### 함수 호출 연산자 오버로딩 : () 연산자  
함수 호출 연산자 오버로딩은 **객체를 함수처럼 동작**하게 하는 연산자입니다.   
`Print(10)`이라는 호출 문장은 다음 세 가지로 해석될 수 있습니다.

1. 함수 호출
    ```c++
    void Print(int a) {
        cout << a <<'\n';
    }

    int main() {
        Print(10);
    }
    ```
2. 함수 포인터
    ```c++
    void Print(int a) {
        cout << a <<'\n';
    }

    int main() {
        void (*Print2)(int) = Print;
        Print2(10);
    }
    ```
3. 함수 객체
    ```c++
    class FuncObject {
        public:
        void operator()(int arg) const {
            cout << arg <<'\n';
        }
    }

    int main() {
        FuncObject PrintObject;
        PrintObject(10);
    }
    ```
