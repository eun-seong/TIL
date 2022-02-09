* 컴포넌트 : 데이터를 표시하는 것에만 집중
* 서비스 : 데이터를 처리하는 로직

# 개념

## AppModule

* `@Component` : 컴포넌트 클래스에 지정해야 하는 메타데이터
* `@NgModule` : 애플리케이션 동작에 필요한 메타 데이터



## Topics

### 문자열 바인딩(interpolation binding)

```tsx
<h1>{{title}}</h1>
```

이중 중괄호(`{{}}`)를 사용하여 컴포넌트의 `title` 프로퍼티 값을 HTML 헤더 태그에 표시할 수 있다.

### 컴포넌트 생성하기

```
$ ng generate component heroes
```

### Angular 컴포넌트 클래스의 메타데이터

1. `selector` - 컴포넌트의 css 엘리먼트 셀렉터
2. `templateUrl` - 컴포넌트 템플릿 파일의 위치
3. `styleUrls` - 컴포넌트 css 스타일 파일의 위치

### `ngOnInit`

라이프싸이클 후킹 함수 중 하나

컴포넌트 생성 직후 호출 된다.
컴포넌트 초기화하는 로직을 작성하는 게 보통

### 양방향 바인딩

```tsx
[(ngModel)]="property"
```

양방향 바인딩 문법
Angular에서 제공하는 디렉티브

### 클래스 바인딩

```tsx
[class.className]="condition"
```

`condition`의 `true`/`false` 여부에 따라 해당 클래스의 적용 여부가 결정된다.

### 프로퍼티 바인딩

```tsx
[hero]="selectedHero"
```

자식 클래스에게 프로퍼티를 전달할 때 사용된다.





## Angular Pipe(파이프)

문자열 바인딩 뒤에 파이프 연산자(|)로 문자열의 형식을 변경할 수 있다.

* `UppercasePipe` : 대문자로 변경





## Angular 디렉티브

| derective | desc                                                      |
| --------- | --------------------------------------------------------- |
| `*ngFor`  | 목록에 있는 항목마다 호스트 엘리먼트를 반복               |
| `*ngIf`   | 해당 값이 `undefined`일 경우 해당 엘리먼트를 DOM에서 제거 |





# 이해

## 의존성 주입(DI)

클래스가 의존성 객체를 외부에 요청하고 외부에서 이 객체의 인스턴스를 생성해서 주입하는 디자인 패턴

* 의존성 객체(dependencies) : 클래스가 동작하기 위해 필요한 서비스나 객체

## 컴포넌트

데이터를 표시하는 클래스

```shell
$ # component-name 컴포넌트를 app/component-name 디렉토리에 생성
$ ng generate component component-name
```



## 서비스

서비스를 표시하는 클래스

```shell
$ # service-name 서비스를 app에 생성
$ ng generate service service-name
```

* 왜 서비스를 사용하나?

  * 컴포넌트와 관심사를 분리할 수 있다.
    컴포넌트는 데이터를 표시하는 것에만 집중, 서비스는 해당 데이터를 처리하는 데에만 집중

    이로 인해 컴포넌트는 데이터를 가져오는 곳이 변경돼도 신경쓰지 않아도 된다.

  * 여러 클래스에 사용되는 정보를 공유할 수 있다.

### `@Injectable()` service

* 해당 클래스가 의존성 주입 시스템에 포함되는 클래스라고 선언하는 구문
* 해당 클래스가 의존성으로 주입될 수도 있고, 주입받을 수 있다.

### provider

**서비스를 생성하고 전달하는 방식을 정의한 것**
컴포넌트에 서비스를 의존성으로 주입하려면 해당 서비스의 프로바이더가 Angular 의존성 주입 시스템(Injector)에 등록되어야 한다.

```ts
@Injectable({
  providedIn: 'root'	// 최상위 injector
})
```

* 서비스가 최상위 인젝터에 등록되면 앵큘러는 해당 서비스의 인스턴스를 **하나만 생성**한다.
* 그리고 해당 클래스가 주입되는 **모든 곳에서 같은 인스턴스를 공유**한다.

### 컴포넌트에 주입하기

```ts
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  constructor(public messageService: MessageService) { }
  
  ...
}

```

컴포넌트의 생성자에 서비스를 매개변수로 주면 컴포넌트에 서비스를 주입할 수 있다.

보통은 `private`으로 하지만,
**서비스의 프로퍼티가 템플릿에 바인딩될 경우 반드시 `public`으로 선언해야 한다.**









