import React from "react"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

const metaTitle = `Zonta Club of Melbourne's South East`
const title = `Zonta Club of Melbourne's South East 40th Birthday and 16 Day of Acticism Raffle`
const description = `Raising funds for Zonta initiatives that support local women and their children impacted by family violence.`

const ZontaMSE40thSuccess = () => {

    return (
        <Layout>
            <SEO title={metaTitle} description={description} />
            <h1>{title}</h1>
            <p>{description}</p>
            <p>Thanks for supporting us</p>
        </Layout>
    )
}

export default ZontaMSE40thSuccess
