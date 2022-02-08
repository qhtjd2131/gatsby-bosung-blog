---
title: "Create a blog with gatsby! Step 2."
date: "2022-01-01T17:15:00"
description: "gatsby-config.js 분석 후 커스텀하기, 플러그인 설치 및 적용하기"
tag : "gatsby"
---

## gatsby-config.js 분석 후 커스텀하기, 플러그인 설치 및 적용하기
---

### gatsby-config.js 분석

생성된 Gatsby 프로젝트 디렉토리에는 `gatsby-config.js` 파일이 존재한다. 이 파일에는 gatsby website의 metadata가 정의되어 있고, 다양한 gatsby의 플러그인과 옵션들이 정의되어 있다.

```javascript
module.exports = {
  siteMetadata: {
    title: `Gatsby Starter Blog`,
    author: {
      name: `Kyle Mathews`,
      summary: `who lives and works in San Francisco building useful things.`,
    },
    description: `A starter blog demonstrating what Gatsby can do.`,
    siteUrl: `https://gatsbystarterblogsource.gatsbyjs.io/`,
    social: {
      twitter: `kylemathews`,
    },
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: `ADD YOUR TRACKING ID HERE`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Gatsby Starter Blog RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}

```

- siteMetaData
`siteMetaData` 에 정의된 metaData는 빌드 시에 graphql으로 컴포넌트에 전달되는 것으로 보인다. 따라서 이 부분을 수정하게 된다면, 컴포넌트에 반영이 된다. 

- plugins
    >gatsby-plugin-image
    높은 성능의 이미지랜더링을 위한 플러그인.
    static image 는 `gatsby-plugin-sharp`, `gatsby-sourcefile-system`
    dynamic image 는 `gatsby-plugin-sharp`, `gatsby-transformer-sharp` 와 함께 쓰인다.
      
    link: https://www.gatsbyjs.com/plugins/gatsby-plugin-image/

    >gatsby-plugin-sharp
    빌드 시 파일 형식에 따라 효율적으로 정적 이미지를 압축 및 제공 한다.(수동 설정 필요) 
        
    link : https://www.gatsbyjs.com/plugins/gatsby-plugin-sharp/
    
    >gatsby-transformer-sharp
    다양한 방법의 동적 이미지 처리를 위해 Graphql 필드를 제공하는 ImageSharp 노드를 생성한다.
        
    link : https://www.gatsbyjs.com/plugins/gatsby-transformer-sharp/

    >gatsby-source-filesystem
    로컬 파일을 gatsby에서 응용할 수 있게 지원해준다.
    JSON파일, MarkDown 파일 등을 HTML 노드로 변경할 때 필요하다.
        
    link : https://www.gatsbyjs.com/plugins/gatsby-source-filesystem/

    >gatsby-transformer-remark
    MarkDown 파일을 처리하기 위한 플러그인
    remark API 를 사용하여 MarkDown 파일 파싱
        
    link : https://www.gatsbyjs.com/plugins/gatsby-transformer-remark/

    - gatsby-remark-images

      빌드에 사용할 수 있도록 MarkDown의 이미지 처리
            
      link : https://www.gatsbyjs.com/plugins/gatsby-remark-images/

    - gatsby-remark-responsive-iframe

      가로 세로 비율이 고정된 iframe object 처리(youtube iframe)
            
      link : https://www.gatsbyjs.com/plugins/gatsby-remark-responsive-iframe/
    
  >gatsby-plugin-feed
  RSS 피드 생성 플러그인
  검색엔진, 구독 기능에 RSS 피드가 사용됨.
      
  link : https://www.gatsbyjs.com/plugins/gatsby-plugin-feed/

  >gatsby-plugin-manifest
  모바일 브라우저 지원에 필요한 manifest 옵션 설정 플러그인
  모바일 기기에서의 다양한 기능 지원
      
  link : https://www.gatsbyjs.com/plugins/gatsby-plugin-manifest/

  >gatsby-plugin-react-helmet
  웹사이트 헤더 컴포넌트 제공
  이 플러그인을 사용하면 제목, 메타 특성 등 속성이 Gatsby가 작성하는 정적 HTML 페이지에 추가
  검색엔진최적화(SEO) 에서도 사용 됨.
    
  link : https://www.gatsbyjs.com/plugins/gatsby-plugin-react-helmet/
    

### gatsby-config.js 커스텀

**메타데이터 변경**
지금 당장은 `siteMetaData` 정도만 커스텀 하고, 후에 필요한 플러그인들을 설치하고 옵션을 변경하면서 사용하면 된다.

siteMetaData를 다음과 같이 변경했다.
```javascript
siteMetadata: {
    title: `Gatsby Bosung's Blog`,
    author: {
      name: `Choi Bosung`,
      summary: `who lives Korea`,
    },
    description: `create blog with gatsby!`,
    siteUrl: `배포된 사이트 url`,
    social: {
      github: `qhtjd2131`,
    },
  }
```

`siteUrl`은 배포하고 배정된 사이트 url을 적으면 된다.
`social` 부분을 보면 `twitter` 필드가 삭제되고 github 필드를 새로 만들었다. 이는 graphql을 사용하여 전달되는 데이터이다. 따라서 다음과 같이 `twitter`가 사용되는 부분을 제거하거나 수정해야한다.

1. `gatsby-node.js`에서 필드와 타입을 변경해주어야 한다.
2.  그리고 seo.js 컴포넌트에서 검색엔진최적화 부분에서도 `twitter` 필드가 쓰이는데, 이제 사용하지 않으므로 제거하면 된다. 나중에 검색엔진최적화 부분에서 github를 사용할 수 있으니 필드를 twitter에서 github로 변경한다.
3. `bio.js` 에서 twitter link 부분을 github link로 변경하고, Graphql query의 필드를 twitter에서 github로 변경한다.



### 사용할 플러그인 설치 및 적용
이 블로그는 TypeScript를 적용하고 Styled-Components로 스타일링할 계획이다. 따라서 이에 맞는 플러그인을 설치하고 적용했다.

**typescript plugin 설치 및 적용**
공식문서에 따르면 `gatsby-plugin-typescript`는 이미 Gatsby에 포함되어 있다고 한다. 따로 설치할 필요는 없지만, 알아는 두자.
```
npm install gatsby-plugin-typescript
npm install --save-dev typescript
```

설치가 완료되면 아래의 명령어를 통해 tsconfig.json 파일을 생성하여, typescript 옵션을 설정해야한다.
```
tsc --init
```
tsconfig 옵션 알아보기 :  https://typescript-kr.github.io/pages/compiler-options.html


`gatsby-plugin-typescript` 처럼 `@babel/preset-typescript` 도 이미 Gatsby 내부에 포함되어 있다. 혹시 babel 설정을 변경하고 싶다면, 아래와 같이 플러그인에서 옵션을 주면, `@babel/preset-typescript config`에 자동으로 오버라이드 되어 적용된다.

```javascript
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
  ],
}
```

Gatsby는 React를 사용한다. React에서 TypeScript를 제대로 사용하기 위해서는 `@types/react @types/react-dom @types/node` 와 같은 모듈이 있어야 한다. 나의 경우에는 `@type/react-dom` 을 제외하고는 이미 설치되어 있었다. `node-modules/@types`에서 한번 확인하고 없는 모듈을 설치하자.
```
npm install --save-dev @types/react @types/react-dom @types/node
```

마지막으로 gatsby-config.js 에 plugin을 적용하면 된다.

```javascript
//gatsby-config.js
module.exports = {
  plugins: [`gatsby-plugin-typescript`],
}
```
link : https://www.gatsbyjs.com/plugins/gatsby-plugin-typescript/

**styled-components plugin 설치 및 적용**

Gatsby에서 typescript를 적용하고 react 컴포넌트에 styled-components를 적용하기 위해서는 아래와 같은 플러그인 및 모듈이 필요하다. 

gatsby : `gatsby-plugin-styled-components`
typescript : `@types/styled-components`
react : `styled-components`
babel : `babel-plugin-styled-components`(서버 사이드 랜더링(SSR) 환경에서, 스타일 최적화, 더 나은 디버깅을 지원)


```
npm install gatsby-plugin-styled-components styled-components babel-plugin-styled-components
npm install --save-dev @types/styled-components //typescript 적용
```

그리고 플러그인을 적용하면 끝이다.

```javascript
//gatsby-config.js
module.exports = {
  plugins: [`gatsby-plugin-styled-components`],
}
```

link : https://www.gatsbyjs.com/docs/how-to/styling/styled-components/


