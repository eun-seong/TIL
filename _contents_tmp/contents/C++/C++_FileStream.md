# [C++] 파일 입출력 fstream, ifstream, ofstream

`fstream` : 입출력 모두 가능한 객체   
`ifstream` : input의 i, 읽기만 가능한 객체(입력)   
`ofstream` : output의 o, 쓰기만 가능한 객체(출력)   

g : get으로 읽기용   
p : put으로 쓰기용


#### `open(char* fileName, flag)`
* `fileName` : 절대경로 or 파일이름만
* `flag`   
    |option|desc|
    |---|---|
    |`ios::app`|append, 파일이 이미 존재하면 그 내용은 보존되고, 파일의 끝에서 쓰여짐<br/>파일이 존재하지 않으면 파일을 생성|
    |`ios::ate`|파일이 이미 존재하면 파일의 끝에서 쓰여짐|
    |`ios::trunc`|파일이 있으면 해당 파일의 모든 데이터를 지우고 입출력|
    |`ios::binary`|이진형태로 입출력|
    |`ios::in`|읽기 전용, 파일이 존재하지 않더라도 새로 생성하지 않고 함수 fail|
    |`ios::out`|쓰기 전용, 파일이 존재하면 내용을 지움|

#### `read(char* buffer, int byte)` & `write(char* buffer, int byte)`
binary 파일을 쓰고 읽을 때 사용

* `buffer` : 쓰고 읽을 버퍼
* `byte` : 쓰고 읽을 사이즈

#### `seekg(int bytes, flag)` & `seekp(int bytes, flag)`
**seek포인터가 있는 곳에서 출력하면** 내용이 추가되는 것이 아닌, **대체**된다.

* `bytes` : 입출력할 바이트수
* `flag`
    |option|desc|
    |---|---|
    |`ios::beg`|첫 번째 바이트에서 숫자만큼 이동|
    |`ios::cur`|현재 점에서 바이트수만큼 이동|
    |`ios::end`|끝 바이트에서 숫자만큼 앞으로 이동, 음수이면 뒤로 이동<br/> `seekg(-1, ios::end)`는 마지막 문자를 의미|


#### `tellg()` & `tellp()`
현재 seek포인터 위치를 return

#### `peek()`
seek포인터를 이동하지 않고 현재 글자를 return

#### `get()`
seek포인터를 이동하고 현재 글자를 return   
binary 파일 읽을 때 사용

#### `put()`
seek포인터를 이동하고 해당 위치에 글자 쓰기
binary 파일 쓸 때 사용
