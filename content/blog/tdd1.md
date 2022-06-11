---
title: "React TDD 를 위한 셋팅"
date: "2022-06-11T22:00:00"
description: "React TDD 를 위한 셋팅"
tag : "jest"
---

# React TDD & unit Test를 위한 셋팅

---

# TDD 란?
테스트 코드를 먼저 작성하고 그 테스트를 통과하기 위한 코드를 짜는 일종의 개발 방법론이다.

# Unit Test(단위 테스트) 란?
단위 테스트(Unit Test)는 하나의 모듈을 기준으로 독립적으로 진행되는 가장 작은 단위의 테스트이다. 여기서 모듈은 애플리케이션에서 작동하는 하나의 기능 또는 메소드로 이해할 수 있다.

# Integration Test(통합 테스트) 란?
통합 테스트는 단위 테스트보다 더 큰 동작을 달성하기 위해 여러 모듈들을 모아 이들이 의도대로 협력하는지 확인하는 테스트이다.

---
# 어떤 테스트 도구를 사용할까?

일반적으로 테스트를 진행 할 때, 테스트러너 + 테스트도구모음 조합을 하게된다. 테스트 러너는 테스트를 직접 실행해주는 주체이고, 테스트 도구 모음은 그 테스트를 위한 도구를 제공한다. 
- `Jest`, `Mocha` : 테스트 러너
- `@testing-library/react`, `Enzyme` : 테스트 도구 모음

**참고**
>[React 공식문서]()에서는 `Jest + React Testing Library`를 이용하여 Testing을 진행하는 방안을 소개하고 있다. 또한 CRA(Create-React-App)에도 `Jest + React Testing Library`가 설치되어 있다. <br>

<br>
<br>

활발한 포럼과 검색, 트러블 슈팅을 위해 가장 유명한 두가지 프레임워크를 비교해보자.

**Jest**
- React를 위해 설계 됨.
- 단순함에 초점을 둔다.
- 독립적으로 사용 가능.

**Mocha**
- NodeJS를 위해 설계 됨.
- 많은 프로세스를 유연하게 테스트 하는것에 초점을 둔다.
- 다른 라이브러리가 필요하다.

위의 프레임워크는 모두 각자만의 장점이 있고, 명확한 방향성이 보인다. 타당한 이유만 있다면 어느 프레임워크를 선택해도 문제없을 것이다.

Test를 처음 접하는 나에게 적합한 프레임워크는 **Jest**로 보인다.

<br>
<br>

**아래는 Jest를 선택해야 하는 몇 가지 포인트다.**

- Jest는 쉬운 설치로 즉시 사용할 수 있는 통합 프레임워크를 제공한다.

- 문서화가 잘 되어 있어 특히 TDD(Test Driven Development) 접근 방식을 처음 접하는 개발자들에게는 쉽게 배울 수 있다.

- Jest는 프로세스에서 병렬 테스트를 수행하여 분리된 테스트를 실행하는 빠른 성능 테스트 자동화 프레임워크이다.

- Jest는 비동기 코드에 대한 테스트 지원을 제공한다.

- Jest 프레임워크는 snapshot test 를 지원한다. ReactJS를 사용하는 개발 중에 이 기능은 UI 버그를 감지하는 데 유용하다.(스냅샷을 비교하는 방식)

---

# 어떤 유틸 라이브러리(도구 모음)을 사용할까?

활발한 포럼과 검색, 트러블 슈팅을 위해 가장 유명한 두가지 라이브러리를 비교해보자.

**React Testing Library**
- "어떻게 보여지는가?" 사용자 관점에서의 테스트 도구 제공
- Integration Test(통합 테스트)에 적합하다.
- 얕은 랜더링을 위해선 `react-test-renderer` 또는 `jest`의 도움을 받아야 한다.

**Enzyme**
- "어떻게 구현되어 졌는가?" 사용자는 물론 개발자 관점에서의 테스트 도구 까지 제공
- UnitTest(단위 테스트) 에 적합하다.
- 얕은 랜더링(자식을 포함하지 않음), 깊은 랜더링(모든 자식 포함)을 지원한다.

참고 : [stackoverflow : What is difference between jest and enzyme](https://stackoverflow.com/questions/42616576/what-is-the-difference-between-jest-and-enzyme)

참고 : [betterprogramming enzyme vs react-testing-library in react ](https://betterprogramming.pub/react-enzyme-vs-react-testing-library-2cac3ad20c52)

기능적으로 보았을 때는 `Enzyme` 라이브러리가 우세하다고 보여진다. 하지만 TDD를 처음 접한 나에게는 문서화가 잘되어있고, 가벼운 것이 큰 장점으로 다가온다. 그래서 **React Testing Library**를 택했다.

**React Testing Library**는 유지, 관리 되고 있는 문서화가 잘 되어 있으며, React 공식문서에서도 소개하고 있다. 지금은 학습 목적으로 **React Testing Library**를 채택했지만, unit 단위 테스트를 진행 할 때에는 `Enzyme` 라이브러리를 채택하여 사용 할 것이다.

---

# 요약

나는 `Jest`+`React Testing Library` 를 선택했다. 그 이유는 아래와 같다.
- React를 사용.
- 학습목적.
- TDD 초심자.
- 프로젝트의 크기가 작다.

하지만 프로젝트의 크기가 크고, unit Test를 하기 위한 목적이라면, `Mocha`+`Enzyme` 또는 `Jest`+`Enzyme`를 추천한다!


----

