---
title: "Create a blog with gatsby! Step 3."
date: "2022-01-03T17:16:00"
description: "pages, components의 js파일을 tsx파일로 변환하기"
---

## pages, components의 js파일을 tsx파일로 변환하기

---

<br>

### index.js 를 index.tsx로 변환

<br>

이제 핵심 컴포넌트와 페이지를 `.tsx` 로 변환해보자.
우선 핵심 페이지인 `index.js`를 `index.tsx`로 변환한다.

**index.js code**
```javascript
const BlogIndex = ({ data, location }) => {
    //... 생략
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
```

`BlogIndex` 컴포넌트의 Props에는 `data`와 `location`이 있다. 

`data`는 `index.js`의 가장 아랫부분에 정의된 `pageQuery`의 형식을 가진 데이터다. 데이터의 근원은 `gatsby-config.js`에 정의된 `siteMetadata`와 content/blog에 저장된 `.md` 파일의 정보들이다. 자세한 정보는 Graphql을 참고하자. 
link : https://www.gatsbyjs.com/docs/tutorial/part-4/

*markdown 문서의 가장 위쪽에 있는 메타 데이터를 frontmatter라고 한다.


`location` 은 페이지의 PATH나 호스트, 쿼리스트링 등 해당 컴포넌트의 페이지 정보를 가지고 있다. 아래는 `index.js`의 `location`을 콘솔로 출력한것이다.

![image](https://user-images.githubusercontent.com/34260967/147906951-e22d0c22-1ad2-4216-8ca9-40ae576f2746.png)

위와같이 페이지 정보는 일관된 형태를 가져야한다. 보통 정해진 형식이 있고 프라이빗하지 않은 Props는 TypeScript 에서 미리 Type을 정해놓고 있다. TypeScript는 따로 import할 필요 없이 그냥 Location Type을 가져다 쓰면 된다.

![image](https://user-images.githubusercontent.com/34260967/147906711-cc62a8a0-f071-4fac-b7e3-27ebb5193f2c.png)

<br><br>


**interface**
위의 정보를 토대로 구현한 `interface`이다. 

```javascript
interface BlogIndexProps {
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    }
    allMarkdownRemark: {
      nodes: Inode[]
    }
  }
  location: Location
}

interface Inode {
  excerpt: string
  fields: {
    slug: string
  }
  frontmatter: {
    date: string
    title: string
    description: string
  }
}
```
<br><br>

**index.tsx code**
````javascript
const BlogIndex = ({ data, location }: BlogIndexProps => {
    //... 생략
}

//.. 생략. 이하 동일.
````

<!-- ### 404.js 를 404.tsx로 변환

index.js와 동일한 Props를 가지기 때문에 변환과정은 똑같다.

**404.js code**
```javascript
const NotFoundPage = ({ data, location }) => {
    //..생략
}
export default NotFoundPage
export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
```

**404.tsx code and Interface**
```javascript
interface NotFoundPageProps {
  data : {
    site : {
      siteMetadata :{
        title : string,
      }
    }
  },
  location : Location
}
const NotFoundPage = ({ data, location }:NotFoundPageProps) => {
    //..생략
}
``` -->

### seo.js 를 seo.tsx로 변환

seo.js는 Sascha Metz의 블로그를 참고하였다.
https://dev.to/smetzdev/how-to-translate-the-gatsby-seo-component-to-typescript-15jl

**seo.js code**
```javascript
const Seo = ({ description, lang, meta, title }) => {
  //..생략
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
export default Seo

Seo.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}
```

seo.js 는 PropTypes 라이브러리를 사용하여 타입을 규정하고 있었다. 이를 TypeScript로 대체해보자. 우선 가장 하단에 있는 `Seo.defaultProps`와 `Seo.propTypes`를 제거한다.

`Seo.defaultProps`는 값이 없을때, default로 초기값을 주는 기능이다. 다음과 같이 대체한다.

```javascript
const Seo = ({ description='', lang='en', meta=[], title }) => {
  //..생략
  return(
    //..생략
  )
}
```

`Seo.propTypes`가 Type을 정의하고 있다. 이는 다음과 같이 대체한다.
```javascript
interface SEOProps {
  description?: string,
  lang?: string,
  meta?: ConcatArray<NameMeta | PropertyMeta>
  title: string
}
interface NameMeta {
  name : string,
  content : string,
}
interface PropertyMeta {
  property : string,
  content : string,
}

const Seo = ({ description='', lang='en', meta=[], title }: SEOProps) => {
  //..생략
  return(
    //..생략
  )
}
```

<br><br>

처음에 propTypes에서 정의된 Type과 똑같이 정의하면된다. 하지만 `meta` 필드의 데이터는 `PropTypes.arrayOf(PropTypes.object)` 로 정의되어 있었지만, TypeScript는 더 자세한 타입을 정의하길 원해서 에러를 띄운다.


<details>
<summary><b>propTypes Code Open</b></summary>   
<p>

```javascript
Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}
```
</p>
</details>

<br>

`meta`에 정의되는 데이터를 보면 아래와 같이 `<Helmet>`의 props 이다.
```javascript
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
```

<br>

위와 같이 meta에 들어가게되는 `object`는 두가지로 나뉜다.
```javascript
{ 
  name
  content
}
```
```javascript
{
  property
  content
}
```
<br><br>

따라서 `meta`의 Type은 다음과 같이 정의한다.

<b>Typescript Interface Code</b>   

```javascript
interface SEOProps {
  description?: string,
  lang?: string,
  meta?: ConcatArray<NameMeta | PropertyMeta>
  title: string
}
interface NameMeta {
  name : string,
  content : string,
}
interface PropertyMeta {
  property : string,
  content : string,
}
```


### layout.js 를 layout.tsx로 변환

`layout.js`도 위에서 설명한것과 다를게 없다. 한가지 특별한 것은 하위 컴포넌트 노드를 `children`을 props로 받는것인데, 이는 `React.ReactNode`로 React에서 Type을 제공해주고 있다.
<br>

**layout.tsx code**
```javascript
interface ILayoutProps{
  location : Location,
  title : string,
  children : React.ReactNode,
}

const Layout = ({ location, title, children } : ILayoutProps) => {
  //..생략
}
```

### bio.js 를 bio.tsx로 변환

`bio.js`에는 props가 없다. 따라서 props의 타입이 아닌 Graphql로 받은 데이터의 타입을 정의해주자.

**bio.tsx code**
```javascript
interface ISocial {
  github : string
  twitter? : string
  gmail? : string
  facebook? : string
}

interface IAuthor {
  name : string,
  summary : string,
}

const Bio = () => {
  const data : any = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            github
          }
        }
      }
    }
  `)
  const author : IAuthor= data.site.siteMetadata?.author
  const social : ISocial = data.site.siteMetadata?.social
  return(
    //..생략
  )
```


