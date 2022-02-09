---
title: "자바스크립트 파일 변환 과정"
date: "2022-02-08T16:18:00"
description: "JS 파일의 소스코드는 어떻게 해석되어지나?"
tag : "javascript"
---


# javascript 엔진(V8) 동작 원리

이 포스트는 크롬 브라우저, node.js 에서 사용하는 javascript 엔진인 V8이 javascript 파일을 어떻게 변환하고 실행하는지에 대한 간략한 내용을 담는다. 

## javascript code의 변환 과정(V8)
<br>


>**참고**
>원문 : https://itnext.io/ast-for-javascript-developers-3e79aeb08343 
>번역문 : https://gyujincho.github.io/2018-06-19/AST-for-JS-devlopers


일반적으로 개발자는 `.js` 파일을 작성하고 컴파일러의 도움으로 실행된다.

그렇다면 javascript plain 파일을 컴파일러가 어떻게 해석할까?

우선 나의 `.js` 파일의 소스코드를 AST (Abstract Syntax Tree) 로 변경해주는 과정이 필요하다.

AST는 "추상 구문 트리" 라고 불리며, javascript 소스코드를 추상적인 트리형태로 표현한 구조를 말한다. 불필요한 구문이나 중복되는 괄호 등 을 모두 제거하여 표현하기 때문에 추상적이라고 말한다.

이렇게 코드는 파싱 후 변환되어서 AST 형태로 존재하게 되고, Ignition 이라는 컴파일러를 통해 ByteCode로 변환되어 동작한다.


---

### AST 생성 과정

`.js`파일의 소스코드는 아래의 두 과정을 거쳐서 AST로 변환된다.

#### 1. Scanner : Lexical analyzer
'Scanner' 라고 불리는 'Lexical analyzer' 를 통해서 plain code 는 정의 된 규칙을 사용하여 문자 스트림(코드)을 읽고 이를 토큰으로 결합한다. 공백 문자, 주석 등도 제거한다. 결국 전체 코드 문자열이 토큰 목록으로 분할된다.

![image](https://user-images.githubusercontent.com/34260967/152948054-b5b1d572-2fbe-47e8-811f-830d81428b0e.png)


>Scanner는 소스 코드를 읽을 때 코드를 문자 단위로 하나하나 스캔하며 공백, 연산자 기호 또는 특수 기호를 발견하면 단어가 완성되었다고 봅니다.

#### 2. Parser : Syntax analyzer


'Parser' 라고 불리는 'Syntax analyzer'는 Scanner의 동작 후 만들어진 플랫한 토큰 목록을 가져 와서 언어 구문을 검증하고 (구문 오류가 있다면 에러를 표시하는) 트리 구조로 변환된다.

일부 파서는 트리를 생성하면서 불필요한 토큰(예: 중복 괄호)을 생략하여 'AST(Abstract Syntax Tree)'를 만든다.

![image](https://user-images.githubusercontent.com/34260967/152948773-e6dc5daf-37a9-4bde-8b9c-d594d6894002.png)

---

### Ignition

'Scanner`와 'Paser'이 JS파일 소스코드를 AST로 변환햇다. 이때 'Ignition'이라고 불리는 인터프리터가 AST를 참고하여 ByteCode로 변경한다.

해당 ByteCode는 바로 동작 가능하지만, 최적화는 되지 않았다. 자주 사용하는 native code 나, 중복 사용 가능한 code를 염두하지 않았기 때문이다. 이는 'TurboFan' 이라는 컴파일러로 최적화 할 수 있다.


---

### 요약

1. JS 파일 소스코드를 Scanner를 통해 1차변환.
2. Parser를 통해 2차 변환 후 결과물로 AST 생성
3. Ignition 을 사용하여 AST를 ByteCode로 변환
4. TurboFan 을 통해 ByteCode 최적화

