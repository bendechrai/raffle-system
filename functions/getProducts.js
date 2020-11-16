exports.handler = function (event, context, callback) {

    const products = [
        { id: 1 }, { id: 2 }
    ]

    callback(null, {
        statusCode: 200,
        body: JSON.stringify(products)
    })
}