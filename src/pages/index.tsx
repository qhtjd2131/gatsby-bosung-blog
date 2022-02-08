import * as React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import "../style.css"
import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import GlobalStyle from "../GlobalStyle"

//style
export const PostItemsWrapper = styled.article`
  padding: 0px 20px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  &:hover {
    background-color: var(--color-postitem-hover);
  }
`

export const DescriptionWrapper = styled.section`
  color: black;
`



//interface
export interface ILinkProps {
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
}

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
    tag: string
    description: string
  }
}

const BlogIndex = ({ data, location }: BlogIndexProps) => {
  const siteTitle: string = data.site.siteMetadata?.title || `Title`
  const posts: Inode[] = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <>
        <GlobalStyle />
        <Layout location={location} title={siteTitle}>
          <Seo title="All posts" />
          <Bio />
          <p>
            No blog posts found. Add markdown posts to "content/blog" (or the
            directory you specified for the "gatsby-source-filesystem" plugin in
            gatsby-config.js).
          </p>
          <p>
            블로그 포스트가 없습니다. "content/blog" 디렉토리에 MarkDown
            포스트를 추가하거나 "gatsby-source-filesystem" 플러그인을
            적용하세요.
          </p>
        </Layout>
      </>
    )
  }

  return (
    <>
      <GlobalStyle />
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <ol style={{ listStyle: `none` }}>
          {posts.map((post: any) => {
            const title = post.frontmatter.title || post.fields.slug

            return (
              <li key={post.fields.slug} className="post-item">
                <PostItemsWrapper
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <Link to={post.fields.slug} itemProp="url">
                    <header>
                      <h2>
                        <span itemProp="headline">{title}</span>
                      </h2>
                      <small>{post.frontmatter.date}</small>
                    </header>
                    <DescriptionWrapper>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: post.frontmatter.description || post.excerpt,
                        }}
                        itemProp="description"
                      />
                    </DescriptionWrapper>
                  </Link>
                </PostItemsWrapper>
              </li>
            )
          })}
        </ol>
        {/* tag를 기준으로 포스트 분류하여 link는 예시 */}
        {/* <ol style={{ listStyle: `none` }}>
          <li className="post-item">
            <Link
              to={"/no-cra"}
              state={{
                posts: posts.filter(a => a.frontmatter.tag === "no-cra"),
              }}
            >
              <p>create-react-app 없이 app 구현하기</p>
            </Link>
          </li>
          <li className="post-item">
            <Link
              to={"/gatsby-post"}
              state={{
                posts: posts.filter(a => a.frontmatter.tag === "gatsby"),
              }}
            >
              <p>gatsby 이용하여 블로그 제작 및 배포 하기</p>
            </Link>
          </li>
          <li className="post-item">
            <Link to={"/javascript"}>
              <p> javascript (구현 예정) </p>
            </Link>
          </li>
          <li className="post-item" >
            <Link to={"/react"}>
              <p>react (구현 예정) </p>
            </Link>
          </li>
        </ol> */}
      </Layout>
    </>
  )
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
          tag
        }
      }
    }
  }
`
