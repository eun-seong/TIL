---
title: '[Gradle] Spring, Java 프로젝트 nohup 실행'
path: 'java_gradle_nohup_excution'
date: '2021-02-05 23:09:55'
template: 'post'
category: 'Java'
---

서버에서 스프링 프로젝트를 주말동안 켜놓을 일이 생겼다.   
예전에 파이썬 매크로를 돌릴 때는 ec2에서 tmux를 사용해서 돌려놨지만, 지금은 회사 서버라 설치를 마음대로 할 수 없는 상황이다.

그렇게 구글링을 하던 중 nohup이라는 것을 사용하면 되고 마침 서버에 nohup이 설치되어 있어서 실행을 했다.

### nohup으로 spring 프로젝트 실행하기

1. 자신의 프로젝트 디렉토리로 이동

```
$ cd sampleProject
```

2. 스프링 프로젝트 빌드

```
$ ./gradlew build
```

그냥 실행을 하려면 아래처럼 하면 된다.

```
$ ./gradlew run
``` 

3. nohup 실행

```
$ nohup java -jar {jar 파일 이름} > Output.log 2>&1 &
```

구글링을 했을 때 `$ nohup ./gradlew run`을 하면 된다고 해서 했더니 계속 안되어서 jar 파일을 실행하는 방법으로 변경했다.

하나씩 설명하자면,

* `java -jar {jar 파일 이름}` : jar 파일을 실행
* `> Output.log` : 로그를 이 파일에 출력
* `2>&1` : 표준 에러(2)를 표준출력(1)으로 보냄, 에러를 파일에 작성하라는 뜻
* `&` : 백그라운드 실행

정도이다.

이렇게 실행을 하고 나면 터미널 창을 종료하더라도 프로세스가 죽지 않게 된다.

직접 사용한 예시를 하나 들자면

```
$ nohup java -jar build/libs/producer-0.0.1-SNAPSHOT.jar > Output.log 2>&1 &
```


### nohup 프로세스 종료

종료할 때는 실행시킨 프로세스의 PID를 알아야 한다.

```
$ ps -ef | grep {jar 파일 이름}
```

실행한 jar 파일의 이름으로 찾으면 나온다. {} 빼고 명령어 치는거다!!

```
$ kill -15 PID  # 정상 종료
$ kill -9 PID   # 강제 종료
```

