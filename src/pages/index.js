import { Link } from "gatsby"
import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Welcome" />
    <h1>Welcome to Rafflist</h1>
    <p className="lead">Rafflist lets you sell raffle tickets online.</p>
    <h2>Current Live Raffles</h2>
    <div className="raffles">
      <Link to="/zonta-mse-40">
        <div className="raffle">
          <h3>Zonta Club of Melbourne's South East 40th Birthday Raffle</h3>
          <p>
            Proceeds from the raffle will support community-based Mental Health
            First Aid training.
          </p>
          <div class="metadata">
            <p>
              <strong>Starts:</strong> 9am AEST on 5th April, 2021
            </p>
            <p>
              <strong>Closes:</strong> 3pm AEST on 13th June, 2021
            </p>
          </div>
        </div>
      </Link>
    </div>
    <p>
      For more information, or to start selling tickets yourself,{" "}
      <a href="https://bendechrai.com/contact">contact Ben Dechrai</a>.
    </p>
  </Layout>
)

export default IndexPage
