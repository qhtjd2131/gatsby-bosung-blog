/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

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
  const { site } : any = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            social {
              github
              gmail
            }
          }
        }
      }
    `
  )

  const metaDescription : string = description || site.siteMetadata.description
  const defaultTitle : string = site.siteMetadata?.title

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
