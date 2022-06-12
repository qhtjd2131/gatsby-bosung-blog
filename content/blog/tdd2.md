---
title: "Jest + React Testing Library 시작하기"
date: "2022-06-11 invalid date"
description: "Jest + React Testing Library 시작하기"
tag: "jest"
---

# Jest + React Testing Library 시작하기

실행환경
- React(without CRA) : `"^18.1.0"`
- TypeScript : `"^4.6.4"`
- Webpack : `"^5.72.1"`
- Babel : `"^7.17.10"`
- Styled-Component : `"^5.3.5"`

---

# Jest 와 @testing-library/react

## Jest 란?

[Jest 공식 홈페이지](https://jestjs.io/) 에서는 Jest를 다음과 같이 소개하고 있다.

> Jest is a delightful JavaScript Testing Framework with a focus on simplicity.<br>
> Jest 는 단순함에 초점을 맞춘 자바스크립트 테스트 프레임워크이다.

Jest는 React 뿐만 아니라 `Babel`, `TypeScript`, `Vue`,`Node` 등 다양한 곳에서 사용 할 수 있는 테스트 러너이다. 즉 직접적으로 테스트를 실행 해주는 역할을 한다.



## @testing-library/react 란?

React는 JSX 문법이 사용된 Component라는 개념이 있다. 일반 javascript 가 아니기 때문에, 테스트 러너에서 쉽게 동작하기 위해서 필요한 라이브러리가 이것이다.

테스트에 직접 관여하는 것이 아니고, 테스트를 하기 위한 도구를 제공한다. 더 자세한 사항은 [Testing Library 공식문서](https://testing-library.com/docs/react-testing-library/intro/)를 확인해보자.

**설치하기**

```javascript
npm install --save-dev @testing-library/react
```

## 추가적으로..

**react-test-renderer**

React 공식 홈페이지에서는 테스팅 도구로 `react-test-renderer` 를 추천하고 있다. `ref`에 의존하는 컴포넌트를 테스트하는데에 유용하다.

[react-test-renderer](https://ko.reactjs.org/docs/test-renderer.html#testrenderer-instance) 는 DOM 혹은 네이티브 모바일 환경의 제약 없이, React 컴포넌트를 순수한 JavaScript 객체로 렌더링하는데 사용할 수 있는 React 렌더러를 제공한다.

기본적으로, 이 패키지를 사용하면 브라우저나 jsdom 없이 React DOM 또는 React Native 컴포넌트에 의해 렌더링된 플랫폼 뷰 계층의 스냅샷을 쉽게 찍을 수 있도록 도와준다.

**@testing-library/jest-dom**

[@testing-library/jest-dom](https://testing-library.com/docs/ecosystem-jest-dom/)는 Jest에 대한 커스텀 DOM 요소 매칭을 제공하는 테스트 라이브러리를 위한 라이브러리이다. `toHaveStyle()`,`toBeInTheDocument()` 등과 같은 함수를 제공한다.

---

# Jest 시작하기

[Jest 시작하기 공식문서](https://jestjs.io/docs/getting-started#generate-a-basic-configuration-file) 를 바탕으로 Jest 환경을 구축해보자.

**Jest 설치하기**

```javascript
npm install --save-dev jest
```

**Babel 관련 모듈 설치하기**
이미 babel이 설치되어 있다면 `babel-jest`만 설치하면 된다.
```javascript
npm install --save-dev babel-jest @babel/core @babel/preset-env @babel/preset-react
```

다음은 `.ts`,`.tsx` 파일을 트랜스파일 해주는 babel plugin이다.
```javascript
npm install --save-dev @babel/preset-typescript
```

**babel.config.js 파일 생성하고 작성하기**
```javascript
//babel.config.js
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
};
```

**typeChecking 기능 관련 모듈 설치하기**
일반적으로 test 파일은 타입검사 기능을 수행하지 않는다. 하지만 원한다면, [ts-jest](https://github.com/kulshekhar/ts-jest) 모듈로 TypeChecking 기능을 수행할 수 있다.
```javascript
npm install --save-dev ts-jest
```

**Jest 관련 Type 정의 모듈 설치하기**
test 파일에서 사용되는 jest 관련 Type이 정의되어 있다. 필요하다면 다운하자.
```javascript
npm install --save-dev @types/jest
```

**Jest's configuration 정의하기**



---

#  @testing-library/react 시작하기

[Testing Library 공식문서](https://testing-library.com/docs/react-testing-library/intro/) 로 시작해보자.
<br>

**@testing-library/react 설치하기**
```javscript
npm install --save-dev @testing-library/react
```

todo list
1. package.json 보고 필요한 라이브러리 정리해서 포스트쓰기, 하나씩 지워가면서 test 해보기(꼭 필요한지 확인하려고)