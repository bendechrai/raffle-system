/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import "./layout.css"

const Layout = ({ children }) => {
  return (
    <>
      <div className="mainWrap">
        <main><div className="mainInner">
          {children}
        </div></main>
        <footer>
          <p>Rafflist is a Lunar Productions creation ❤️ © {new Date().getFullYear()}, Lunar Productions Pty Ltd.</p>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
