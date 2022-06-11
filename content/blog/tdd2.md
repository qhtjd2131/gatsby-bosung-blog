---
title: "Jest + React Testing Library 시작하기"
date: "2022-06-11 invalid date"
description: "Jest + React Testing Library 시작하기"
tag : "jest"
---


# Jest + React Testing Library 시작하기

---


# jest 시작하기

[Jest 시작하기 공식문서](https://jestjs.io/docs/getting-started#generate-a-basic-configuration-file) 를 바탕으로 jest 실행환경을 구축해보자.



---

# jest + @testing-library/react

TDD(테스트 기반 개발 방법론)을 적용하기 위해 `jest`와 `@testing-library/react`가 필요하다. 

`jest`와 `@testing-library/react` 는 무엇이고 어떤 관계일까?


## jest 란?
[Jest 공식 홈페이지](https://jestjs.io/) 에서는 Jest를 다음과 같이 소개하고 있다.
>Jest is a delightful JavaScript Testing Framework with a focus on simplicity.<br>
Jest 는 단순함에 초점을 맞춘 자바스크립트 테스트 프레임워크이다.

Jest는 React 뿐만 아니라 `Babel`, `TypeScript`, `Vue`,`Node` 등 다양한 곳에서 사용 할 수 있는 테스트 러너이다. 즉 직접적으로 테스트를 실행 해주는 역할을 한다.

**설치하기**
```javascript
npm install --save-dev jest
```


## @testing-library/react 란?
React는 JSX 문법이 사용된 Component라는 개념이 있다. 일반 javascript 가 아니기 때문에, 테스트 러너에서 쉽게 동작하기 위해서 필요한 라이브러리가 이것이다.

테스트에 직접 관여하는 것이 아니고, 테스트를 하기 위한 도구를 제공한다. 더 자세한 사항은 [Testing Library 공식문서](https://testing-library.com/docs/react-testing-library/intro/)를 확인해보자.

**설치하기**
```javascript
npm install --save-dev @testing-library/react
```

## 추가(필수 X)

**react-test-renderer**

React 공식 홈페이지에서는 테스팅 도구로 `react-test-renderer` 를 추천하고 있다. `ref`에 의존하는 컴포넌트를 테스트하는데에 유용하다.

[react-test-renderer](https://ko.reactjs.org/docs/test-renderer.html#testrenderer-instance) 는 DOM 혹은 네이티브 모바일 환경의 제약 없이, React 컴포넌트를 순수한 JavaScript 객체로 렌더링하는데 사용할 수 있는 React 렌더러를 제공한다.

기본적으로, 이 패키지를 사용하면 브라우저나 jsdom 없이 React DOM 또는 React Native 컴포넌트에 의해 렌더링된 플랫폼 뷰 계층의 스냅샷을 쉽게 찍을 수 있도록 도와준다.

**@testing-library/jest-dom**

[@testing-library/jest-dom](https://testing-library.com/docs/ecosystem-jest-dom/)는 Jest에 대한 커스텀 DOM 요소 매칭을 제공하는 테스트 라이브러리를 위한 라이브러리이다. `toHaveStyle()`,`toBeInTheDocument()` 등과 같은 함수를 제공한다. 

**







---