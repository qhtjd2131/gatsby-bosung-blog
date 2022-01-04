---
title: "Create a blog with gatsby! Step 5."
date: "2022-01-05T17:05:49"
description: "Gatsby Cloud를 통해 블로그 배포하기"
---

# Gatsby Cloud를 통해 블로그 배포하기

---

<br>

이 포스트는 Gatsby에서 제공하는 gatsby-starter-blog 라는 플러그인을 사용해 제작한 블로그의 코드 및 파일을 GitHub에 저장하고, Gatsby Cloud로 호스팅, 배포를 하는 과정을 설명합니다.

<img src="" width="100%">

## Gatsby 회원가입

<img src="https://user-images.githubusercontent.com/34260967/148123034-f1ceb0e1-d43c-4c33-a58f-f5eeb8650b54.png" width="100%">


<br>
Gatsby : https://www.gatsbyjs.com/

Gatsby 사이트에 'Products' 라는 네이게이션 항목에 Cloud가 있다.

<br>

<img src="https://user-images.githubusercontent.com/34260967/148123134-7439ab4d-709f-472f-85eb-362b490feb88.png" width="100%">


Get Started free 클릭.
<br>
<br>

<img src="https://user-images.githubusercontent.com/34260967/148123205-e773b369-91dd-4ca4-847b-5051238b33a7.png" width="100%">

이미 가입되어있다면 로그인을 하고, 아니라면 아래와 같이 회원가입을 한다.
<br>
<br>

<img src="https://user-images.githubusercontent.com/34260967/148123442-4bf0accc-ac96-4333-820c-2e77bbb57abb.png" width="100%">

Add a Site 클릭
<br>
<br>

<img src="https://user-images.githubusercontent.com/34260967/148123660-afaba7a1-1e80-4ea3-a3af-d0bf0869e237.png" width="100%">


Github repository와 연결하는 작업이다. Github 계정으로 로그인을 하고 해당하는 repository를 선택하고 import 버튼을 누르면 된다.
<br>
<br>

<img src="https://user-images.githubusercontent.com/34260967/148123861-1a9c9f50-b79b-42d8-a361-dbf6f1f066ec.png" width="100%">

Next 클릭
<br>
<br>

<img src="https://user-images.githubusercontent.com/34260967/148125934-b28fdc90-2e7e-4c08-ab88-6470a3488e06.png" width="100%">


Connect Intergrations 는 Headless CMS와의 연결을 묻는것이다. 해당사항이 없으므로 PASS 한다.
*Headless CMS란?(심재철 님 블로그) : https://simsimjae.medium.com/headless-cms%EB%9E%80-49569dc86daa

Environment variables 는 환경변수이다. Gatsby는 Github repository 의 파일들을 build하여 배포한다. 즉 사용자의 로컬환경이 아니기에 로컬에서 사용하는 환경변수를 Gatsby Cloud가 알아야지 제대로 빌드하여 배포할 수 있다. 나도 따로 환경변수를 사용하지 않으므로 PASS 한다.

Build Site 클릭.
<br>
<br>

<img src="https://user-images.githubusercontent.com/34260967/148127313-c618d9b4-27c2-4cb2-81e1-b04e7c47f510.png" width="100%">

Site가 빌드되고 배포되기 시작했다. Gatsby Cloud에서 제공하는 도메인으로 접속하여 확인해보자 (2분정도 걸림)!!

<br><br>

