const { format } = require('date-fns')
const { v4: uuid } = require('uuid')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

//-this function handles the data & writing of the log files-\\
const logEvents = async (message, logFileName) => {
    //-variables for the log files-\\
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    try {
        //-creates the file if it does not already exist-\\
        if (!fs.existsSync(path.join(__dirname, '..','logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        } 
        //-writes data to file-\\
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
    } catch (err) {
        console.log(err)
    }
}

//-logs the req & res data -\\
const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`,
     'reqLog.log')
     console.log(`${req.method} ${req.path}`)
     next()
}

module.exports = { logEvents, logger }