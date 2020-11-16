import React, { useEffect, useState } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { Button } from 'react-bootstrap'

const metaTitle = `Zonta Club of Melbourne's South East`
const title = `Zonta Club of Melbourne's South East 40th Birthday and 16 Day of Acticism Raffle`
const description = `Raising funds for Zonta initiatives that support local women and their children impacted by family violence.`

const ZontaMSE40th = () => {

    const [ products, setProducts ] = useState(null)

    useEffect(() => {
        fetch(`${process.env.NETLIFY_API}/getProducts`)
        .then(res => res.json())
        .then(json => {
            setProducts(json)
        })
    }, [])

    const buyTickets = (priceId) => {
        fetch(`${process.env.NETLIFY_API}/buyTickets`, {
            method: 'post',
            body: {
                priceId
            }
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
        })
    }

    return (
        <Layout>
            <SEO title={metaTitle} description={description} />
            <h1>{title}</h1>
            <p>{description}</p>
            {products && products.map(product => {
                return (
                    <>
                        <h2>{product.name}</h2>
                        <Button onClick={() => buyTickets(product.price.id)}>Buy {product.metadata.ticket_count} raffle tickets for ${product.price.unit_amount/100}</Button>
                        <p>{product.description}</p>
                        <pre>{JSON.stringify(product, null, 4)}</pre>
                    </>
                )
            })}
        </Layout>
    )
}

export default ZontaMSE40th
