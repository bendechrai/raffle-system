exports.handler = async function (event, context, callback) {
  if (event.httpMethod === "POST") {
    const body = JSON.parse(event.body)

    const checkout = body.data.object
    if (checkout.payment_status === "paid") {
      if (process.env.NODE_ENV !== "production") require("dotenv").config()

      const stripe = require("stripe")(process.env.STRIPE_SK)

      const customer = await stripe.customers.retrieve(checkout.customer)
      console.log(customer)

      const lineItems = await stripe.checkout.sessions.listLineItems(
        checkout.id,
        {
          expand: ["data.price.product"],
        }
      )

      const description = lineItems.data[0].description

      // Assumption there's only one item, and in there we have price.product.metadata.ticket_count
      // if they bought a block, or price.product.metadata.min_count if they bought more individually
      const entries = lineItems.data[0].price.product.metadata.ticket_count
        ? lineItems.data[0].price.product.metadata.ticket_count
        : lineItems.data[0].quantity

      const emailAddress = customer.email
      const emailText = `
        <p><big><strong>Thanks for buying a ${description}!</strong></big></p>
        <p>Your name will go into the draw ${entries} times, and you will be notified by email if you're selected as a winner.</p>
        <p><strong>You purchased</strong>: ${description}</p>
        <p><strong>Your email address</strong>: ${emailAddress}</p>
        <p><strong>Raffle Beneficiary</strong>: Zonta Club of Melbourne's South East</p>
        <p>
            <strong>Ticket Price</strong>: 3 raffle tickets for $6.00, 6 raffle tickets for $10.00,
            10 raffle tickets for $15.00, 11 or more raffle tickets for $1.50 each.
        </p>
        <p>
            <strong>Time and Location of Draw</strong>: shortly after 3pm on the 20th June, 2021
            at the Frankston International Motel, 383-389 Nepean Highway, Frankston, Victoria 3199.
        </p>
        <p>
            <strong>Winner Notification and Publication Method</strong>: winners will be notified by
            email and must make arrangements to pick up their prize within two weeks. It is important
            that you reply to that notification email and organise collection of your prize. A failure
            to respond within two weeks might result in your forfeiting the prize, and it being
            offered to the next person by random draw from the remaining tickets. A complete list of
            winners will be published to the Zonta Club of Melbourne's South East website.
        </p>
        <p><strong>Prize List</strong>: (with approximate values in descending order)</p>
        <ul>
            <li>Two Gold Class Tickets - Village Cinemas ($100)</li>
            <li>Four Plates and Bowls - Tupperware ($40)</li>
            <li>Sofia Eau De Parfum - Sofia Vergara ($40)</li>
            <li>Wooden & Shell Salad Servers ($40)</li>
            <li>Obsession eau de parfum ($40)</li>
            <li>Red Door - Elizabeth Arden ($30)</li>
            <li>Aden Beauty ($30)</li>
            <li>Two Bottles Red Label - Wolf Blass ($30)</li>
            <li>Knitted Shawl ($30)</li>
            <li>Lady Vase ($30)</li>
            <li>Escape - Carolyn Jessop ($26.5)</li>
            <li>Zonte's Footstep - Chocolate Factory ($25)</li>
            <li>Slate Serving Board - Cheese Tools - Alex Liddy ($25)</li>
            <li>Toiletry Bag - Animal Print ($25)</li>
            <li>Toiletry Bag - Tropical Print ($25)</li>
            <li>Two Pilsner Capri - Spiegelau ($25)</li>
            <li>See What You Made Me Do - Jess Hill ($25)</li>
            <li>Two White Wine Glasses Spiegelau ($25)</li>
            <li>Acacia 5 Piece Dip Set - Soren ($25)</li>
            <li>Z & Rose Magnetic Snap Necklace ($25)</li>
            <li>Be Fabulous Toilet Bag ($25)</li>
            <li>Gentleman's Collection - Lindeman's ($23)</li>
            <li>Lost is all the time not spent in love - T'Gallant ($20)</li>
            <li>Yarra Burn - Brut Bottle Fermented ($20)</li>
            <li>Slippers, Foot Wash & Foot Crème ($20)</li>
            <li>Floating Vase - Four round candles ($20)</li>
            <li>Crochet Lap Blanket ($20)</li>
            <li>Six Australia Coasters ($20)</li>
            <li>Four Serving Bowls with Tray - In My Home ($20)</li>
            <li>Spinning Spa Brush ($20)</li>
            <li>Lady Plate - Terry Wong ($15)</li>
            <li>Pamper Hamper ($15)</li>
            <li>Pottery Ginger Jar - Madras Link ($15)</li>
            <li>Two Wick Candle - Ylang Ylang Petals & Water Flowers ($15)</li>
            <li>Z Multicoloured Necklace ($15)</li>
            <li>Small Pamper Pack - Lavender ($10)</li>
        </ul>
        <p>Good luck, and thanks for supporting Zonta Club of Melbourne's South East!</p>
      `

      const mailgun = require("mailgun-js")
      const mg = mailgun({
        apiKey: process.env.MAILGUN_APIKEY,
        domain: process.env.MAILGUN_DOMAIN,
      })

      const data = {
        from: "Zonta Club of Melbourne's South East <no-reply@mail.raffl.ist>",
        to: emailAddress,
        subject: "Your Raffle Tickets for Zonta Club of Melbourne's South East",
        html: emailText,
      }

      const body = await mg.messages().send(data)

      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          action: "Send email",
          ...body,
        }),
      })
    } else {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          action: "Status wasn't 'paid', so we did nothing",
        }),
      })
    }
  }
}
