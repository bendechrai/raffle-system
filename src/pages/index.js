import { Link } from "gatsby"
import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Welcome" />

    <div>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between bg-white rounded-lg">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Welcome to Rafflist</span>
          <span className="block text-indigo-600">
            The simple way to sell raffle tickets online
          </span>
        </h2>
      </div>
    </div>

    <h1 className="text-3xl py-6 font-bold text-white">Current Raffles</h1>

    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Cause
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to="/zonta-mse-40">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src="/images/zonta-mse-40/icon.png"
                            alt="Zonta Club of Melbourne's South East"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            Zonta Club of Melbourne's South East
                          </div>
                          <div className="text-sm text-gray-500">
                            40th Birthday Raffle
                          </div>
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 ">
                    <Link to="/zonta-mse-40">
                      <div className="text-sm text-gray-900">
                        Proceeds from the raffle will support community-based
                        Mental Health First Aid training
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to="/zonta-mse-40">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                      <div className="text-sm text-gray-500">
                        9am, 5th April, 2021 - 3pm, 8th August 2021 (AEST)
                      </div>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </Layout>
)

export default IndexPage
