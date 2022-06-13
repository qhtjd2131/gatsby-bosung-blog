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

# Jest + TypeScript + babel + Testing Library 시작하기

[Jest 시작하기 공식문서](https://jestjs.io/docs/getting-started#generate-a-basic-configuration-file) 를 바탕으로 Jest 환경을 구축해보자.

**Jest 설치하기**

```javascript
npm install --save-dev jest
```
<br>

**Babel 관련 모듈 설치하기**

이미 babel이 설치되어 있다면 `babel-jest`만 설치하면 된다.
```javascript
npm install --save-dev babel-jest @babel/core @babel/preset-env @babel/preset-react
```

다음은 `.ts`,`.tsx` 파일을 트랜스파일 해주는 babel plugin이다. 이 또한 Jest가 직접적으로 의존하는 모듈이 아니다. TypeScript를 사용하지 않는다면 설치할 필요는 없다.

```javascript
npm install --save-dev @babel/preset-typescript
```
<br>

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
<br>

**typeChecking 기능 관련 모듈 설치하기**

일반적으로 test 파일은 타입검사 기능을 수행하지 않는다. 하지만 원한다면, [ts-jest](https://github.com/kulshekhar/ts-jest) 모듈로 TypeChecking 기능을 수행할 수 있다.

```javascript
npm install --save-dev ts-jest
```

<br>

**Jest 관련 Type 정의 모듈 설치하기**

test 파일에서 사용되는 jest 관련 Type이 정의되어 있다. 필요하다면 다운하자.
```javascript
npm install --save-dev @types/jest
```

<br>

**react-test-renderer 설치하기**
스냅샷 테스트를 도와주는 `react-test-renderer` 도 공식문서에서 가이드하고 있다.

```javascript
npm install --save-dev react-test-renderer
```

<br>

**jest-environment-jsdom 설치하기**

Jest의 테스트 환경 중 하나인 jsdom을 다운로드 해야한다.
```javascript
npm install --save-dev jest-environment-jsdom
```

<br>

**Jest's configuration 정의하기**

TypeScript 환경에서의 Jest 설치는 다 끝났다. [Jest 공식문서](https://jestjs.io/docs/getting-started#generate-a-basic-configuration-file)에서는 시작 가이드에 configguration을 포함하고 있지 않다. 하지만 React 에서 진행되는 Test 는 Node환경이 아닌 브라우저 환경에서도 Test 할 수 있어야 한다. 따라서 `package.json` 안에 `jest:{}` 필드를 삽입하거나, `jest.config.js`를 만들어서 테스트 환경을 `Node`로 할것인지 `jsdom`으로 할것인지 정의해야한다.

참고 : [jest configuration](https://jestjs.io/docs/configuration#testenvironment-string)

해당 예제는 `package.json` 내에서 `jest`의 설정을 정의한다.

```javascript
//package.json
{
  ...
  "devDependencies": {
    ...
  },
  "dependencies": {
    ...
  },
  "jest" : {                    // 이 부분
    "testEnvironment": "jsdom"  // Default : "node"
  }                             //
}

```
<br>

**jest를 실행하기 위해 script 추가하기**

Jest를 간단하게 실행하기 위해 `package.json`의 `scripts`필드에 정의해준다.

```javascript
//package.json
{
  ...
  "scripts": {        //
    "test": "jest"    // 이부분
  },                  //
  "devDependencies": {
    ...
  },
  "dependencies": {
    ...
  },
  "jest" : {                    
    ...
  }                            
}
```

<br>

**@testing-library/react 설치하기**

참고 : [Testing Library 공식문서](https://testing-library.com/docs/react-testing-library/intro/)
<br>

```javscript
npm install --save-dev @testing-library/react
```


<br>


---

# 테스트 진행해보기

**Render Teset**
```javascript
//Page3.tsx
import React from "react";

const Page3 = () => {
  return (
    <div>hello</div>
  );
};

export default Page3;

```

```javascript
//Page3.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"  //toBeInTheDocument() 를 사용하기 위해서 필요합니다!
import Page3 from "./Page3";

describe("<Page3 />", () => {
  it("page 3 render", () => {
    render(<Page3 />);
  });

  it("hello text render", () =>{
    render(<Page3 />);
    expect(screen.getByText("hello")).toBeInTheDocument();
  })
});
```
입력 :
```
npm test -- Page3.test.tsx
```

결과 :
```
 PASS  src/pages/Page3.test.tsx
  <Page3 />
    √ page 3 render (15 ms)
    √ hello text render (12 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        1.536 s
Ran all test suites matching /Page3.test.tsx/i.
```

성공적으로 테스트를 하였습니다. 이제 어떤 기준을 가지고 어떻게 테스트를 할지는 개발자의 몫입니다!

---

# 요약

설치 : 

```javascript
npm install --save-dev jest babel-jest @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript ts-jest @types/jest react-test-renderer jest-environment-jsdom
 @testing-library/react @testing-library/jest-dom
```

<br>
설정 :

```javascript
//package.json
{
  ...
  "scripts": {        //
    "test": "jest"    // 이부분 추가
  },                  //
  "devDependencies": {
    ...
  },
  "dependencies": {
    ...
  },
  "jest" : {                    // 이 부분 추가
    "testEnvironment": "jsdom"  // Default : "node"
  }                             //
}
```
