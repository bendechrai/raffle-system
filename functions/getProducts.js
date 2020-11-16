exports.handler = async function (event, context, callback) {

    if (process.env.NODE_ENV !== 'production') require('dotenv').config()

    const stripe = require('stripe')(process.env.STRIPE_SK)

    const prices = await stripe.prices.list({
        expand: ['data.product'],
    });

    const products = prices.data
        .filter(price => price.product.active)
        .map(price => {
            let product = price.product
            product.price = price
            delete product.price.product
            return product
        })

    callback(null, {
        statusCode: 200,
        body: JSON.stringify(products)
    })
}
