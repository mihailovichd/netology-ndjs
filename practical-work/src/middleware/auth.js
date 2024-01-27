module.exports = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.data(403, 'Please login')
    }
    next()
}