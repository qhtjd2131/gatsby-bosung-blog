import * as React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

//style
const MainHeader = styled.h1``

//interface
interface ILayoutProps {
  location: Location
  title: string
  children: React.ReactNode
}

const Layout = ({ location, title, children }: ILayoutProps) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  let header
  if (isRootPath) {
    header = (
      <MainHeader className="main-heading">
        <Link to="/">{title}</Link>
      </MainHeader>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="test">
      <div className="global-wrapper" data-is-root-path={isRootPath}>
        <header className="global-header">{header}</header>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </div>
    </div>
  )
}

export default Layout
