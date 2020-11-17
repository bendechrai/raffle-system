/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import Image from '../components/image'

import "./layout.css"
import { Link } from "gatsby"

const Layout = ({ children }) => {
  return (
    <>
      <div className="mainWrap">
        <header>
          <Link to="/">
            <Image />
          </Link>
        </header>
        <main><div className="mainInner">
          {children}
        </div></main>
        <footer>
          <p>Rafflist is a Lunar Productions creation <span role="img" aria-label="Heart">❤️</span> © {new Date().getFullYear()}, Lunar Productions Pty Ltd.</p>
          <p>
            We take no fee for this service, and your payments go directly to the raffle organiser.
            Their credit card processing provider, Stripe, deducts a fee from your payment.
            Rafflist stores no information about you.
            The raffle organiser will draw raffle tickets based on the purchase data held by Stripe.
          </p>
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
