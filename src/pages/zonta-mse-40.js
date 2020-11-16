import React, { useEffect, useState } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import getStripe from "../utils/stripe"

const metaTitle = `Zonta Club of Melbourne's South East`
const title = `Zonta Club of Melbourne's South East 40th Birthday and 16 Day of Activism Raffle`
const description = `Raising funds for Zonta initiatives that support local women and their children impacted by family violence.`

const ZontaMSE40 = () => {

    const [products, setProducts] = useState(null)
    const [customProduct, setCustomProduct] = useState(null)
    const [customTicketCount, setCustomTicketCount] = useState(null)
    const [customProductError, setCustomProductError] = useState(null)

    useEffect(() => {
        fetch(`${process.env.GATSBY_NETLIFY_API}/getProducts`)
            .then(res => res.json())
            .then(json => {
                let regularProducts = []

                json.forEach(product => {
                    if (product.metadata.ticket_count) {
                        regularProducts.push(product)
                    } else {
                        setCustomProduct(product)
                        setCustomTicketCount(product.metadata.min_count)
                    }
                })

                regularProducts.sort((a, b) => {
                    return a.price.unit_amount > b.price.unit_amount
                })

                setProducts(regularProducts)
            })
    }, [])

    const buyCustomTicket = () => {
        setCustomProductError(null)
        if (customTicketCount >= customProduct.metadata.min_count) {
            buyTickets(customProduct.price.id, customTicketCount)
        } else {
            setCustomProductError(`This product requires a minimum purchase of ${customProduct.metadata.min_count}`)
        }
    }

    const buyTickets = (priceId, qty = 1) => {

        fetch(`${process.env.GATSBY_NETLIFY_API}/buyTickets`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                priceId,
                qty
            })
        })
            .then(res => res.json())
            .then(async function (session) {
                if (session.error) {
                    setCustomProductError(session.error)
                } else {
                    const stripe = await getStripe()
                    const { error } = await stripe.redirectToCheckout({
                        sessionId: session.id,
                    })
                    if (error) alert(error.message)
                }
            })
    }

    return (
        <Layout>
            <SEO title={metaTitle} description={description} />
            <h1>{title}</h1>
            <p className="lead">{description}</p>
            <p>Pick the number of tickets you would like to purchase. If you want more than 11 tickets, simply enter the quantity desired in the text field below.</p>
            <p>You will be taken to a payment page, and must provide a valid email address, which is the only way you can receive your payment confirmation, and more importantly any notification of your ticket being drawn.</p>
            <div className="raffleProducts">
                {!products && !customProduct && <>
                Loading...
                </>}
                {products && products.map(product => {
                    return (
                        <>
                            <div className="raffleProduct">
                                <h2>{product.name}</h2>
                                <img src={product.images[0]} alt={product.name} />
                                <button onClick={() => buyTickets(product.price.id)}>Buy {product.metadata.ticket_count} raffle tickets for ${(product.price.unit_amount / 100).toFixed(2)}</button>
                                <p className="description">{product.description}</p>
                            </div>
                        </>
                    )
                })}
                {customProduct &&
                    <>
                        <div className="raffleProduct customRaffleProduct">
                            <h2>{customProduct.name}</h2>
                            <img src={customProduct.images[0]} alt={customProduct.name} />
                            <button onClick={buyCustomTicket}>Buy {customTicketCount} raffle tickets for ${(customProduct.price.unit_amount * customTicketCount / 100).toFixed(2)}</button>
                            <p className="description">
                                Buy <input onChange={ev => setCustomTicketCount(ev.target.value)} value={customTicketCount} /> tickets for ${(customProduct.price.unit_amount / 100).toFixed(2)} each
                            </p>
                            {customProductError &&
                                <p className="error">{customProductError}</p>
                            }
                            <p className="description">{customProduct.description}</p>
                        </div>
                    </>
                }</div>

        </Layout>
    )
}

export default ZontaMSE40
