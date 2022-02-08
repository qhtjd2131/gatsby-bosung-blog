---
title: "CRA 없이 React App 만들기"
date: "2022-01-12T02:34:07"
description: " CRA 없이 React 프로젝트 생성하고 구동하기"
tag : "no-cra"
---

# CRA 없이 React 프로젝트 생성하고 구동하기
---

## 프로젝트 생성


**프로젝트 디렉토리 생성**
```
mkdir react-without-cra
cd react-without-cra
```
프로젝트를 생성할 폴더를 하나 생성하자.
<br>

**package.json 생성**
```
npm init
```

Node.js 에서 사용하는 모듈을 패키지로 관리하기 위해 `package.json` 파일을 생성한다. 이 때 `npm init`명령어를 사용한다. 

**package.json**
```javascript
{
  "name": "project-name",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}

```
`create-react-app`을 통해 생성된 `package.json`과는 조금 다른 모습이지만, 기본 틀은 생성되었다. 이제 필요한 모듈을 다운로드받으면 자동으로 `dependency` 필드가 생기고, 의존 정보가 입력될 것이다.

**기본 파일 생성**
이제 기본 파일을 생성해보자 일반적으로 react는 다음과 같은 구조를 가진다. 이는 default 값으로 활용되니 지켜줘야 할 필요가 있다.

![image](https://user-images.githubusercontent.com/34260967/148720685-7ea5d9e1-075b-4a69-95fc-81809bfe5aea.png) <br>

*`App.css`파일도 추가되었음.

`public`, `src` 디렉토리를 생성하고, 하위 파일도 똑같이 구성해주자.

**index.html**
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>React App Without CRA</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```
**index.js**
```javascript
//react 모듈 설치 후 작성할 것입니다.
```

**App.js**
```javascript
//react 모듈 설치 후 작성할 것입니다.
```

**App.css**
```javascript
//react 모듈 설치 후 작성할 것입니다.
```

<br>
<br>

**필요한 모듈은 무엇인가?**
그렇다면 React App을 구동하기 위해서는 어떤 모듈이 필요할까? Node.js 프로젝트가 React 프로젝트가 되기 위해서는 아래와 같은 세가지 모듈이 필요하다.

1. `react`, `react-dom` 모듈

2. ES6와 JSX를 ES5로 변환해주는 Transpiler : babel

3. transpile 된 파일을 하나(또는 여러개)의 파일로 묶어주는 bundler : webpack, parcel 등

`create-react-app`에서는 babel, webpack을 사용한다.

---

## React

React App을 구현하는데 필수적인 모듈은 다음과 같다.
```
npm install react react-dom
```
- `react` : React 라이브러리의 진입점이다. 컴포넌트를 사용 할 수 있게 되며, hook을 사용 할 수 있다.<br>
https://ko.reactjs.org/docs/react-api.html
<br>
- `react-dom` : DOM에 특화된 메서드와 필요한 경우 React 모델 외부로 나갈 수 있는 해결책을 제공한다. `render()`메서드 등이 있다.<br>
https://ko.reactjs.org/docs/react-dom.html
<br>

모듈을 설치하고 `.js` 파일을 다시 작성해주자.
**index.js**
```javascript
import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
ReactDom.render(<App />,document.getElementById("root"));
```

**App.js**
```javascript
import React from "react";

const App = () => {
  return <div className="app">React App Without CRA!-----!</div>;
};

export default App;
```

**App.css**
```css
.app {
    background-color: yellow;
    color : blue;
}
```

---

## webpack v5.x

### webpack 이란?

webpack 은 js파일, module, image, css 등 어플리케이션에 사용되는 모든 파일을 최소한의 파일로 묶는(bundling) 일을 한다.

그렇다면 왜 번들링 하는 것일까?

1. 모듈 호환성
`javascript`는 모듈 간 import와 export를 할 수 없다. 그렇기 때문에 script tag 를 사용하여 global 형식으로 모듈을 사용해야한다. 이러한 방식은 같은 이름의 변수를 사용하는 모듈 간 충돌을 일으키고, 모듈의 경계성이 모호해 지는 문제가 있다. <br>
React와 같이 복잡하고 다양한 구조로 모듈이 사용되는 경우에는 모듈의 의존성을 묶어 관리하여 모듈 간 충돌을 피해야할 필요가 있다. 
(의존성 관리는 webpack에서 자동으로 해준다)<br><br>

2. 로딩 시간
당연하게도 webpack을 사용하지 않는다면, 여러개의 `.js`파일을 로드하는데 시간이 낭비된다. 따라서 번들링을 통해 최소한의 파일로 재구성함으로써, 유지·보수·배포에 효율적이게 된다.


요약하자면 webpack과 같은 번들러는 코드를 모듈방식으로 작성할 수 있게 하고 이를 작은 package로 묶어서 로딩 시간을 최적화할 수 있다.

javascript 번들러의 역사와 특성, 목적에 맞는 번들러 선택에 관한 재미있는 글을 발견하여서 링크를 남긴다.
JavaScript 번들러로 본 조선시대 붕당의 이해: https://yozm.wishket.com/magazine/detail/1261/?fbclid=IwAR0WkCNyLEUiaEjrCZ-Uwbxdoj10_fijcqxDte8POIAJssehrRNJuAV2aKs<br>

**참고**
webpack을 사용하는 이유(모듈호환성) : 
- https://ljh86029926.gitbook.io/coding-apple-react/undefined/bundler
- https://ui.toast.com/fe-guide/ko_BUNDLER<br>

webpack 요약 :
- https://ko.reactjs.org/docs/create-a-new-react-app.html#creating-a-toolchain-from-scratch<br>


### webpack 설치 
 

**webpack 기본 설치**
webpack을 사용하기 위해 가장 기본적으로 설치해야할 패키지는 다음과 같다.

```
npm install --save-dev webpack webpack-cli
```
- webpack-cli : 웹펙을 커맨드라인에서 명령어로 제어 할 수 있게 한다.

<br><br>

**참고**
- webpack 사용법 : 
https://webpack.kr/guides/getting-started/

<br>
<br>

**Lodaer 설치**
웹팩은 번들링을 하기위해 Loader라는 것을 사용한다. 서로 다른 확장자를 번들링 하기위해서는 각각의 Loader가 필요하다. 

- React의  `.js` 파일 : `babel-loader`이 필요하다.
- css 파일 : `style-loader`, `css-loader` 이 필요하다.

```
npm install --save -dev babel-loader style-loader css-loader
```
- babel-loader : ES6와 JSX문법을 사용하는 react의 `.js`파일을 담당
- style-loader : DOM 에 style 태그를 사용하여 export 하는 역할
- css-loader : css파일을 담당

**참고**
- webpack loader: 
https://webpack.js.org/loaders/<br>
<br>
<br>


**webpack-dev-server 설치**

`webpack-dev-server` 는 웹 애플리케이션을 개발하는 과정에서 유용하게 쓰이는 도구이다. 웹팩의 빌드 대상 파일이 변경 되었을 때 매번 웹팩 명령어를 실행하지 않아도 코드만 변경하고 저장하면 웹팩으로 빌드한 후 브라우저를 새로고침 해준다.
```
npm install --save dev webpack-dev-server
```

**참고**
- webpack handbook :
https://joshua1988.github.io/webpack-guide/devtools/webpack-dev-server.html#webpack-dev-server<br>

- webpack configuration :
https://webpack.js.org/configuration/dev-server/<br>

<br><br>

**webpack plugin 설치**

필수는 아니지만, 효율적인 번들링을 위해 사용하는 최소한의 플러그인은 다음과 같다.
```
npm install --save-dev html-webpack-plugin clean-webpack-plugin
```

- `html-webpack-plugin` : 번들링된 파일을 자동으로 주입해준다. 사용하지 않는다면 직접 script 태그와 link태그로 주입하여야 한다.<br>
https://webpack.kr/plugins/html-webpack-plugin/ <br>

- `clean-webpack-plugin` : 빌드 이전 결과물을 제거하는 플러그인이다.<br>
https://www.npmjs.com/package/clean-webpack-plugin

이 플로그인을 적용하려면 `webpack.config.js`에 명시해야한다. 자세한 내용은 아래에서 설명한다.

webpack에는 다양한 플러그인이 존재한다. 흔히 쓰이는 플러그인은 알아둘 필요가 있다. 다음은 2021년에 많이 사용된 웹팩 플러그인을 소개하는 글이다.  <br>
[The best and proven React Webpack plugins for 2021](https://linguinecode.com/post/top-webpack-plugins) <br>

 



<br><br>

**webpack.config.js 생성**

webpack version 4 부터 복잡한 설정이 필요한 대부분의 프로젝트를 위해 webpack 설정파일인 `webpack.config.js`를 지원하여 설정할 수 있게 지원한다. root 디렉토리에 `webpack.config.js`파일을 생성하자.

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

공식문서에 따르먼 기본적인 `webpack.config.js`파일은 이렇게 생겼다. 위와 같이 작성하자. webpack은 `webpack.config.js`라는 이름의 파일을 자동으로 감지하여 설정을 적용한다. webpack은 default 설정을 먼저 적용한 후에 `webpack.config.js`파일의 설정을 적용한다. 따라서 이 파일이 없다면, 기본값 설정이 적용될것이다.

<br><br>

**webpack.config.js 설정**

다음은 `webpack.config.js` 에서 필요한 설정 필드에 대해 설명한다.

**mode**

```javascript
mode: 'development'
```
mode는 webpack 번들링을 어떤 방향으로 최적화 할것인가를 정의한다. mode의 종류에는 `development`,`production`,`none`이 있다. 이 프로젝트에서는 개발모드인 `development`를 사용하면 된다. 기본값은 `production`모드인데 따로 설정하지 않으면 warning을 표시하므로 가급적 설정해주자. 자세한 내용은 아래 공식문서를 참고하자.<br>
webpack mode : https://webpack.kr/configuration/mode/

<br>

**target**
```javascript
target : ['browserslist'],
```
target 필드는 어떤 환경을 대상으로 번들링할 것인가를 정의한다. javascript는 브라우저 뿐만아니라 서버에서도 사용되기 때문에 다양한 환경이 있고 이를 지원한다. target 필드의 기본값으로는 'web'이 들어간다. 기본값으로 웹 어플리케이션을 구동한다면, 크로스브라우징 문제를 해결하지 못한다(IE11에서 랜더링되지 않는다). 따라서 `package.json`에서 `browserlist`를 정의하여 적용할 필요가 있다.

```
npm install browserslist
```

browserslist는 `package.json` 에서 자동으로 `browserslist` 필드를 찾아서 적용한다. 덕분에 우리는 각 모듈마다 공통된 `target`을 한번에 설정할 수 있다.

`create-react-app`을 사용하여 app을 만들었을때, `package.json`의 `browserslist`는 다음과 같이 설정되어있다. 똑같이 설정하자.
```javascript
//package.json
...
"browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
}
```
`browserslist`에 관한 자세한 설명은 아래 링크를 보면된다. 

browserslist : https://github.com/browserslist/browserslist#query-composition<br>
webpack target : https://webpack.js.org/concepts/targets/


<br><br>

**plugins**

```javascript
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    ...
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, "public/index.html"),
            filename: "index.html",
        }),
    ],
    ...
}
```

webpack의 플러그인을 사용하기 위해서는 `webpack.config.js` 파일에 플러그인을 명시해주어야한다. 이는 공식문서의 플러그인 설명에 기재되어있으며, 각 플러그인 마다 어떤식으로 적용해야하는지도 알려준다.

`new` 키워드를 사용하여 옵션이 포함된 플러그인 인스턴스를 생성하여 적용하는 듯 하다. 그래서 따로 옵션을 적용하기위해서는 파라미터로 전달해야한다.

파라미터의 필드는 아래 링크에서 소개되어있다. 
html-webpack-plugin option :
 https://github.com/jantimon/html-webpack-plugin#options

<br><br>

**module**
```javascript
module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
},
```
webpack에서 외부 모듈인 loader를 사용하기 위해서는 `module`필드에 명시해주어야한다.

또한 webpack은 번들러이기 때문에 어떤 확장자의 파일을 어떤 모듈을 사용하여 어떤 조건으로 번들링을 할것인지에 대한 `rules`가 필요하다. 그래서 특정 확장자의 파일을 처리하기 위한 하나의 `rule`이 모여 배열형태로 정의된다.

- test : loader를 사용해 처리할 확장자를 정규식 형태로 표현
- include : babel로 컴파일 할 폴더나 파일
- exlclude : babel의 컴파일에서 제외될 폴더나 파일
- loader : 사용할 loader
- options : loader의 옵션
- use : 다수의 loader을 적용할 때 사용, 가장 오른쪽 로더부터 사용됨.

webpack config 공식 : https://webpack.js.org/configuration/

<br><br>

**devServer : 필수아님**

```javascript
devServer: {
   host: 'localhost',
   port: 8080,  //포트
   open: true, //개발 서버 실행 시 브라우저 오픈
},
```

local에서 실행될 dev-server의 설정이다. `webpack-dev-server`를 사용하여 서버를 구동하므로 `webpack.config.js`에 정의해야한다. 나는 `create-react-app`처럼 서버 구동시 새창에서 열리기를 원하여 위와 같은 설정을 하였다. React App이 실행되기위한 최소환의 세팅은 아니지만 알아두자.

<br><br>

**결과**

**webpack.config.js 설정 후**
```javascript
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  target: ["browserslist"],  //package.json 에 정의됨
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      filename: "index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    host: "localhost",
    port: 8080,
    open: true, //개발 서버 실행 시 브라우저 오픈
  },
};
```

HTML, CSS, JavaScript 를 사용하는 기본적인 React App을 화면에 랜더링 하기위해 가장 기본적인 설정을 했다. 이 설정으로 일반적인 프로젝트를 진행하기는 힘들것이다. TypeScript, SASS, Styled-Components, Image 등을 처리하기 위해서는 다양한 플러그인과 로더가 필요하므로 상황에 맞게 알아보고 추가하자.
 
<br>

**참고**
- webpack 공식문서 : 
https://webpack.js.org/guides/getting-started/#using-a-configuration

<br>

--- 

<br>

## babel v7.x

### babel 이란?

babel은 ES6의 문법을 사용한 `.js`파일을 ES5로 변환 해주는 transpiler 이다. (compiler 라고 대부분의 웹에서 말하고 있으며, 엄밀히 따지자면 transpiler이다.)

이러한 변환작업은 왜하는걸까?
- 크로스 브라우징(cross browsing) 문제 해결
브라우저들은 각각 다른 랜더링 엔진을 가지고 있으며, 지원되는 범위가 다르다. 그래서 브라우저 마다 서로 다른 처리를 해야하는 경우가 발생한다. 이를 크로스 브라우징 문제라고 한다. 대표적으로 IE 브라우저는 ES6문법을 이해하지 못한다. 따라서 babel을 사용해 ES6문법으로 작성된 `.js`파일을 ES5로 변환해주어야 한다.

<br><br>

**babel 설치**

react에서 babel을 사용하기 위해선 다음과 같은 모듈이 필요하다.

```
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react
```
- @babel/core: 바벨의 메인 패키지
- @babel/preset-env: ES6+ 코드를 이하 버전(ES5)로 변환해주는 라이브러리
- @babel/preset-react: JSX 코드를 JS로 변환해주는 라이브러리

---
## 서버 구동

### package.json 설정

`webpack-dev-server`를 실행시키기 위해서는 `package.json`의 `script` 필드에 실행명령어를 추가해야한다.

```json
"scripts": {
    "dev": "webpack serve"
},
```

그리고 터미널에 `npm run` 키워드와 함께 설정한 `script`를 사용하면 된다.

```
npm run dev
```

### 화면

<img src="https://user-images.githubusercontent.com/34260967/149007185-920d274b-0d8b-4601-84ab-25984b3a4b61.png
" width="100%">

---
## 참고

세부정보 보다는 전체적인 흐름을 참고하였습니다.

https://medium.com/@_diana_lee/cra%EC%97%86%EC%9D%B4-%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0-feat-%EC%9B%B9%ED%8C%A9-%EB%B0%94%EB%B2%A8-74f5bc3c5da1<br>

https://velog.io/@kmlee95/CRA%EC%97%86%EC%9D%B4-React%ED%99%98%EA%B2%BD-%EA%B5%AC%EC%B6%95%ED%95%98%EA%B8%B0
<br>

---

### 이번 프로젝트를 하면서...
- React의 동작 방식
- Webpack의 동작방식
- Webpack Config 설정법
- babel의 동작방식
- Webpack과 babel이 어떻게 연결되면서 동작하는가

### 다음 프로젝트에서는..
- typescript 적용
- file-loader 적용
- styled-components 적용
- 위 사항을 모두 적용하여 cra 없이 간단한 프로젝트 진행


