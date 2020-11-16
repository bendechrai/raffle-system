import React from "react"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

const metaTitle = `Zonta Club of Melbourne's South East`
const title = `Zonta Club of Melbourne's South East 40th Birthday and 16 Day of Activism Raffle`
const description = `Raising funds for Zonta initiatives that support local women and their children impacted by family violence.`

const ZontaMSE40Success = () => {

    return (
        <Layout>
            <SEO title={metaTitle} description={description} />
            <h1>{title}</h1>
            <p className="lead">{description}</p>
            <p>Thank you for your purchase, and good luck with the raffle! You will shortly receive an email with your purchase receipt.</p>
            <p>The draw will take place on the 10th December, 2020, at around 10am. Prizes will be picked in order of value, highest first, and winners will receive a notification email.</p>
            <p>If you receive a winning notification email, it is important that you reply and organise collection of your prize. A failure to respond within the timeframe outlined in the email might result in your forfeiting the prize, and it being offered to the next person by random draw from the remaining tickets.</p>
        </Layout>
    )
}

export default ZontaMSE40Success
