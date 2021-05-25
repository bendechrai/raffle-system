exports.handler = async function (event, context, callback) {
  if (process.env.NODE_ENV !== "production") require("dotenv").config()
  const stripe = require("stripe")(process.env.STRIPE_SK)

  let lines = [["Name", "Email", "Description", "Entries"]]

  let checkout = null
  let checkoutSessions = {}
  do {
    if (!checkout) {
      checkoutSessions = await stripe.checkout.sessions.list({ limit: 100 })
    } else {
      checkoutSessions = await stripe.checkout.sessions.list({
        limit: 100,
        starting_after: checkout.id,
        expand: ["data.checkout.metadata"],
      })
    }

    for (i = 0; i < checkoutSessions.data.length; i++) {
      checkout = checkoutSessions.data[i]
      if (checkout.payment_status === "paid") {
        // Get customer
        const customer = await stripe.customers.retrieve(checkout.customer)

        // Get lineimtens
        const lineItems = await stripe.checkout.sessions.listLineItems(
          checkout.id,
          {
            limit: 100,
            expand: ["data.price.product"],
          }
        )

        const name = checkout.metadata.ticketholderName
          ? checkout.metadata.ticketholderName
          : customer.email

        const email = checkout.metadata.ticketholderEmail
          ? checkout.metadata.ticketholderEmail
          : customer.email

        // Assumption there's only one item, and in there we have price.product.metadata.ticket_count
        // if they bought a block, or price.product.metadata.min_count if they bought more individually
        const description = lineItems.data[0].description

        const entries = parseInt(
          lineItems.data[0].price.product.metadata.ticket_count
            ? lineItems.data[0].price.product.metadata.ticket_count
            : lineItems.data[0].quantity
        )

        for (j = 1; j <= entries; j++) {
          lines.push([name, email, description, entries])
        }
      }
    }
  } while (checkoutSessions.has_more)

  let email = ""
  for (let linePtr = 0; linePtr < lines.length; linePtr++) {
    email += lines[linePtr].join(",")
    email += "\n"
  }

  const mailgun = require("mailgun-js")
  const mg = mailgun({
    apiKey: process.env.MAILGUN_APIKEY,
    domain: process.env.MAILGUN_DOMAIN,
  })

  const data = {
    from: "Zonta Club of Melbourne's South East <no-reply@mail.raffl.ist>",
    to: "ben@dechrai.com",
    subject: "[Rafflist] CSV of Zonta Club of Melbourne's South East Entries",
    text: email,
  }

  const body = await mg.messages().send(data)

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      action: "Email sent",
    }),
  })
}
