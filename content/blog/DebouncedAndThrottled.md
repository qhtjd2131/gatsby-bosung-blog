---
title: "Debounced 와 Throttled"
date: "2022-05-03T17:00:00"
description: "이벤트 처리에 있어서 과도한 리랜더링 방지를 위한 기술"
tag : "javascript"
---

참고 : https://webclub.tistory.com/607

<br>


반응형으로 로직을 처리하기 위해 window resize 이벤트를 사용하면 window size가 변경될때마다 적용되는 컴포넌트는 리랜더링 된다. 이를 좀 더 효율적으로 처리할 수 없을까?

이벤트 처리가 많이 일어나는 스크롤 이벤트를 효율적으로 처리하기 위해 아래와 같은 두가지 기능을 사용할 수 있다.
# Debounced

연속적으로 발생하는 이벤트를 그룹화하여 마지막 하나의 이벤트만을 발생하게 하는 기술이다. 


### codepen 출처 : KimJaeHee님 (https://webclub.tistory.com/607)

<iframe height="300" style="width: 100%;" scrolling="no" title="Debounce. Trailing" src="https://codepen.io/jaehee/embed/XoKeRW?default-tab=html%2Cresult&theme-id=dark" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/jaehee/pen/XoKeRW">
  Debounce. Trailing</a> by jaeheekim (<a href="https://codepen.io/jaehee">@jaehee</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

<br />

Scroll Resize 이벤트에 따라 반응형을 구성하기에 적합한 기술이라고 생각한다. 스크롤 이벤트 발생으로 인한 지나치게 많은 리랜더링을 방지할 수 있다.

이 외에도, Ajax 요청이 있는 자동 완성 검색어 기능을 사용할 때에도 유용하게 쓰일것이라 생각한다.



# Throttled 
이벤트를 특정 시간 내에 한번만 발생하도록 하는 기술이다. 예를 들어 Throttled 설정을 10ms 로 한다면, 이벤트가 한번 발생하고 10ms가 지나지 않으면 이벤트가 발생하지 않는다.

쉽게 말해서, 같은 속도로 스크롤을 1000px 이동했을때, 일반적으로 발생되는 이벤트가 1000개일 때, Throttled 를 사용하면 100개든 50개든 설정시간에 따라 이벤트 발생 빈도를 줄일 수 있다.

이와 같은 특성은 무한 스크롤링 페이지에 적합하다. Debounced 는 스크롤이 멈출 때만 이벤트를 발생시키기에 적합하지 않다.


# 요약

window resize에 따른 반응형 컴포넌트 구현하던 중 이벤트 발생을 줄일 방법이 있지 않을까 생각하고 찾게된 기술들이다. 나는 Debouced를 사용하여 스크롤이 멈춘 시점에서 반응형으로 변경되게 만들었다. 좀더 부드럽고 그 때 그 때 반응형으로 구현하고 싶다면 Throttled를 사용했을것이다.