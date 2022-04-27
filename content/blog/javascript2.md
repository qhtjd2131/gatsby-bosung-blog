---
title: "자바스크립트 런타임 동작원리"
date: "2022-02-01T18:18:00"
description: "javascript 런타임 동작 원리"
tag : "javascript"
---


## javascript 런타임 동작 원리

바로 직전 포스트에서 javascript v8엔진이 나의 소스코드를 어떤 과정을 통해 해석하는지 알아봤다. 이제는 나의 소스코드가 런타임에서 어떻게 실행되는지를 알아보자.

영상 참고 : https://www.youtube.com/watch?v=8aGhZQkoFbQ

본 영상을 시청한 후 포스트를 읽는것이 도움이 될것이다.


<image src="https://user-images.githubusercontent.com/34260967/153304055-5c21c3b0-2d22-422a-aa44-e4b02a8851f2.png" width="600px">

javascript 동작원리를 간단하게 그린 그림이다.


### javascript가 가지는 특성

우선 런타임 동작을 생각하기 전에 javascript가 무엇인가를 알아야 햔다. 영상에서는 javascript의 특징을 이렇게 말한다.

- single thread
    >javascript 는 싱글 스레드 기반이다.
- non-blocking
    >javascript는 느린 동작(blocking)을 기다려주지 않는다.
- asynchronou(비동기)
    >non-blocking을 위해서 비동기로 처리한다.
- concurrent (동시성)
    >동시에 처리한다.(동시에 처리된것처럼 보이게 한다)
    >javascript 는 싱글스레이드 이기 때문에 엄밀히 말하면 동시에 처리되는것이 아니다.

javascript는 이러한 특징을 가진다. 이는 곧 javascript가 런타임에서 실행되는 구조에 대한 설명이 되기도 한다. 

### Javascript 엔진(V8)

차근차근 그림을 자세히 보자. Javascript를 해석하는 V8 엔진은 Heap과 Stack을 가진다.

- Heap 
    메모리 할당을 위한 공간
    <br>
- Stack : Call Stack
    Call Stack이라고 불리며, javascript가 단일 스레드 기반이기 때문에 Call Stack도 1개이다.


### Web APIs

우리가 흔히 쓰는 setTimeout, DOM, Ajax 는 V8엔진 어디에도 없다. 그 이유는 웹브라우저에서 제공하는 API 이기 때문이다. 

보통 이러한 API 는 비동기로 동작하며, blocking 문제를 해결하기 동시성을 가지게 해준다.


### Callback Queue / Event Loop

// 업로드 예정입니다.


