import React, { useEffect } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { Button } from 'react-bootstrap'

const metaTitle=`Zonta Club of Melbourne's South East`
const title=`Zonta Club of Melbourne's South East 40th Birthday and 16 Day of Acticism Raffle`
const description=`Raising funds for Zonta initiatives that support local women and their children impacted by family violence.`

const ZontaMSE40th = () => {

    useEffect(() => {
        fetch('http://localhost:9000/getProducts').then(res => console.log)
    }, [])

    return (
        <Layout>
            <SEO title={metaTitle} description={description}/>
            <h1>{title}</h1>
            <p>{description}</p>

        </Layout>
    )
}

export default ZontaMSE40th
