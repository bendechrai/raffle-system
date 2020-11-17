import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Welcome" />
    <h1>Welcome to Rafflist</h1>
    <p className="lead">Rafflist lets you sell raffle tickets online.</p>
    <p>For more information, or to start selling tickets yourself, <a href="https://bendechrai.com/contact">contact Ben Dechrai</a>.</p>
  </Layout>
)

export default IndexPage
