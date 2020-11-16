exports.handler = async function (event, context, callback) {

    const stripe = require('stripe')(process.env.STRIPE_SK);
    const parsedBody = JSON.parse(event.body);

    const session = await stripe.checkout.sessions.create({
      success_url: 'http://localhost:8888/zontamse-40th/',
      cancel_url: 'http://localhost:8888/zontamse-40th/',
      payment_method_types: ['card'],
      line_items: [
        {price: parsedBody.priceId, quantity: 1},
      ],
      mode: 'payment',
    });

    callback(null, {
        statusCode: 200,
        body: JSON.stringify(session)
    })
}
