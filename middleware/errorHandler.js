const {logEvents} = require('./logger')

//-logs error data, req & res-\\
const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t$
    {req.headers.origin}`, 'errLog.log')
    console.log(err.stack)
    const status = res.statuseCode ? res.statusCode : 500 // 500 = server error

    res.status(status)
    res.json({ message: error.message })
}

module.exports =  errorHandler