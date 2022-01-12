---
title: "CRA 없이 React App 만들기2 - 이미지파일 번들링"
date: "2022-01-12T17:22:00"
description: "webpack v5의 asset을 사용하여 이미지파일 처리하기"
---

# 이미지 처리하기
---

바로 직전에 CRA 없이 기본적인 React App을 만들고 서버를 구동해봤다. 하지만 아직까지 일반적인 프로젝트조차 진행하기 힘들다. 이번 시간에는 `.js`파일에서 import 하여 사용할 수 있는 file 처리를 적용해보자.

## 이미지 삽입하기

랜더링 하고싶은 이미지를 `./src` 디렉토리에 저장하자. 나는 `.png` 파일과 `.jpg`파일 두개를 준비했다. 그리고 후에 `.svg`파일도 추가된다. 하지만 이를 처리하지않고 사용하면 에러가 발생하니 아래에서 따로 추가한다.

**png**<br>
<img src="https://user-images.githubusercontent.com/34260967/149070047-bb7a36d0-15eb-4fba-bfde-a660684f8271.png" width="200px" height="200px">

**jpg**<br>
<img src="https://user-images.githubusercontent.com/34260967/149077300-99b9660b-ce51-41ff-b9c1-b86c4c6d28b8.jpg" width="200px" height="200px">


저장된 이미지는 `App.js`에서 import 하여 사용할 수 있어야한다. `App.js`에 이미지 컴포넌트를 적용해보자.

**App.js**
```javascript
import React from "react";
import "./App.css";
import testimage from "./testimage2.png";
import testimage2 from "./194_bartsimpson1.jpg"

const TestPNGImage = () => {
  return (
    <img
      src={testimage}
      alt=""
    />
  );
};

const TestJPGImage = () => {
  return (
    <img
      src={testimage2}
      alt=""
    />
  )
}

const App = () => {
  return (
    <div className="app-wrapper">
      <div className="app">React App Without CRA!-----!</div>{" "}
      <TestPNGImage />
      <TestJPGImage />
    </div>
  );
};

export default App;

```

아직 이미지파일을 처리하는 작업은 하지 않았다. 이대로 서버를 실행해보자.

```
Compiled with problems:X

ERROR in ./src/testimage2.png 1:0

Module parse failed: Unexpected character '�' (1:0)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
(Source code omitted for this binary file)
```

실행을 하니 다음과 같은 에러를 `webpack-dev-server`에서 알려준다. 파일처리에 필요한 loader를 설치 및 사용하지 않아서 이미지파일이 번들링 되지않아 컴파일에서도 오류를 던지는거 같다. 그렇다면 파일처리를 하는 loader를 설치하여 문제를 해결하자.

## file-loader ?

**webpack version4에서 사용하는 방법입니다. 이 프로젝트는 version 5를 사용하므로 설명만 하고 적용하진 않습니다**

webpack version 4에서는 외부파일을 import하기 위해선 `file-loader`가 필요했다.

file-loader : https://v4.webpack.js.org/loaders/file-loader/

```
npm install --save-dev file-loader
```

내가 저장한 이미지의 파일확장자는 `.png`이다. 이 외에도 일반적인 이미지 파일을 `.jpg`,`.jpeg`,`.gif`가 있다. 이와같은 이미지파일을 처리하기 위해서는 `webpack.config.js`에 `rule`을 정의해주어야한다.

**webpack.config.js modules/rules/**
```javascript
{
    test: /\.(png|jpe?g|gif)$/i,
    use: [
        {
            loader: 'file-loader',
        },
    ],
},
```

이는 옵션없이 가장 기본적인 `file-loader`의 모습이다. `rules`에 추가해서 loader를 적용하면 처리할 수 있다.

## url-loader ?

**webpack version4에서 사용하는 방법입니다. 이 프로젝트는 version 5를 사용하므로 설명만 하고 적용하진 않습니다**

마찬가지로 webpack version 4 에서는 `file-loader`와 비슷한 일을하는 `url-loader`도 사용했다. `url-loader`는 크기가 작은 asset인 글꼴, 아이콘 등을 처리하기위해 쓰이며, 일반적으로 크기가 큰 파일은 `file-loader`를 쓴다.

`file-loader`와 다른점은 파일 자체를 복사하지 않고, `main.js`에 문자열 형태로 넣어서 바로 사용한다. 즉 크기가 작기에 가능한 방법이다. 이를 확인하기 위해 크기가 작은 `.svg`파일을 준비했다.

url-loader : https://v4.webpack.js.org/loaders/url-loader/

**webpack.config.js modules/rules/**
```javascript
{
    test: /\.(png|jpg|gif|svg)$/i,
    use: [
        {
        loader: 'url-loader',
        options: {
            limit: 8192, //8kb
            },
        },
    ],
},
```

이렇게 `url-loader`를 적용하면 8kb보다 크기가 작은 파일은 inline 형식으로 처리하고, 크기가 큰 파일은 `file-loader`로 처리하게 된다.

---

## asset/resource

webpack version 5로 넘어오면서 loader를 추가로 구성하지 않아도 asset(폰트, 이미지, 아이콘 등)을 처리할 수 있게되었다. `asset/resource`는 version 4 에서 `file-loader`이 하는 역할을 한다.

webpack5 asset : https://webpack.kr/guides/asset-modules/

webpack에서 모듈을 이미 지원하고 있기 때문에, 따로 설치할 필요가 없다. `webpack.config.js`의 `rules`에 추가해서 적용해주자.

**webpack.config.js modules/rules/**
```javascript
{
    test: /\.(png|jpe?g)$/,
    type: "asset/resource",
},
```

build를 해서 확인해보자

![image](https://user-images.githubusercontent.com/34260967/149076795-1f02517e-df84-416e-ac92-ec5512df3787.png)

위와 같은 파일이 생성되었다. `.png`, `.jpg`파일이 잘 처리되어 번들링 된 모습이다. 파일이름이 해쉬값으로 지정되어있지만, 사용자가 직접 정의해줄 수도 있다. 이는 공식문서에 잘 소개되어있으니, 위의 링크에서 확인해보자.


#### asset/resource 결과

이제 서버를 구동시켜 잘 랜더링 되는지 확인해보자.

<img src="https://user-images.githubusercontent.com/34260967/149077635-531fa060-5472-4ba9-97c3-d87defb7accb.png" width="100%">

---

## asset/inline

`asset/inline`은 version 4에서 `url-loader`가 하는 역할을 한다. 다만 `url-loader`에서는 `limit` 옵션으로 기준이 되는 크기를 정할 수 있었지만, `asset/inline`은 `limit` 옵션이 없고, 해당하는 파일 모두를 inline으로 처리한다. 실제로 모든 확장자를 `test` 필드에 포함시켜 빌드를 해보니, 모두 inline 형식으로 처리되어 resource의 결과물이 존재하지 않았다.

효율적인 번들링을 위해서 크기를 기준으로 처리를 다르게하려면 `asset`을 사용해야한다. 자세한것은 다음 항목에서 설명한다.

우선 `asset/inline`을 적용해보자. 적용하기 전에 아래와 같은 체크 모양의 `.svg`파일을 다운받고, `./src` 에 포함시켰다.


<img src="https://user-images.githubusercontent.com/34260967/149087216-40ac92f6-9b29-4b56-b9ca-9b66e72db0f9.png" width="200px" height="200px">

`App.js`를 변경하고 webpack 설정도 적용하여 `.svg`파일도 랜더링 해보자.

**App.js**
```javascript
import React from "react";
import "./App.css";
import testimage from "./testimage2.png";
import testimage2 from "./194_bartsimpson1.jpg";
import testimage3 from "./check.svg";

const TestPNGImage = () => {
  return <img src={testimage} alt="" />;
};

const TestJPGImage = () => {
  return <img src={testimage2} alt="" />;
};
const TestURLImage = () => {
  return (
    <img
      src="https://user-images.githubusercontent.com/34260967/149068669-19c513da-cf57-48df-b6e4-4efa37db2869.png"
      alt=""
    />
  );
};

const TestSVGImage = () => {
  return (
    <img src={testimage3} alt="" />
  )
}

const App = () => {
  return (
    <div className="app-wrapper">
      <div className="app">React App Without CRA!-----!</div> 
      <TestPNGImage />
      <TestJPGImage />
      <TestURLImage />
      <TestSVGImage />
    </div>
  );
};
```

<br>

**webpack.config.js modules/rules/**
```javascript
{
    test: /\.(png|jpe?g)$/,
    type: "asset/resource",
},
{
    test: /\.svg/,
    type: 'asset/inline'
},
```

이처럼 `asset/resource`와 `asset/inline`을 적용했다. build를 해서 확인해보자.

![image](https://user-images.githubusercontent.com/34260967/149087771-7c18c25a-bf22-435b-98d9-6405e6e33e30.png)

`.svg`파일을 추가했음에도 `.svg`파일이 독립적으로 번들되지 않음을 확인할 수 있다. `main.js` 내에 inline 형식으로 정의되어 있을 것이다.

#### asset/inline 결과

<img src="https://user-images.githubusercontent.com/34260967/149088401-abcbb0ff-a489-4bc6-8851-596c48b74472.png" width="100%">

`.svg`파일까지 잘 랜더링 되는 모습이다.

---

## asset

version 4 에서 처럼 `file-loader`와 `url-loader`을 같이 사용하여 효율적인 번들링을 하고싶다면, version 5 에서는 `asset`을 사용하면 된다. `asset`역시 적용법은 간단하다. `asset/resource`와 `asset/inline`의 적용을 삭제하고, `asset`만 추가하자.
<br>

**webpack.config.js modules/rules/**
```javascript
{
    test: /\.(png|jpe?g|svg)$/,
    type: "asset",
    parser: {
        dataUrlCondition: {
            maxSize: 8 * 1024, // 8kb
        },
    },
},
```

`parser` 필드에서 기준이 되는 크기를 정할 수 있다. 이렇게하면 8kb 이하면 inline으로 처리되고, 8kb를 초과하면 resource로 처리된다. 

현재 `.png`파일은 318kb,  `.jpg`파일은 64kb 이고 `.svg`파일은 1.3kb 이다. 이론적으로는 `.png`,`.jpg`파일은 resource로 처리되고, `.svg`파일은 inline으로 처리되어야한다. 아래에서 결과를 확인해보자.

#### asset 결과

build를 해서 결과를 확인해보자.

![image](https://user-images.githubusercontent.com/34260967/149089529-803fc0d6-20f7-4e92-82ab-614be3512a94.png)

이론적인 결과와 동일하게 나왔다. 서버를 구동해보니 랜더링도 문제없이 잘 되었다.
