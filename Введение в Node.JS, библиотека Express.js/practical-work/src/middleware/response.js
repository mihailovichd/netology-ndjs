module.exports = (req, res, next) => {
    res.data = (status, data) => {
        const isSuccess = status === 200
        res.status(status).json({
            status: isSuccess ? 'ok' : 'false',
            [isSuccess ? 'data' : 'error']: data
        })
    }

    res.codes = {
        success: 200,
        error: 404
    }

    next()
}