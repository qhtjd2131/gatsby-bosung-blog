---
title: "Create a blog with gatsby! Step 4."
date: "2022-01-04T17:23:00"
description: "MarkdownFile은 어떻게 읽혀질까 / 블로그에 포스트 올리기(content 추가하기)"
tag : "gatsby"
---

# MarkdownFile은 어떻게 읽혀질까 / 블로그에 포스트 올리기(content 추가하기)

---

<br>

## Markdown File는 어떻게 읽혀질까?

`./content/blog/`에는 블로그 포스트 md file이 있다. 한번 확인해보자.
```
---
title: "Create a blog with gatsby! Step 3."
date: "2022-01-03T17:16:00"
description: "pages, components의 js파일을 tsx파일로 변환하기"
---
```

md file의 최상위 부분에 위와 같이 meta data가 정의되어있다. 해당 meta data 는 블로그 메인페이지에 아래와 같이 적용된다.<br> 
![image](https://user-images.githubusercontent.com/34260967/148070786-8f8ed793-c044-4856-8a11-70910ca354dd.png)

우선, 해당 데이터를 사용하여 화면을 구성하는 `index.tsx` 파일을 보자. 해당 파일에서는 map 함수를 사용하여, 블로그의 포스트의 요약내용을 화면에 랜더링한다.



<details>
<summary>index.tsx 에서 포스트 요약내용 랜더링 하는 코드</summary>   
<p>

```javascript
{posts.map(post => {
    const title = post.frontmatter.title || post.fields.slug

    return (
    <li key={post.fields.slug}>
        <article
        className="post-list-item"
        itemScope
        itemType="http://schema.org/Article"
        >
        <header>
            <h2>
            <Link to={post.fields.slug} itemProp="url">
                <span itemProp="headline">{title}</span>
            </Link>
            </h2>
            <small>{post.frontmatter.date}</small>
        </header>
        <section>
            <p
            dangerouslySetInnerHTML={{
                __html: post.frontmatter.description || post.excerpt,
            }}
            itemProp="description"
            />
        </section>
        </article>
    </li>
    )
})}
```
</p>
</details>
<br>

코드를 살펴보면, md file의 모든 요약정보를 `post` 라는 변수에서 쓰고있다. 이 변수의 정의는 다음과 같다
```javascript
const posts: Inode[] = data.allMarkdownRemark.nodes
```
여기서 `data`는 Graphql 쿼리로 리턴받은 값이다. 여기서 사용되는 쿼리는 다음과 같다(`index.tsx` 하단에 정의되어 있음).

```javascript
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
```

*`frontmatter` 부분이 md file의 최상위에 위치한 meta data 이다. 
*`node` field는 모든 md file의 정보를 가지는 Array이다.

설명하자면 각각의 md file이 어떠한 방법으로 read 된 다음 `allMarkdownRemark{ node }`에 저장되어서 `index.tsx`에서 데이터로 사용하는것이다. 여기서 `allMarkdownRemark`는 `gatsby-transformer-remark`라는 플러그인으로 인해 추가된 필드이다. 이 플러그인은 md file을 파싱하여 graphql로 사용할 수 있도록 해준다. 

공식문서에 따르면 `gatsby-transformer-remark`는 다음과 같은 흐름을 가진다.
1. 각각의 md 파일이 MarkdownRemark 유형의 노드로 파싱되어진다.
2. md 파일의 frontmatter 필드가 추론을 통해 자동으로 Graphql 필드로 변환된다.

`gatsby-transformer-remark` : https://www.gatsbyjs.com/plugins/gatsby-transformer-remark/

**그렇다면 플러그인은 md파일의 위치를 어떻게 아는것인가?**

사용자의 프로젝트 디렉토리에 있는 파일들을 gatsby plugin이 사용할 수 있게 하려면 `gatsby-source-filesystem` 플러그인을 사용해야한다. 플러그인의 옵션 또는 설정을 컨트롤 하려면 `gatsby-config.js`에 추가하고 수정해야한다. `gatsby-config.js`를 살펴보자.
<br>

**gatsby-config.js plugin code**
```javascript
plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-typescript`,
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
    ...
]
```

`gatsby-source-filesystem`의 path에 `/content/blog`가 있다. 이 디렉토리가 우리가 md 파일을 저장하는 곳이다. 이 플러그인으로 해당 디렉토리를 정의하여 md 파일을 읽는 플러그인이 사용할 수 있게된것이다. 

## 블로그에 포스트 올리기(content 추가하기)

방법은 간단하다. 이미 자동으로 MD FILE을 파싱하게 구성되어있다. **따라서 `content/blog/` 디렉토리 하위에 폴더나 md file을 생성하고 구성하면 된다.** 해당 폴더와 디렉토리가 slug(link path)가 되기에 중복되는 이름이 있으면 가장 먼저 읽은 값만 적용된다. 

블로그 포스트를 md파일로 제작완료했다면, 최상위 부분에 `frontmatter`를 기재해주어야한다. 이블로그에서 쓰이는 `frontmatter`는 다음과 같다.
```
---
title: "Create a blog with gatsby! Step 3."
date: "2022-01-03T17:16:00"
description: "pages, components의 js파일을 tsx파일로 변환하기"
---

..이하 블로그 포스트의 내용
```

이때의 `frontmatter data`가 main page에서 블로그를 간략하게 보여주는 리스트에 사용된다.

해당블로그의 `content/blog/` 의 하위 디렉토릭 구조는 다음과 같다.<br>
![image](https://user-images.githubusercontent.com/34260967/148096654-99f6d033-a8c4-4c83-9576-ca8f71ef993e.png)
<br>

*여기서 `GATSBY_STEP_1.md`의 Link는 `http://localhost:8000/step3/GATSBY_STEP_3/` 이다.



