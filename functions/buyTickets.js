exports.handler = async function (event, context, callback) {

    const stripe = require('stripe')(process.env.STRIPE_SK);
    const parsedBody = JSON.parse(event.body);
    const priceId = parsedBody.priceId
    const qty = parseInt(parsedBody.qty)


    const price = await stripe.prices.retrieve(
        priceId, {
        expand: ['product'],
    })

    if(price.product.metadata.min_count && qty < price.product.metadata.min_count) {
        callback(null, {
            statusCode: 403,
            body: JSON.stringify({error:"This product requires a minimum purchase of " + price.product.metadata.min_count})
        })
    }

    const session = await stripe.checkout.sessions.create({
        success_url: 'http://localhost:8888/zontamse-40th/success',
        cancel_url: 'http://localhost:8888/zontamse-40th',
        payment_method_types: ['card'],
        line_items: [
            { price: priceId, quantity: qty },
        ],
        mode: 'payment',
    });

    callback(null, {
        statusCode: 200,
        body: JSON.stringify(session)
    })
}