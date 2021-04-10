/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import "./layout.css"
import { Link } from "gatsby"

const Layout = ({ children }) => {
  return (
    <>
      {/* <!-- This example requires Tailwind CSS v2.0+ --> */}
      <div>
        <nav className="bg-brand">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link to="/">
                    <img
                      className="h-8"
                      src="/images/rafflist.svg"
                      alt="Rafflist"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="bg-white pb-20">
          <div className="max-w-7xl mx-auto py-0 sm:py-6 xl:py-12 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>

        <footer className="border-t-4 border-dashed border-white py-20">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <p>
              Rafflist is a Lunar Productions creation{" "}
              <span role="img" aria-label="Heart">
                ❤️
              </span>{" "}
              © {new Date().getFullYear()}, Lunar Productions Pty Ltd.
            </p>
            <p>
              We take no fee for this service, and your payments go directly to
              the raffle organiser. Their credit card processing provider,
              Stripe, deducts a fee from your payment. Rafflist stores no
              information about you. The raffle organiser will draw raffle
              tickets based on the purchase data held by Stripe.
            </p>
            <p>
              For more information, or to start selling tickets yourself,{" "}
              <a href="https://bendechrai.com/contact">contact Ben Dechrai</a>.
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
