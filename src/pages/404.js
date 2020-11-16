import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>Welcome to Rafflist</h1>
    <p className="lead">Rafflist lets you sell raffle tickets online.</p>
    <p>The page or raffle you are looking for could not be found. We're very sorry.</p>
    <p>For more information, or to start selling tickets yourself, <a href="https://bendechrai.com/contact">contact Ben Dechrai</a>.</p>
  </Layout>
)

export default NotFoundPage
