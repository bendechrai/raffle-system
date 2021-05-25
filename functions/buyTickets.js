exports.handler = async function (event, context, callback) {
  if (process.env.NODE_ENV !== "production") require("dotenv").config()

  const stripe = require("stripe")(process.env.STRIPE_SK)

  const parsedBody = JSON.parse(event.body)
  const priceId = parsedBody.priceId
  const qty = parseInt(parsedBody.qty)
  const ticketholderName = parsedBody.ticketholderName
  const ticketholderEmail = parsedBody.ticketholderEmail

  const price = await stripe.prices.retrieve(priceId, {
    expand: ["product"],
  })

  if (
    price.product.metadata.min_count &&
    qty < price.product.metadata.min_count
  ) {
    callback(null, {
      statusCode: 403,
      body: JSON.stringify({
        error:
          "This product requires a minimum purchase of " +
          price.product.metadata.min_count,
      }),
    })
  }

  const session = await stripe.checkout.sessions.create({
    success_url: `${process.env.URL}/zonta-mse-40/success`,
    cancel_url: `${process.env.URL}/zonta-mse-40`,
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: qty }],
    mode: "payment",
    metadata: {
      ticketholderName,
      ticketholderEmail,
    },
  })

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(session),
  })
}
