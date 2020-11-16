import React, { useEffect, useState } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import getStripe from "../utils/stripe"

const metaTitle = `Zonta Club of Melbourne's South East`
const title = `Zonta Club of Melbourne's South East 40th Birthday and 16 Day of Acticism Raffle`
const description = `Raising funds for Zonta initiatives that support local women and their children impacted by family violence.`

const ZontaMSE40th = () => {

    const [products, setProducts] = useState(null)
    const [customProduct, setCustomProduct] = useState(null)
    const [customTicketCount, setCustomTicketCount] = useState(null)
    const [customProductError, setCustomProductError] = useState(null)

    useEffect(() => {
        fetch(`${process.env.NETLIFY_API}/getProducts`)
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

        fetch(`${process.env.NETLIFY_API}/buyTickets`, {
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
            <p>{description}</p>
            <div className="raffleProducts">
                {products && products.map(product => {
                    return (
                        <>
                            <div className="raffleProduct">
                                <h2>{product.name}</h2>
                                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.0S2EDDLG07gcKzxUP6x-zwHaIe%26pid%3DApi&f=1" />
                                <button onClick={() => buyTickets(product.price.id)}>Buy {product.metadata.ticket_count} raffle tickets for ${product.price.unit_amount / 100}</button>
                                <p>{product.description}</p>
                            </div>
                        </>
                    )
                })}
                {customProduct &&
                    <>
                        <div className="raffleProduct customRaffleProduct">
                            <h2>{customProduct.name}</h2>
                            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.0S2EDDLG07gcKzxUP6x-zwHaIe%26pid%3DApi&f=1" />
                            <button onClick={buyCustomTicket}>Buy {customTicketCount} raffle tickets for ${customProduct.price.unit_amount * customTicketCount / 100}</button>
                            <p>
                                Buy <input onChange={ev => setCustomTicketCount(ev.target.value)} value={customTicketCount} /> or
                                more raffle tickets for ${customProduct.price.unit_amount / 100} each.
                            </p>
                            {customProductError &&
                                <p className="error">{customProductError}</p>
                            }
                            <p>{customProduct.description}</p>
                        </div>
                    </>
                }</div>

        </Layout>
    )
}

export default ZontaMSE40th
