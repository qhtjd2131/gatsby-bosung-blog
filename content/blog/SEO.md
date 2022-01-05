---
title: "Blog SEO 하기"
date: "2022-01-05T17:11:07"
description: "SEO 작업하고 Google에 등록하기"
---

# SEO 작업하고 Google에 등록하기

---

<br>

## SEO란?
SEO 는 Search Engine Optimization의 약자로, 검색 엔진으로부터 웹사이트나 웹페이지에 대한 웹사이트 트래픽의 품질과 양을 개선하는 과정이다. 웹 페이지 검색엔진이 자료를 수집하고 순위를 매기는 방식에 맞게 웹 페이지를 구성해서 검색 결과의 상위에 나올 수 있게 한다.<br>
wikipedia : https://ko.wikipedia.org/wiki/%EA%B2%80%EC%83%89_%EC%97%94%EC%A7%84_%EC%B5%9C%EC%A0%81%ED%99%94


## SEO 작업하기(sitemap, rss)

웹 크롤링 봇들은 사이트를 돌면서 사이트 정보를 크롤링하여 검색엔진에 활용한다. 이 때 웹 크롤링 봇이 나의 블로그를 찾아오게 하려면 어떻게해야할까? 

우선 `gatsby-plugin-sitemap`를 설치하여 `xml`형식의 sitemap 파일을 생성해야한다. sitemap은 웹마스터가 크롤링 통해 이용 가능한 웹사이트 상의 URL에 관해 검색 엔진에 정보를 제공할 수 있게 하는 프로토콜이다. 

그리고 `gatsby-plugin-feed`를 설치하여 `xml`형식의 rss 파일을 생성하는것도 SEO작업 포함된다. RSS 는 RSS주소를 등록만하면 직접 방문하지않아도 자동으로 업데이트되서 새로운 컨텐츠를 확인할수 있는 기술을 뜻한다. Blog와 같이 새로운 글이 올라오는 경우 제공해야한다.

```
npm install --save gatsby-plugin-sitemap gatsby-plugin-feed
```

gatsby-plugin-sitemap : https://www.gatsbyjs.com/plugins/gatsby-plugin-sitemap/ 

플러그인을 설치하고 `gatsby-config.js`의 plugin에 적용하면 끝입니다.

잘 적용되었는지 확인하기 위해서는 `gatsby build` 명령어를 통해 프로젝트를 빌드한 후 아래의 링크로 확인할 수 있습니다. (배포된 url에서도 경로는 같습니다.)
*경로는 플러그인 버전마다 다를 수 있으니 공식문서를 확인해야한다.

```
localhost:8000/sitemap/sitemap-index.xml     //sitemap 
localhost:8000/rss.xml               //rss
```

## robots.txt

*gatsby의 gatsby-starter-blog 플러그인을 기준으로 작성된 글입니다.

`./static/robots.txt` 파일이 존재한다.`robots.txt`는 웹 크롤링 봇이 해당 사이트에서 어느정도까지 접근을 할 수 있느냐를 정의하는 파일이다. 템플릿을 사용하지 않는다면 `npm install --save gatsby-plugin-robots-txt` 을 통해 생성하고 관리할 수 있다.

`robots.txt`를 다음과 같이 작성했다.
```
User-agent: *
Allow : /

User-agent: Googlebot-image
Disallow : /

Sitemap: https://gatsbybosungblogmain.gatsbyjs.io/sitemap/sitemap-index.xml
```
robots.txt 설정방법 참고 : https://extrememanual.net/10728

- User-agent : 웹 크롤링 봇의 명칭 (Google은 Googlebot, Naver는 Yeti)
- Allow : 허용되는 경로. '/'로 설정시 모든 경로 허용
- Disallow : Allow의 반대
- Sitemap : 내 사이트의 sitemap url


## Google Search Console에 등록

구글 검색창에 `site:내사이트주소`를 쳐보자.

<img src="https://user-images.githubusercontent.com/34260967/148152228-30c270b0-81ee-4396-ba27-292b1d097923.png" width="100%">

Google 검색엔진이 나의 사이트에 대한 정보가 없기때문에 위와 같은 화면을 띄워준다. 그리고 Google Search Console을 사용하라고 알려준다. 해당 글을 클릭하여 접속해보자.

![image](https://user-images.githubusercontent.com/34260967/148152639-bcce1036-3e43-40fe-b25f-7dd676c8771e.png)

속성 유형을 선택한다. 속성유형에는 도메인, URL 접두어 두가지가 있다.
도메인 유형은 직접 구매한 도메인일 때 사용한다.
url 접두어 유형은 github이나 netlify, gatsby cloud등 과같이 도메인이 없을때, 사용한다.
<br>
참고 : https://dailyco.tech/share/gatsby-blog-seo/#google-search-console-%EC%82%AC%EC%9D%B4%ED%8A%B8-%EB%93%B1%EB%A1%9D
<br>
이 블로그는 Gatsby Cloud를 통해 링크를 받았으므로 URL 접두어 유형을 사용하면 된다. 해당 도메인을 입력하고 나면 소유권을 확인하라고 한다. 소유권을 확인하는 방법은 여러가지인데 가장 권장하는 방법은 HTML파일로 소유권을 확인하는 방법이라고 적혀있다.

![image](https://user-images.githubusercontent.com/34260967/148153269-f4cac0dc-8833-45f8-bdbc-3eaf4dac9fd5.png)

아마 여기서 하라는대로 한다면 소유권확인에 문제가 있을것이다. 왜냐하면 디렉토리에 저장한 `.html` 파일은 Gatsby Cloud에서 배포하는 시점에서 읽을 수 없기 때문이다. 그렇기 때문에 빌드시점에 명령어를 통해 복사본을 만들어 배치시켜야 한다.<br>
참고: https://dailyco.tech/share/gatsby-blog-seo/#url-%EC%A0%91%EB%91%90%EC%96%B4%EB%A5%BC-%ED%86%B5%ED%95%B4-%EB%93%B1%EB%A1%9D%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95

<br>

![image](https://user-images.githubusercontent.com/34260967/148153630-fa54e5f7-fa50-4d68-96f7-7d6c7e5e0581.png)

위 문제를 해결하는것이 상당히 번거로워 보였다. 그래서 HTML 태그로 확인하는 방법을 사용했다. 구글에서 제공하는 태그는 다음과 같은 모양을 가진다.
```
<meta name="google-site-verification" content="abcdefghijk_abcdefznkAn4JJ5zB-k_uz" />
```

이를 그대로 활용하기보단 이 프로젝트에서는 `gatsby-plugin-react-helmet`이라는 플러그인을 사용하고 있기 때문에 `gatsby-plugin-react-helmet`을 통하여 태그를 추가할 수 있다.<br>

gatsby-plugin-react-helmet: https://www.gatsbyjs.com/plugins/gatsby-plugin-react-helmet/
<br>

`<Helmet>`을 사용하고있는 `seo.tsx`파일을 보자.

```javascript
const Seo = ({ description='', lang='en', meta=[], title }: SEOProps) => {
  
  // ..생략

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : undefined}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
      ].concat(meta)}
    />
  )
}
```

`<Helmet>` 의 property로 meta가 있는것을 볼 수 있다. 여기서 정의한 meta에 추가하면 소유권을 확인 할 수있다. 구글에서 제공한 meta 태그를 아래와 같이 바꿔서 `<Helmet>`의 meta property에 넣어주자.

```javascript
{
    name : `google-site-verification`,
    content: `abcdefghijk_abcdefznkAn4JJ5zB-k_uz`
}
```

<img src="https://user-images.githubusercontent.com/34260967/148154561-531d8109-6e37-4ddb-9034-7308dd6f2dc6.png" width="100%">


정상적으로 소유권이 확인되었다면, 위와 같이 Google Search Console 에서 sitemap과 rss의 주소를 추가해주면 된다.
