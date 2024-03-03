module.exports = (req, res, next) => {
    res.data(res.codes.error, 'undefined error')
    next()
}