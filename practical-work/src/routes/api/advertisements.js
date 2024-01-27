const express = require('express')
const router = express.Router()
const passport = require("passport")

const advertisementsModel = require('../../models/advertisements')

const fileMulter = require('../../middleware/files')
const authMiddleware = require('../../middleware/auth')

router.get('/', async(req, res) => {
    try {
        res.data(200, await advertisementsModel.findByParams({}))
    } catch (e) {
        res.data(400, e.message)
    }
})

router.get('/:id', async(req, res) => {
    const { id } = req.params
    try {
        res.data(200, await advertisementsModel.findById(id))
    } catch (e) {
        res.data(400, e.message)
    }
})

router.post('/',
    authMiddleware,
    fileMulter.array('images'),
    async(req, res) => {
        const { shortText, description } = req.body
        const images = req.files
        try {
            res.data(200, await advertisementsModel.create({
                shortText: shortText,
                description: description,
                images: images,
                isDeleted: false,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                userId: req.user.id
            }))
        } catch (e) {
            res.data(400, e.message)
        }
    }
)

router.delete('/:id',
    authMiddleware,
    async (req, res) => {
        const { id } = req.params
        try {
            res.data(200, await advertisementsModel.removeById(id))
        } catch (e) {
            res.data(400, e.message)
        }
    }
)

module.exports = router