// import styled from "styled-components"
// import React from "react"
// import { DescriptionWrapper, PostItemsWrapper } from "."
// import GlobalStyle from "../GlobalStyle"
// import { ILinkProps } from "."
// import { Link, graphql } from "gatsby"
// import Layout from "../components/layout"
// import Bio from "../components/bio"

// //styled components

// const TagTitle = styled.span`
//   font-size: 2rem;
// `
// const TagBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   /* color : var(--color-primary); */
//   color: gray;
// `

// const Tag = styled.span`
//   font-weight: 500;
//   font-size: 1.5rem;
// `

// interface ILocation {
//   location: any
// }

// const NoCra = ({ location }: ILocation) => {
//   // const tmp_posts = data.allMarkdownRemark.nodes;
//   const posts = location.state.posts

//   const getTagTitle = (title: string) => {
//     return (
//       <TagBox>
//         <TagTitle> {title} </TagTitle>
//       </TagBox>
//     )
//   }
//   return (
//     <>
//       <Layout location={location} title="bosung's blog">
//       {/* <Bio /> */}
//         {getTagTitle("no-cra")}
//         <ol style={{ listStyle: `none` }}>
//           {posts.map((post: any) => {
//             const title = post.frontmatter.title || post.fields.slug

//             return (
//               <li key={post.fields.slug} className="post-item">
//                 <PostItemsWrapper
//                   className="post-list-item"
//                   itemScope
//                   itemType="http://schema.org/Article"
//                 >
//                   <Link to={post.fields.slug} itemProp="url">
//                     <header>
//                       <h2>
//                         <span itemProp="headline">{title}</span>
//                       </h2>
//                       <small>{post.frontmatter.date}</small>
//                     </header>
//                     <DescriptionWrapper>
//                       <p
//                         dangerouslySetInnerHTML={{
//                           __html: post.frontmatter.description || post.excerpt,
//                         }}
//                         itemProp="description"
//                       />
//                     </DescriptionWrapper>
//                   </Link>
//                 </PostItemsWrapper>
//               </li>
//             )
//           })}
//         </ol>
//       </Layout>
//     </>
//   )
// }
// export default NoCra

// // export const pageQuery = graphql`
// //   query {
// //     site {
// //       siteMetadata {
// //         title
// //       }
// //     }
// //     allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
// //       nodes {
// //         excerpt
// //         fields {
// //           slug
// //         }
// //         frontmatter {
// //           date(formatString: "MMMM DD, YYYY")
// //           title
// //           description
// //         }
// //       }
// //     }
// //   }
// // `
