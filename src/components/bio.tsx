/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

interface ISocial {
  github: string
  twitter?: string
  gmail?: string
  facebook?: string
}

interface IAuthor {
  name: string
  summary: string
}

const Bio = () => {
  const data: any = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            github
            gmail
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author: IAuthor = data.site.siteMetadata?.author
  const social: ISocial = data.site.siteMetadata?.social

  return (
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../images/bosung_background_hongkong.jpg"
        width={100}
        height={100}
        quality={95}
        alt="Profile picture"
      />
      {author?.name && (
        <p>
          Written by <strong>{author.name}</strong> {author?.summary || null}
          {` `}
          <br></br>
          github: 
          <a href={`https://github.com/${social?.github || ``}`}> https://github.com/{social?.github || ''}</a>
          <br />
          {`Email: ${social?.gmail || ``}@gmail.com`}
        </p>
      )}
    </div>
  )
}

export default Bio
