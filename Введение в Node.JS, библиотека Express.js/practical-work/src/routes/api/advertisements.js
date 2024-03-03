const express = require('express')
const router = express.Router()

const Advertisements = require('../../models/advertisements')

const fileMulter = require('../../middleware/files')
const authMiddleware = require('../../middleware/user')

router.get('/', async(req, res) => {
    try {
        res.data(res.codes.success, await Advertisements.findByParams({}))
    } catch (e) {
        res.data(res.codes.error, e.message)
    }
})

router.get('/:id', async(req, res) => {
    const { id } = req.params
    try {
        res.data(res.codes.success, await Advertisements.findById(id))
    } catch (e) {
        res.data(res.codes.error, e.message)
    }
})

router.post('/',
    authMiddleware,
    fileMulter.array('images'),
    async(req, res) => {
        const { shortText, description } = req.body
        const images = req.files
        try {
            res.data(res.codes.success, await Advertisements.create({
                shortText: shortText,
                description: description,
                images: images,
                isDeleted: false,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                userId: req.user.id
            }))
        } catch (e) {
            res.data(res.codes.error, e.message)
        }
    }
)

router.delete('/:id',
    authMiddleware,
    async (req, res) => {
        const { id } = req.params
        try {
            res.data(res.codes.success, await Advertisements.removeById(id))
        } catch (e) {
            res.data(res.codes.error, e.message)
        }
    }
)

module.exports = router