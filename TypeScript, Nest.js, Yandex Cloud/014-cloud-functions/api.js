const express = require('express')
const router = express.Router()

const characterModel = require('./character.model')

router.get('/characters', async (req, res) => {
    const { id } = req.query

    // Test
    // const newUser = new characterModel({
    //     id: 1,
    //     description: 'Описание',
    //     modified: Date.now(),
    //     thumbnail: 'https://...',s
    //     comics: [
    //         {
    //             id: 1,
    //             name: 'Название',
    //         }
    //     ]
    // })
    // await newUser.save()

    if (!id) {
        res.json(await characterModel.find({}))
    } else {
        const character = await characterModel.findOne({ id: id })
        if (!character)
            return res.status(404).json({})
        else {
            return res.status(200).json(character)
        }
    }
})

module.exports = router