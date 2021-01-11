---
title: 'Real-Time Operating System'
path: 'test1'
date: '2021-01-10 23:49:10'
---

* H/W 자원을 얼마나 공평하게 분배할 것인지가 중요한 다른 OS에 비해, H/W 자원을 좀 낭비하더라도 작업의 시간 제한을 맞추는데 초점을 둠
* RTOS의 요구 사항
    - 예측 가능하고 일정한 응답 시간 지원
    - 우선 순위 기반 스케줄링 지원
    - deadline 기반 스케줄링 지원
  
### RTOS 몇 가지 개념
* forground   
interrupt 레벨, ISR을 통해 비동기적 이벤트 처리
* background   
task 레벨, loop 형태로 구성
* multitasking   
여러 기능 동시에 수행
* resource   
process나 task가 사용하는 모든 요소
* shared resource   
data corruption 방지를 위해 exclusive access 해야함
* non-preemption kernel   
ISR이 비동기 이벤트를 처리한 후, 다시 그 task로 돌아옴
* preemption kernel   
최상위 우선순위 task로 cpu 제어권이 넘어감   
ISR이 종료될 때 다시 task 스케줄링이 이루어짐
* cyclic executive   
multitasking RTOS의 가장 간단한 형태   
like 동그라미 시간표    
장점 : 간단한 구현, 적은 오버헤드, OS의 동작 예측 쉬움   
단점 : 정해진 작업 외 다른 작업 추가 어려움(정적), no preemption, 스케줄링 수작업

### 기능
1) task management   
priority, scheduling policy, ....
2) synchronization   
semaphore, mailbox, queue, event flag
3) memory management   
dynamic memory allocation, memory locking

* * *
## Task scheduling
**우선 순위가 높은 task를 찾아야 한다!**   
0 ~ 63 까지 우선 순위가 존재   
0 : 가장 높은 우선 순위    
63: 가장 낮은 우선 순위    
### Ready List 관리
ready 상태에 있는 task의 리스트    
<img src='imgs/2020-10-27-19-38-06.png' width='700px'/>

1. `OSRdyGrp`   
    * task의 우선순위에 의해 그룹화
    * 한 그룹 당 8개의 우선순위(Task ID)를 가짐
    * OSRdyGrp 내의 각 비트는 해당 그룹의 ready 여부 표시
    ```c++
    OSRdyGrp <- OSMapTbl[prio>>3]
    ```
2. `OSRdyTbl[]`
    * `OSRdyTbl[i]` 내의 각 비트는 `i`그룹의 ready task를 가리킴
    ```c++
    OSRdyTbl[prio>>3] <- OSMapTbl[prio & 0x07]
    ```
3. `OSMapTbl[]`   
    <img src='imgs/2020-10-27-19-42-49.png' width='200px'/>    
    * bit mask
    * 각 인덱스에 맞게 bit를 masking 해줌
4. `OSUnMapTbl[]`   
    * LSB 기준 최초 1인 비트 번호를 표시
    * 가장 높은 우선 순위(가장 낮은 수)를 찾기 위해 LSB 사용
    * 가장 낮은 우선 순위를 찾으려면 MSB 사용

### Task insertion
```c++
OSRdyGrp |= OSMapTbl[prio>>3];
OSRdyTbl[prio >> 3] |= OSMapTbl[prop & 0x07];
```
### Task deletion
```c++
// Task 그룹 내에 다른 대기 중인 task가 남아 있는지 체크해서
if( ( OSRdyTbl[prio >> 3] &= ~OSMapTbl[prio & 0x07] ) == 0 )
    // 없을 경우 해당 OSRdyGrp bit도 0으로 초기화
    OSRdyGrp &= ~OSMapTbl[prio>>3];
```
### Searching the highest priority
```c++
y = OSUnMapTbl[OSRdyGrp];
x = OSUnMapTbl[OSRdyTbl[y]];
prio = (y << 3) + x;
```
* * *
### RTOS interrupt 관련 몇 가지 개념
1. latency   
문맥저장 전에 걸린 최대 시간   
interrupt 들어온 시점 ~ CPU context store 시작 전까지
2. response   
interrupt latency + 문맥 저장 시간 + 커널 ISR 실행 시간   
interrupt 들어온 시점 ~ 커널 ISR 실행 직전
3. recovery
우선 순위가 높은 task를 준비할 지 결정하는 시간 + 문맥 저장 시간 + interrupt로부터 리턴 실행 시간   
커널 ISR 실행 종료 ~ CPU context restore 끝날 때까지 시간
#### 예시
1. Foreground/Background   
    * CPU restore 후 background로 리턴
2. Non-preemptive kernel   
    * CPU restore 후 원래 task로 리턴
3. Preemptive kernel   
    * ISR Entrant/Exit function 으로 reponse와 recovery 시간이 다른 커널보다 오래걸릴 수 있음
