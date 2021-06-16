import React from "react"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

const metaTitle = `Zonta Club of Melbourne's South East`
const title = `Zonta Club of Melbourne's South East 40th Birthday Raffle`
const description = `Proceeds from the raffle will support community-based Mental Health First Aid training.`

const Alert = ({ title, message = "" }) => (
  <>
    <div className="mx-auto py-5">
      <div className="">
        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full text-white bg-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
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

const ZontaMSE40Success = () => {
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
          <div className="border-t border-gray-200 pb-4">
            <Alert
              title="Thank You!"
              message="Your tickets have been successfully bought"
            />
            <p className="px-6 py-2">
              Thank you for your purchase, and good luck with the raffle! You
              will shortly receive your raffle tickets to the email address
              provided when you selected the number of tickets to buy, and your
              purchase receipt to the email address provided at time of payment.
            </p>
            <p className="px-6 py-2">
              <strong>
                Keep the raffle tickets email safe! It is your only proof of
                entry into the raffle.
              </strong>
            </p>
            <p className="px-6 py-2">
              The draw will take place shortly after ticket sales close at 3pm
              AEST on 8th August 2021. Prizes will be picked in order of value,
              highest first, and winners who are not present during the draw
              will be contacted by email.
            </p>
            <p className="px-6 py-2">
              Winners will be notified by email and must make arrangements to
              pick up their prize within two weeks. It is important that you
              reply to that notification email and organise collection of your
              prize. A failure to respond within two weeks might result in your
              forfeiting the prize, and it being offered to the next person by
              random draw from the remaining tickets.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ZontaMSE40Success
