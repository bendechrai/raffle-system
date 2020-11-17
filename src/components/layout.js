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
        <p>Rafflist is a Lunar Productions creation <span role="img" aria-label="Heart">❤️</span> © {new Date().getFullYear()}, Lunar Productions Pty Ltd.</p>
        <p>We take no fee for this service, and your payments go directly to Zonta Club of Melbourne's South East. Their credit card processing provider might deduct a fee from your payment.</p>
        <p>For more information, or to start selling tickets yourself, <a href="https://bendechrai.com/contact">contact Ben Dechrai</a>.</p>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
