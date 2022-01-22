---
title: "ts-loader vs @babel/preset-typescript"
date: "2022-01-15T17:22:00"
description: "ts-loader vs @babel/preset-typescript, 어느것을 사용해야하는가"
---

# ts-loader vs @babel/preset-typescript

`.tsx|ts` 파일을 컴파일 하기 위해서는 두가지 방법이 있다.

1. ts-loader 사용
2. babel-loader의 @babel/preset-typescript 모듈 사용

두가지 방법 모두 `webpack.config.js` 에서 적용 가능하다.

## ts-loader

### ts-loader란?

참고 : https://github.com/TypeStrong/ts-loader#getting-started

ts-loader 는 loader의 한 종류로 `.tsx|ts` 파일을 컴파일 한다. 목적은 `.tsx`파일을 `.js` 파일로 컴파일 하는 것인데, 컴파일 하는 과정에서 Type Checking도 이루어진다. ts-loader의 옵션은 `tsconfig.json`을 따르며, `target` 필드를 통해 어떤 버전의 `.js`파일로 컴파일 할것인지, 정할 수 있다.


### ts-loader 설치

```
npm install --save-dev typescript ts-loader
```
ts-loader를 사용하기 위해서는 당연히 TypeScript 가 필요하다. 둘 다 설치하자. 그리고 실제 production 단계에서 사용하는것이 아닌 개발단계에서 사용하므로 `--save-dev` 옵션으로 지정해주자.


### ts-loader 사용법

`webpack.config.js`의 `moudle.export/module/rules`에 정의 및 적용 가능하다.

```javascript
//...
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",       
      },
    ],
  },
};
```

또한 `ts-loader`는 `tsconfig.json`의 설정을 따르며, `tsconfig.json`파일에서 `target`을 설정할 수 있다. 여기서 의문인 점은 `tsconfig.json`과 `webpack.config.js`에서 모두 `target`을 정의한다는 점이다.

**tsconfig.json target**
`tsconfig.json`에서의 `target`은 `.ts|tsx`파일이 어떤 버전으로 트랜스파일 할것인가를 설정한다. 

```json
{
  "compilerOptions": {
     "target": "es6",
  }
}    
```

**webpack.config.js target**

`webpack.config.js`에서의 `target`은 번들링되어 나오는 최종 결과물이 어떤 버전으로 나오는것인가를 설정한다.

```javascript
module.exports = {

  target: ["browserslist"],
}
```

*browserslist : package.json에 정의되어 있다. (`browserslist` 모듈 설치 필요)

**tsconfig target vs webpack target**
`tsconfig.json`의 `target`은 `.ts|tsx`파일이 어떤 버전으로 트랜스파일할것인가 만을 결정한다. `tsconfig.json`의 `target`을 `es5`로 설정한다고 하더라도, `webpack.config.js`에서의 `target`이 `es5`를 포함하지 않는다면, `es6`를 지원하지 않는 브라우저(IE)에서 랜더링 되지 않는다. 

이처럼 `webpack.config.js`의 `target`을 설정하여 어떠한 환경(es5,es6)을 기준으로 번들링 된다고 하더라도, `ts-loader`나 `babel-loader`의 트랜스파일이 이루어져야지만 성공적으로 동작하게 된다.


---

## @babel/preset-typescript

### @babel/preset-typescript 란?

참고 : https://babeljs.io/docs/en/babel-preset-typescript

`babel-loader`에 적용가능한 플러그인을 포함한 preset이다. `@babel/plugin-transform-typescript` 라는 플러그인을 포함하고 있으며, TypeScript 파일을 JS 파일로 변경해준다.

### @babel/preset-typescript 설치

```
npm install --save-dev @babel/preset-typescript
```

### @babel/preset-typescript 사용법

`babel-loader` 옵션에 preset으로 정의해주어 사용한다.

```javascript
//...

module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        options: {
            presets:["@babel/preset-typescript"],
        },
      },
    ],
  },
};
```

---

## 차이점 

참고 : https://blog.logrocket.com/babel-vs-typescript/

결과적으로 `ts-loader`나 `@babel/presest-typescript` 모두  `.ts|tsx`파일이 트랜스파일 된다는 것에서는 동일하다. 그 과정속에는 어떤 차이가 있을까?

1. Type Checking : **ts-loader win**

`ts-loader`는 typescript를 기반으로 TypeChecking 기능을 수행한다. 하지만 `babel`은 TypeChecking을 하지 않고 트랜스파일만 한다.

2. 확장성 : **babel win**

`babel`은 `ts-loader`에 비해 더 많은 확장성을 가진다. `babel` 생태계에서 다양한 플러그인은 코드를 최적화 하는데에 도움을 준다.

3. 속도 : **babel win**

`ts-loader`는 TypeChecking 기능을 수행하는 시간이 필요하다. 반면에 `babel`은 그렇지 않다. 하지만 `ts-loader`는 `fork-ts-checker-webpack-plugin` 라는 웹팩 플러그인을 사용하여 TypeChecking 기능을 분리하여 백그라운드에서 실햄함으로 시간을 단축시킬 수 있다.


### 선택은?

모든 상황을 고려하여 최적의 선택을 한다면 물론 좋겠지만, `babel`이나 `ts-loader`는 성능적으로 비슷하므로, 이미 구성된 툴체인이 있다면 변경할 필요까지는 없다. 

내가 추천하는 선택은 `ts-loader` + `babel` 모두를 사용하는 것이다. 우선 TypeScript의 TypeChecking 기능을 사용해야 하며, `babel`의 확장성도 챙길 수 있다. 또한, 학습의 목적으로  `webpack`, `babel`, `typescript`의 관계를 파악할 수 있기 때문이다.

`ts-loader`와 `babel`을 모두 사용한다는 것은 다음과 같은 흐름을 가진다.
>1. `.tsx` => `.js`(es6)  :  `ts-loader`
>2. `.js`(es6) => `.js`(es5)  : `babel`

`babel`은 트랜스파일 역할을 담당하고, `ts-loader`는 typechecking을 담당하게 된다. `ts-loader`가 트랜스파일 역할까지 담당할 수 있지만, `babel`의 확장성을 포기해야한다.


### 적용하기

`.ts|tsx` 파일을 컴파일 하기 위해 우리에게는 두가지 loader를 사용할 것이라고 위에서 설명했다. 

1. `babel-loader` + `@babel/preset-env`, `@babel/preset-react`
2. `ts-loader`

위에서 설치방법을 소개했기 때문에, 바로 적용해보자.

적용에는 두가지 loader의 실행 순서가 중요하다. 위에서 봤던 트랜스파일 흐름을 살펴보자.

>1. `.tsx` => `.js`(es6)  :  `ts-loader`
>2. `.js`(es6) => `.js`(es5)  : `babel`

가장 먼저 `ts-loader`가 실행되고, 다음으로 `babel-loader`가 실행되어야한다. 이 때, `webpack.config.js`에서 다수의 loader를 같이 쓰기 위해 `use`라는 키워드를 사용해야한다. `use` 키워드로 정의한 loader는 가장 오른쪽이 가장 먼저 실행된다. 따라서 loader는 다음과 같이 정의해야한다.

```javascript
use: [
    loader: "babel-loader",       
    loader: "ts-loader",
],
```

이제 여기서 `babel-loader`에는 사용하는 preset 을 정의해주고, 기타 옵션을 정의해주면된다. `ts-loader`도 기타 옵션 정의를 해주면 된다.


**webpack.config.js**
```javascript
const path = require("path");

module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
          loader: "ts-loader",
        ],
        exclude: /node_modules/,
      },
    ],
  },
};
```

webpack 설정을 마쳤다면, 우리는 `ts-loader`의 설정도 따로 해주어야한다. `ts-loader`는 `tsconfig.json` 설정파일을 따른다.

**tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "es6",
    "jsx": "react",
    //...
  }
}
```

우리는 `ts-loader`를 사용해 트랜스파일된 `es6`파일이 필요하다. `target` 필드를 `es6`로 변경하자. 그리고 React에서 JSX 구문이 포함된 `.tsx`파일을 사용하므로 `jsx` 필드를 `react`로 설정해주어야 한다.


### 추가 (typescript-plugin-styled-components 적용)

지금 적용된 설정만으로도 `styled-components` 는 잘 동작 한다. 하지만 개발자도구로 `Elements` 를 볼 때, `className`이 hash 화 되어 개발에 불편함이 있다. 

이 때 필요한 것이 `className`을 컴포넌트 이름으로 설정해주는 플러그인이다. 

`babel-plugin-styled-components` 라는 플러그인이 가장 일반적으로 쓰인다. 그래서 나도 해당 플러그인을 설치하고 `babel-loader`에 등록하여 사용해보았다. 하지만 해당 기능은 동작하지 않았다. 

문제를 해결하기 위해 다방면으로 검색해본 결과, `babel-plugin-styled-components`는 `ts-loader`로 트랜스파일된 파일에는 적용되지 않는다는 문제가 있었다. 따라서 `babel` 플러그인이 아닌 `typescript` 전용 플러그인으로 대체하였다.

`typescript-plugin-styled-components` 이 플러그인이 대체 할 플러그인이다. 이는 바벨 플러그인보다 적용방법이 조금 까다로웠는데, 공식문서에서 자세히 설명하고 있기에, 금방 적용할 수 있었다.

참고 : https://www.npmjs.com/package/typescript-plugin-styled-components

해당 글을 보고 `typescript-plugin-styled-components`를 적용해보자.

**webpack.config.js**
```javascript
const path = require("path");
const createStyledComponentsTransformer =
  require("typescript-plugin-styled-components").default;
const styledComponentsTransformer = createStyledComponentsTransformer();
//...

module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
          {
            loader: "ts-loader",
            options: {
              getCustomTransformers: () => ({
                before: [styledComponentsTransformer],
              }),
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
};
```

