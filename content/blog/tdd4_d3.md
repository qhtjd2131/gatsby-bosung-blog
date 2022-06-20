---
title: "컴포넌트 단위의 테스트 진행 + d3.js"
date: "2022-06-20T22:00:00"
description: "컴포넌트 단위의 테스트 진행 + d3.js"
tag: "jest"
---

# 컴포넌트 단위의 테스트 진행 + d3.js

`d3.js` 라이브러리를 사용해 데이터 시각화 컴포넌트를 구현할것이다. 이때 컴포넌트 기반 TDD를 적용해서 구현해보자.


---

# d3.js 란?

[D3](https://d3js.org/)는 데이터를 기반으로 문서를 조작하기 위한 자바스크립트 라이브러리이다. HTML, SVG 및 CSS를 사용하여 데이터를 생생하게 재현할 수 있도록 도와준다. 또한 D3는 웹 표준을 따르며, 강력한 시각화 구성 요소와 DOM 조작에 대한 데이터 중심 접근 방식을 결합하여, 특정 프레임워크에 얽매이지 않고 최신 브라우저의 모든 기능을 제공할 수 있다.


**왜 D3를 쓰는가?**

 수 많은 Javascript 데이터 시각화 라이브러리가 존재한다. 

그 중에서 내가 D3를 선택한 가장 큰 이유는 **많은 기업에서 사용 중** 이기 때문이다. 당장 채용시장에서 데이터시각화 기술을 요구하는 기업들은 모두 D3를 요구했다. 

D3는 어떤 특징을 가지고 있기에 기업에서 사용되어지는가? D3.js의 대안인 Chart.js, GoogleChart.js 는 강력하고 심플한 데이터 시각화를 추구한다. 이는 가장 빠르게 완벽한 서비스를 제공할 수 있지만, 기업 특성에 맞는 서비스를 제공하기 어렵게 만든다. 하지만 D3.js는 DOM을 조작함으로써 **유연하고 상호작용 가능**한 컴포넌트를 구현할 수 있다.

지금은 배우는 입장에서 D3.js를 선택했다. 하지만, 만일 내가 서비스를 제공하는 입장이라면 가볍고 심플하게 강력한 기능을 제공하는 Chart.js를 사용했을것 같다. 



---

# 무엇을 만들것인가?

블로그의 이전 포스트에서 Jest + @testing-library 를 사용할 환경을 구성했다. 이제 직접 TDD를 적용하여 테스트해보자.

우선 테스트를 먼저한다는 것은 이미 무엇을 만들지를 알고 있어야 한다는 의미다.

이번 포스트에서는 D3.js를 이용하여 아래와 같은 Vertical BarChart 를 만들것이다.
<br>

**chart 모양**
<br>

![barchartExample](https://user-images.githubusercontent.com/34260967/174585581-6b66cba9-98bf-4294-8769-27cc7243eb92.png)

**chart에 적용될 데이터**
```javascript
[
    { name : "A", value : 20},
    { name : "A", value : 32},
    { name : "A", value : 10},
    { name : "A", value : 24},
]
```


---

# 무엇을 테스트할 것인가?

결국엔 테스트도 완성도 높고 정규화된 작업결과물을 위해 하는것이다. 테스트를 하기위해 더 많은 일을 해야한다면, 그것은 옳지않은 방법일 수 있다.

따라서 우리는 무엇을 테스트할 것이가를 적당하게 정해야 한다. 

이 포스트에서는 React Testing Library가 추구하는 사용자 관점에서의 테스트를 하려고 한다.

- VerticalBarChart가 랜더링 되는가?
- X축이 랜더링 되는가?
- Y축이 랜더링 되는가?
- Bar이 데이터에 맞게 랜더링 되는가?

이처럼 사용자의 관점에서 테스트를 하면, 내부적으로 어떻게 동작하던지 간에 결과중심으로 테스트하게 된다. 그렇다고 해서 내부동작을 아주 무시하는 것은 아니다. 사용자관점에서의 화면랜더링은 내부동작의 결과이기 때문이다. 따라서 내부동작에 따른 화면랜더링 검사로 내부동작을 간접적으로 검사할 수 있다.

---

# 테스트 진행하기

### 컴포넌트 파일 생성

테스트 파일에서 import를 해야하기 때문에, 컴포넌트 파일부터 생성했다.

```javascript
//VerticalBarChart.tsx
const VerticalBarChart = () => {
  return (
    <></>
  );
};

export default VerticalBarChart;
```

### Test 파일 생성

우선 `<VerticalBarChart />` 컴포넌트는 시각화할 데이터가 필요하다. 컴포넌트 내부에는 진짜 데이터가 있어야 하겠지만, 테스트환경에서는 진짜데이터든 가짜데이터는 상관없다. 

여기서 우리는 서비스를 위한 테스트라는것을 잊지 말아야한다. 테스트환경을 실제환경과 너무 과도하게 맞출 경우에는 그것은 테스트가 아니라 한번 할일을 두번하는것이다.

따라서 위의 데이터 예시와 같은 가짜 데이터를 테스트를 위해 생성한다.

**기본 설명**
- describe : 테스트를 그룹화 한다.
- it : 하나의 테스트
- render : 테스트환경인 `jsdom`에 랜더링한다.

**가짜 데이터 생성**
```javascript
//VerticalBarChart.test.tsx
import { render } from "@testing-library/react";
import React from "react";
import VerticalBarChart from "./VerticalBarChart";

describe("<VerticalBarChart />", () => {
  const mockData = [
    { name: "A", value: 10 },
    { name: "B", value: 20 },
    { name: "C", value: 30 },
    { name: "D", value: 40 },
  ];
});
```
<br>

**VerticalBarChart 렌더링 확인**

```javascript
describe("<VerticalBarChart />", () => {
  const mockData = [
    { name: "A", value: 10 },
    { name: "B", value: 20 },
    { name: "C", value: 30 },
    { name: "D", value: 40 },
  ];
  it("vertical barChart render", () => {
    render(<VerticalBarChart data={mockData} />);
  });
});
```

## test 실행하고 수정하기

아래는 하나의 테스트파일(VerticalBarChart.test.tsx)을 지정하여 테스트하는 명령어이다.
```node
npm test -- VerticalBarChart.test.tsx
```

결과 :
```node
qhtjd@DESKTOP-95HO4K5 MINGW64 ~/react/react-d3-tdd (main)
$ npm test -- VerticalBarChart.test.tsx

> react-d3-tdd@1.0.0 test
> jest "VerticalBarChart.test.tsx"

 FAIL  src/components/pageComponents/VerticalBarChart.test.tsx
  ● Test suite failed to run

    src/components/pageComponents/VerticalBarChart.test.tsx:13:30 - error TS2322: Type '{ data: { name: string; value: number; }[]; }' is not assignable to type 'IntrinsicAttributes'.
      Property 'data' does not exist on type 'IntrinsicAttributes'.

    13     render(<VerticalBarChart data={mockData} />);
                                    ~~~~

Test Suites: 1 failed, 1 total
Tests:       0 total
Snapshots:   0 total
Time:        4.044 s
Ran all test suites matching /VerticalBarChart.test.tsx/i.
```

원래는 성공해야 할 테스트지만, props로 data를 받는다는것을 가정했기 때문에 테스트에 실패했다. props로 data를 받도록 만들어보자. 

**컴포넌트 파일 수정 : data 받기**

해당 컴포넌트에 props로 data를 받기 위해 interface를 지정해주고, 컴포넌트 내부 변수로 할당해주었다.

```javascript
//VerticalBarChart.tsx
interface VerticalBarChartProps {
  data: {
    name: string;
    value: number;
  }[];
}

const VerticalBarChart = (props: VerticalBarChartProps) => {
  const { data } = props;
  return <></>;
};

export default VerticalBarChart;
```

**다시 테스트 해보기**

결과 : 
```node
qhtjd@DESKTOP-95HO4K5 MINGW64 ~/react/react-d3-tdd (main)
$ npm test -- VerticalBarChart.test.tsx

> react-d3-tdd@1.0.0 test
> jest "VerticalBarChart.test.tsx"

 PASS  src/components/pageComponents/VerticalBarChart.test.tsx
  <VerticalBarChart />
    √ vertical barChart render (11 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        4.45 s
Ran all test suites matching /VerticalBarChart.test.tsx/i.
```

테스트에 성공한것을 볼 수 있다. TDD란 이러한 느낌으로 결과를 예상하고 테스트를 기반으로 개발하는것이다. 

--- 
## Test 파일 완성

위와 같은 방식을 반복하여 원하는 테스트파일을 작성해보자.

```javascript
//VerticalBarChart.test.tsx

```









