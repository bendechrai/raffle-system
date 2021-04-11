import React, { useEffect, useState } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import getStripe from "../utils/stripe"

const metaTitle = `Zonta Club of Melbourne's South East`
const title = `Zonta Club of Melbourne's South East 40th Birthday Raffle`
const description = `Proceeds from the raffle will support community-based Mental Health First Aid training`

const Banner = () => (
  <>
    <div className="bg-gray-200">
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="my-5">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-16 md:gap-y-10">
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                      />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    How many tickets?
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-700">
                  Pick the number of tickets you would like to purchase. If you
                  want more than 11 tickets, simply enter the quantity desired
                  in the text field below
                </dd>
              </div>
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    Pay Securely
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-700">
                  Our secure payment page will allow you to pay instantly on a
                  credit or debid card, after which you'll receive your tickets
                  by email
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </>
)

const Tickets = ({
  products,
  customProduct,
  customTicketCount,
  setCustomTicketCount,
  customProductError,
  buyTickets,
  buyCustomTicket,
}) => {
  return (
    <>
      <div className="my-5">
        <dl className="space-y-10 sm:space-y-0 sm:grid md:grid-cols-2 lg:grid-cols-4 gap-y-8">
          {products.map(product => {
            return (
              <div>
                <div className="relative text-center flex flex-col sm:mx-4 sm:border sm:rounded sm:border-secondary sm:pt-4">
                  <h4 className="text-lg leading-6 font-bold text-center mx-4">
                    {product.name}
                  </h4>
                  <img src={product.images[0]} alt={product.name} />
                  <button
                    type="submit"
                    class="py-2 px-4 text-sm font-medium text-white bg-secondary hover:bg-primary"
                    onClick={() => buyTickets(product.price.id)}
                  >
                    Buy {product.metadata.ticket_count} raffle tickets for $
                    {(product.price.unit_amount / 100).toFixed(2)}
                  </button>
                </div>
                <p className="text-center pt-4 text-sm text-gray-800">
                  {product.description}
                </p>
              </div>
            )
          })}
          {customProduct && (
            <div>
              <div className="relative text-center flex flex-col sm:mx-4 sm:border sm:rounded sm:border-secondary sm:pt-4">
                <h4 className="text-lg leading-6 font-bold text-center mx-4">
                  {customProduct.name}
                </h4>
                <img src={customProduct.images[0]} alt={customProduct.name} />
                <button
                  type="submit"
                  class="py-2 px-4 text-sm font-medium text-white bg-secondary hover:bg-primary"
                  onClick={buyCustomTicket}
                >
                  Buy {customTicketCount} raffle tickets for $
                  {(
                    (customProduct.price.unit_amount * customTicketCount) /
                    100
                  ).toFixed(2)}
                </button>
              </div>
              {customProductError && (
                <div className="pt-4 mx-4 text-sm text-error flex gap-4">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="#cc0000"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span>{customProductError}</span>
                </div>
              )}
              <p className="text-center pt-4 text-sm text-gray-800">
                Buy{" "}
                <input
                  className="w-10 border border-secondary text-center"
                  onChange={ev => setCustomTicketCount(ev.target.value)}
                  value={customTicketCount}
                />{" "}
                tickets for $
                {(customProduct.price.unit_amount / 100).toFixed(2)} each
              </p>
              <p>{customProduct.description}</p>
            </div>
          )}
        </dl>
      </div>
    </>
  )
}

const Alert = ({ title, message = "" }) => (
  <>
    <div className="mx-auto py-5">
      <div className="">
        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full text-white bg-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {title}
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">{message}</p>
          </div>
        </div>
      </div>
    </div>
  </>
)

const ZontaMSE40 = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  const [isEnded, setIsEnded] = useState(false)
  const [products, setProducts] = useState(null)
  const [customProduct, setCustomProduct] = useState(null)
  const [customTicketCount, setCustomTicketCount] = useState(null)
  const [customProductError, setCustomProductError] = useState(null)

  useEffect(() => {
    const starts = new Date("2021/04/03 09:00")
    const ends = new Date("2021/06/20 15:00")
    const now = new Date()
    const startsIn = starts.getTime() - now.getTime()
    const endsIn = ends.getTime() - now.getTime()
    setIsStarted(startsIn <= 0)
    setIsEnded(endsIn <= 0)

    if (startsIn <= 0 && endsIn > 0) {
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
          setIsLoaded(true)
        })
    } else {
      setIsLoaded(true)
    }
  }, [])

  const buyCustomTicket = () => {
    setCustomProductError(null)
    if (customTicketCount >= customProduct.metadata.min_count) {
      buyTickets(customProduct.price.id, customTicketCount)
    } else {
      setCustomProductError(
        `This product requires a minimum purchase of ${customProduct.metadata.min_count}`
      )
    }
  }

  const buyTickets = (priceId, qty = 1) => {
    fetch(`${process.env.GATSBY_NETLIFY_API}/buyTickets`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priceId,
        qty,
      }),
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
      <div className="bg-gray-600 rounded-lg">
        <div className="bg-white shadow-md overflow-hidden sm:rounded-lg">
          <div className="bg-primary px-4 py-5 sm:px-6">
            <div className="flex items-center justify-center flex-wrap gap-x-8 gap-y-4">
              <div className="mt-2 flex-shrink-0 sm:mt-0">
                <img
                  className="h-20 shadow-lg"
                  src="/images/zonta-mse-40/logo.png"
                  alt="Zonta Club of Melbourne's South East"
                />
              </div>
              <div className="orde-2 m:order-1">
                <h3 className="text-lg leading-6 text-white font-bold text-center">
                  {title}
                </h3>
                <p className="mt-1 text-sm text-white text-center">
                  {description}
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200">
            <Banner />

            {!isLoaded && (
              <Alert
                title="Loading Tickets..."
                message="This should only take a few seconds"
              />
            )}
            {isLoaded && !isStarted && (
              <Alert
                title="The raffle hasn't started yet"
                message="Please try later"
              />
            )}
            {isLoaded && isEnded && <Alert title="The raffle has ended" />}

            {isLoaded && isStarted && !isEnded && products && (
              <Tickets
                products={products}
                customProduct={customProduct}
                customTicketCount={customTicketCount}
                setCustomTicketCount={setCustomTicketCount}
                customProductError={customProductError}
                buyTickets={buyTickets}
                buyCustomTicket={buyCustomTicket}
              />
            )}
          </div>
        </div>

        <div className="p-10 text-gray-200">
          <h2 className="text-2xl font-bold">Terms and Conditions</h2>
          <p className="my-4 font-bold">
            You must be 18 years or over, and a resident of the state of
            Victoria in Australia to be eligible to purchase a ticket.
          </p>
          <p className="my-4">
            This raffle is being conducted by Lunar Productions on behalf and by
            request of Zonta Club of Melbourne's South East. Zonta Club of
            Melbourne's South East has obtained Declared Community Organisation
            status from the Victorial Commission for Gambling and Liquor
            Regulation (Organisational Number 61694).
          </p>
          <p className="my-4">
            Tickets for this raffle will be available from 9am on 5th April,
            2021, and will cease to be available at 3pm on 20th June, 2021 or
            when sold out. The total prize pool is valued at $954.50, and there
            are a maximum of $5727.00 worth of tickets available. The raffle and
            associated activities will be conducted under the laws of Victoria,
            Australia.
          </p>
          <p className="my-4">
            We are required by law to collect ticket buyers’ contact details in
            order to confirm winner's details. You agree that the email address
            you provide during the payment process is considered your personal
            identity, and that any person whomsoever that has access to email
            sent to this address is to be considered as authorised to collect
            any prize.
          </p>
          <p className="my-4">
            We are required to provide you with printed tickets. The payment
            confirmation email that you shall receive after purchase shall be
            this printed ticket, and you must have this available for inspection
            in order to collect any prizes. This can be in the form of a
            printout or the ability to see the email on a mobile computing
            device in the email client. A screenshot of the email will not be
            accepted.
          </p>
          <p className="my-4">
            The following inforamtion is required to be included on any issued
            tickets, and is included here for convenience:
          </p>
          <ul className="my-4 ml-4">
            <li className="pb-4">
              <strong>Raffle Beneficiary:</strong> Zonta Club of Melbourne's
              South East
            </li>
            <li className="pb-4">
              <strong>Ticket Price:</strong>{" "}
              {products &&
                products
                  .map(product => {
                    return `${
                      product.metadata.ticket_count
                    } raffle tickets for $${(
                      product.price.unit_amount / 100
                    ).toFixed(2)}`
                  })
                  .join(", ")}
              {customProduct &&
                `, ${
                  customProduct.metadata.min_count
                } or more raffle tickets for $${(
                  customProduct.price.unit_amount / 100
                ).toFixed(2)} each`}
              .
            </li>
            <li className="pb-4">
              <strong>Prize List:</strong> (with approximate values in
              descending order)
              <ul className="list-disc ml-4 pl-4">
                <li>Two Gold Class Tickets - Village Cinemas ($100)</li>
                <li>Four Plates and Bowls - Tupperware ($40)</li>
                <li>Sofia Eau De Parfum - Sofia Vergara ($40)</li>
                <li>Wooden &amp; Shell Salad Servers ($40)</li>
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
                <li>Z &amp; Rose Magnetic Snap Necklace ($25)</li>
                <li>Be Fabulous Toilet Bag ($25)</li>
                <li>Gentleman's Collection - Lindeman's ($23)</li>
                <li>
                  Lost is all the time not spent in love - T'Gallant ($20)
                </li>
                <li>Yarra Burn - Brut Bottle Fermented ($20)</li>
                <li>Slippers, Foot Wash &amp; Foot Crème ($20)</li>
                <li>Floating Vase - Four round candles ($20)</li>
                <li>Crochet Lap Blanket ($20)</li>
                <li>Six Australia Coasters ($20)</li>
                <li>Four Serving Bowls with Tray - In My Home ($20)</li>
                <li>Spinning Spa Brush ($20)</li>
                <li>Lady Plate - Terry Wong ($15)</li>
                <li>Pamper Hamper ($15)</li>
                <li>Pottery Ginger Jar - Madras Link ($15)</li>
                <li>
                  Two Wick Candle - Ylang Ylang Petals &amp; Water Flowers ($15)
                </li>
                <li>Z Multicoloured Necklace ($15)</li>
                <li>Small Pamper Pack - Lavender ($10)</li>
              </ul>
            </li>
            <li className="pb-4">
              <strong>Time and Location of Draw:</strong> shortly after 3pm on
              the 20th June, 2021 at the Frankston International Motel, 383-389
              Nepean Highway, Frankston, Victoria 3199.
            </li>
            <li className="pb-4">
              <strong>Winner Notification and Publication Method:</strong>{" "}
              winners will be notified at the time of draw or by email if not
              available to collect the prize on the day. A complete list of
              winners will be published to the Zonta Club of Melbourne's South
              East website.
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  )
}

export default ZontaMSE40
