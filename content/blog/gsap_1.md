---
title: "(GSAP) DOM은 어떤 방식으로 조작해야하나?(ref vs id)"
date: "2022-06-07T23:08:00"
description: "useRef 훅을 이용한 조작 vs id를 이용한 조작"
tag : "gsap"
---


# (애니메이션) React에서 DOM의 Element를 직접 조작하기 위해 useRef() 를 사용하는것과 id를 사용하는것은 어떤 차이가 있을까?



결론부터 말하자면 **useRef()** 를 사용하는 것이 옳은 선택이다.

`useRef()`는, DOM에서 element를 직접 참조하여 조작을 할 수 있게한다. 

id는 `window` 객체에 전역으로 저장되며, `getElementById()` 를 통해서 동일한 id를 가진 element를 찾아서 조작한다.

이 둘은 element를 조작한다는 점에서는 동일하다. 하지만 id는 element를 찾는 과정이 추가 되어 다음과 같은 문제가 생긴다.


1. 재사용성을 제한적이게 만든다.
동일한 id를 가진 elements 에게 동일한 효과를 적용시키지 못한다. `getElementById()`가 가장 첫번째로 찾아넨 element만이 효과가 적용된다. 또한 같은 컴포넌트라도 다른 효과를 주고 싶을 때에는, 여러번 사용되는 컴포넌트들의 id를 각각 다르게 해주어야만 한다. 

[참고] : https://www.javascriptstuff.com/use-refs-not-ids/

2. napespace 충돌
일반적으로 DOM에 id property가 있다면, `window` 객체에서 전역으로 id를 저장하게 된다. 이 때 지정된 스코프 내에서 쓰이는 변수의 `name`과 `id.name`이 같다면, namespace 충돌을 일으키게 되어 안정성을 보장받지 못한다. (이를 해결하기 위해서는 id 값을 다른 변수값에 넣어서 사용해야한다.)

[참고] : https://greensock.com/forums/topic/13965-div-id-names-automatically-selected-by-gsap/?do=findComment&comment=58896

3. 단방향 데이터 flow를 해침

단방향 데이터 flow를 지향하는 리액트에서는 id를 전역으로 사용하는 것이 유지보수하기 힘들게 만든다. 따라서 지정된 스코프 내에서 핸들할 수 있게 `useRef()`를 사용하는 것이 더욱 바람직하다.



# 요약
- `getByElementID()` 보단 `ref`를 사용하는 것이 낫다.

- React에서 강력한 기능`useRef()`을 제공해주는데 안 쓸 이유가 없다는 것이 대다수의 의견이다.