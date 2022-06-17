---
title: "Jest에서 왜 babel이 필요한가?"
date: "2022-06-16T22:00:00"
description: "Jest에서 왜 babel이 필요한가?"
tag: "jest"
---

# Jest에서 왜 babel이 필요한가?

---

# babel 이란?

javascript는 다양한 버전이 존재하고 각 버전마다 문법과 기능이 다르다. 그렇기 때문에 상위버전에서 쓰여진 파일(es6)는 하위버전(es5) 컴파일러가 읽을 수 없게된다. 

이 때, 필요한 것이 **babel**이다. **babel**은 es6구문을 es5로 트랜스파일 해주는 역할을 한다.

**babel**에 대한 설명은 이 블로그의 다른 포스트에 이미 기재되어있다.

[CRA 없이 React App 만들기 : babel 이란?](https://gatsbybosungblogmain.gatsbyjs.io/WITHOUT_CRA/)

<br>

## babel이 필요한 이유

기본적으로 jest는 테스트파일을 es5 구문으로 해석한다. jest는 React에 종속된 라이브러리가 아니기 때문에, React가 쓰는 es6 구문에 맞출 필요가 없다. 따라서 우리는 es6구문으로 작성된 test파일을 트랜스파일해야 테스트를 정상적으로 진행할 수 있다. 

앞서서 우리가 webpack과 babel을 구성한 원리와 비슷하다. javascript 로 작성된 test 파일은 `babel-jest` 플러그인을 사용한다. 또한 TypeScript로 작성된 test파일은 `ts-jest` 플러그인을 사용하게 된다. 이렇게 사용되는 플러그인이 파일마다 다르므로 jest configuration 안에서 어떤 파일에 어떤 babel plugin을 사용할 지 명시해야한다.

<br>


## babel configuration

babel에서 플러그인을 사용하기 위해서는 configuration 정의를 통해 사용하는 플러그인을 명시해주어야 한다. Jest 공식문서에서는 가장 기본적인 테스트 환경에서 [JavaScript(es6)를 사용할 때의 config file](https://jestjs.io/docs/getting-started#using-babel) 과 [TypeScript를 사용할 때의 config file](https://jestjs.io/docs/getting-started#using-typescript)을 예시를 통해 알려주고 있다. 이 본문에서는 javascript, typescript, react 를 사용한 테스트 파일을 트랜스파일 하는것이 목적이기 때문에 추가적으로 `@babel/preset-react` 플러그인도 사용한다. 이 플러그인은 React JSX 문법으로 표현된 파일의 트랜스파일을 담당한다.

아래는 babel configuration 정의 예시이다.

루트폴더에 `babel.config.js` 파일을 생성한 후 아래와 같이 작성한다.

```javascript
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
};
```

총 세개의 babel plugin 들이 명시되어있다. 적용된 플러그인과 그 옵션을 살펴보자.

- @babel/preset-env 
[@babel/preset-env의 targets](https://babeljs.io/docs/en/options#targetsnode)는 babel이 어떤 목적을 가지고 컴파일을 진행할 것이가를 정의하는 필드이다. 그 목적이 browserslists라면, 해당하는 browser 안에서 동작할 수 있게 컴파일되고, node가 된다면
해당 node version에 맞게 컴파일 된다. <br>
여기서 우리가 하는 테스트는 브라우져에서 진행하는 것이 아닌 node에서 하게된다. 따라서 targets 필드에서 현재 node 버전에 맞게 트랜스파일 한다는 뜻이 된다.
<br>
<br>
- @babel/preset-typescript 
`@babel/preset-typescript`는 TypeScript로 이루어진 테스트 파일을 es5구문으로 변환하기 위해 사용된다.
<br>
<br>

- @babel/preset-react
`@babel/preset-react`는 React에서 사용하는 JSX구문을 변환하기 위해 사용된다. React17에서는 기존에 사용하던 변환이 아닌 새로운 변환방식을 소개했다.[(React New JSX transform)](https://ko.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)<br>`@babel/preset-react` 플러그인으로는 두가지 변환방식 모두를 사용할 수 있다. 두가지 모두 동작하지만 어떤 차이점이 있는지는, [Babel React Automatic Runtime](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx) 에서 확인 할 수 있다.<br>
나는 여기서 **New JSX Transform** 을 사용할것이다. 핵심이 되는 플러그인은 `@babel/plugin-transform-react-jsx`이다. 이 플러그인은 이미 설치한 `@babel/preset-react`플러그인에 포함되어 있다. 따라서 추가 설치는 필요없고, `runtime` 옵션을 "automatic"으로 정의함으로써 **New JSX Transform**를 사용 할 수 있다.<br>


<br>
<br>

---


# jest configuration

jest 공식문서에 따르면 configuration은 `package.json` 안에 `"jest"` 필드로 정의하거나, 또는 `jest.config.js` 파일을 루트 디렉토리에 생성하여 정의할 수 있다.(jest가 자동으로 감지해준다.) 

<br>
우리는 앞선 포스트 [Jest + React Testing Library 시작하기]()에서 jest configuration 파일을 정의한 적 있다. 해당 코드를 기반으로 추가적으로 어떤 것을 명시해야하는지를 알아보자.

```javascript
//package.json
{
  ...
  "jest" : {                    
    "testEnvironment": "jsdom"  // Default : "node"
  }                             
}
```
<br>

- transform
[Jest configuration 의 transform]()는 어떤 babel-plugin을 사용하여 트랜스파일 할것인지를 결정한다. 따라서 JavaScript 파일은 `babel-jest` 플러그인을 사용하고, TypeScript를 사용한다면 `ts-jest`플러그인을 사용하자.<br>
**예시**

    ```javascript
    //package.json/"jest"
    "transform": {
        "\\.[jt]sx?$": "ts-jest"
    },
    ```
    해당 예시는 정규표현식으로 표현된다. 이는 (.js, .jsx, .ts, .tsx)로 끝나는 모든 파일을 대상으로 `ts-jest` 플러그인을 사용한다는 뜻이다.
    <br><br>


- transformIgnorePatterns
[Jest configuration의 transformIgnorePatterns](https://jestjs.io/docs/configuration#transformignorepatterns-arraystring)는 트랜스파일 하지 않을 영역(패턴)을 지정하는 필드이다. `transformIgnorePatterns`의 기본값은 `"/node_modules/"`인데, 이는 어떤 라이브러리도 트랜스파일 하지 않겠다는 의미이다. 하지만 우리가 테스트 할 파일이 라이브러리에 의존성을 가진다면, 라이브러리를 해당 패턴에서 제외시켜 주어야 한다. 사용자 파일에서 import 하는 라이브러리 외에도 해당 라이브러리가 사용하는 라이브러리도 명시해주어야 한다. 아래 예시는 `d3.js` 라이브러리를 사용하는 컴포넌트를 테스트 하기위해 작성되었다.<br>
**예시**

    ```javascript
    //package.json/"jest"
    "transformIgnorePatterns": [
        "/node_modules/(?!(d3|internmap|delaunator|robust-predicates))"
    ],
    ```

<br>


- setupFilesAfterEnv
[Jest configuration의 setupFilesAfterEnv]()는 테스트 파일이 실행되기전에 실행되어야 하는 setupFile들을 명시하는 필드이다. 만약 각각의 테스트파일에서 반복되는 코드를 `jest-setup.js`라는 파일에 구현 한 뒤 모든 테스트파일이 실행되기전에 실행된다면, 반복되는 코드를 줄일 수 있을것이다. 이 때, `jest-setup.js`의 디렉토리 위치를 이 필드에 넣으면 인식 할 수 있다.<br>
**예시**

    ```javascript
    "setupFilesAfterEnv": [
        "<rootDir>/src/jest-setup.tsx"
    ],
    ```


- 그 외 자주 쓰이는 필드
    - [testMatch](https://jestjs.io/docs/configuration#setupfilesafterenv-array) : 테스트 파일 감지(매칭) 옵션.
    - [moduleNameMapper](https://jestjs.io/docs/configuration#modulenamemapper-objectstring-string--arraystring) : 이미지나 스타일같은 싱글 모듈을 Mocking 하지 않고 사용하기 위해 절대경로 설정 옵션.



<br>

---

# 요약

Jest가 React JSX 구문을 이해하려면 babel이 transfile 해주어야 하기 때문이다.

babel 설정(root/babel.config.js) :
```javascript
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
};
```

jest 설정(package.json) : 
```javascript
//package.json
"jest": {
    "transform": {
      "\\.[jt]sx?$": "ts-jest"
    },
    "transformIgnorePatterns": [
      "/node_modules/(?!(d3|internmap|delaunator|robust-predicates))"
    ],
    "testEnvironment": "jsdom",
    "setupFilesAfterEnv": [
      "<rootDir>/src/jest-setup.tsx"
    ]
}
```