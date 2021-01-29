---
title: '[C++] STL 기본'
path: 'c++_stl_basic'
date: '2021-01-29 18:54:45'
template: 'post'
category: 'C++'
---

## STL이란
Standard Template Library   

|name|desc|
|---|---|
|container|객체를 저장하는 객체|
|iterator|컨테이너의 원소를 가리키는 포인터와 비슷한 것|
|algorithm|정렬, 삭제, 검색, 연산 등의 함수 템플릿|
|function object|함수처럼 동작하는 `operator()` 연산자 오버로딩한 객체|
|adaptor|기존의 인터페이스를 변경한 새로운 인터페이스를 갖는 구성 요소|
|allocator|컨테이너의 메모리 할당 정책을 캡슐화한 클래스 객체|

### Container
|name|order type|data type|
|---|---|---|
|vector|시퀀스|배열|
|deque|시퀀스|배열|
|list|시퀀스|노드|
|set|연관|노드|
|multiset|연관|노드|
|map|연관|노드|
|multimap|연관|노드|

* 시퀀스 : 컨테이너가 자신만의 삽입 순서를 가지고 있음
* 연관 : 삽입 순서와 관계 없이 특정 정렬 기준에 따라 자동 정렬됨
* 배열 : 데이터 여러 개가 하나의 메모리 단위에 저장
* 노드 : 데이터 하나를 하나의 메모리 단위에 저장

### iterator
* 포인터와 비슷하게 동작
* 컨테이너와 알고리즘을 묶어주는 인터페이스 역할
* `begin()`은 컨테이너의 맨 처음 원소를 가리킴
* `end()`는 컨테이너의 맨 마지막 원소 다음을 가리킴
* `++`, `!=`, `==` 연산 가능

* 종류
    * 입력 반복자
    * 출력 반복자
    * 순방향 반복자
    * 양방향 반복자 : `++`, `--` 가능한 반복자
        * list, set, multiset, map, multimap
    * 임의 접근 반복자
        * vector, deque

### algorithm : `<algorithm>` 헤더에 정의
* `find(iterator start, iterator end, T value)`
    * [`start`, `end`) 범위에서 `value` 값을 찾는다
    * 값이 없으면 `end` iterator 반환
    * 값이 있으면 그에 해당하는 iterator 반환

* `max_element(iterator start, iterator end)`, `min_element(iterator start, iterator end)`
    * [`start`, `end`) 범위에서 최대/최소값을 찾는다

* `sort(iterator start, iterator end)`
    * [`start`, `end`) 범위에서 정렬한다.
    * 기본적으로 오름차순 정렬
    * algorithm의 `greater<T>`를 사용하면 된다.

        ```c++
        sort(v.begin(), v.end(), greater<int>);
        ```

    * 사용자 정의 객체에서도 사용 가능하다.

        ```c++
        #include <iostream>
        #include <algorithm>
        #include <vector>
        using namespace std;

        class myClass {
        public:
            myClass(char* name, int age, int height) {
                this->name = name;
                this->age = age;
                this->height = height;
            }
        private:
            char[20] name;
            int age;
            int height;
        }

        bool compare(myClass a, myClass b) {
            if(a.age == b.age) {
                // 키가 작은 사람 순서
                return a.height < b.height;
            }
            // 나이가 많은 사람 순서
            return a.age > b.age;
        }

        int main() {
            vector<myClass> people;

            myClass person1("eun", 24, 168);
            myClass person2("hong", 18, 178);
            myClass person3("kim", 24, 173);

            people.push(person1);
            people.push(person2);
            people.push(person3);

            sort(people.begin(), people.end(), compare);
            // eun > kim > hong
        }
        ```

* `lower_bound(iterator start, iterator end, value)`
    * [`start`, `end`) 범위에서 value 값보다 크거나 같은 값들 중 가장 작은 값을 찾음
* `upper_bound(iterator start, iterator end, value)`
    * [`start`, `end`) 범위에서 value 값보다 작거나 같은 값들 중 가장 큰 값을 찾음

### Functio object
`sort()` 함수 3번째 인자 함수 객체, 함수, 함수 포인터 등을 객체로 받아 알고리즘의 유연함을 더해준다.

### adapter
#### conatiner adapter
* stack
* queue
* priority_queue


#### iterator adapter
* reverse_iterator : iterator와 다르게 역방향으로 진행되는 반복자
* back_insert_iterator
* front_insert_iterator
* insert_iterator

#### function adapter
* binder
* not2 : 함수 객체를 반대로 변환하는 어댑터
* ...


### allocator
`new` `delete` 처럼 객체를 메모리에 할당할 수 있다. 사용자 정의도 가능 

<details style='color: #fff'>
<summary>문제</summary>
1. 컨테이너 이터레이터 알고리즘
2. 시퀀스 연관
3. 임의 접근 양방향 시퀀스
4. ABCD AB CD
5. 4 5 6
6. `begin()`, `end()` `*`
7. adaptor, container adaptor, iterator adaptor, function adaptor
</details>