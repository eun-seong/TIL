---
title: '[ML] 성킴님 딥러닝 강의 01, ML 용어 및 개념'
path: 'SungKim_Lec_01'
date: '2021-03-03 16:03:01'
template: 'post'
category: 'ML'
---

## 머신 러닝이란?
1. Supervised Learning
label이 있는 예제를 가지고 학습을 시킨다(training set)   
고양이/개/컵/모자 등 정해져있는 라벨을 붙인 사진을 주고 학습시키는 것

    * regression : 특정 값을 예측(시험 점수)
    * binary classification : 2가지로 분류 예측(예/아니오)
    * multi-label classification : 여러 개로 분류 예측(A, B, C, D, E 성적 분류)

2. Unsupervised Learning
라벨이 없이 유사한 것들끼리 묶은 것들 등등..

## 실습
**Tensor** 모든 것!

* Ranks : 몇 차원 배열인가
    * 0 : Scalar
    * 1 : Vector
    * 2 : Matrix
    * n : n-Tensor

* Shapes : 랭크에 몇 개씩 들어 있느냐


#### 1
```python
import tensorflow as tf
hello = tf.constant('Hello, world')
sess = tf.Session()
print(sess.run(hello))
```

* `constant` : tensor 변수
* `Session()` : 세션, `run()`으로 실행 가능

#### 2
```python
node1 = tf.constant(3.0, tf.float32)
node2 = tf.constant(4.5) # 생략해도 암묵적으로 float32
node3 = tf.add(node1, node2)

sess = tf.Sesion()
print(sess.run(node3))  # 7.5
```

* `add()` : 더하기 노드

#### 3
```python
a = tf.placeholder(tf.float32)
b = tf.placeholder(tf.float32)
adder_node = a + b # tf.add(a, b)

print(sess.run(adder_node, feed_dict={a:3, b:4.5}))     # 7.5
print(sess.run(adder_node, feed_dict={a:[1, 3], b:[2, 4]}))     # [3. 7.]
```
* `placholder()` : 동적으로 대입할 수 있는 플레이스 홀더

