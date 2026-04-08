import express from 'express'
import { getAddressSuggestions } from '../services/mapsService.js'
import { authUser, authCaptain } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/suggest', authUser, async (req, res) => {
    const { q } = req.query
    if (!q || q.trim().length < 2) {
        return res.status(400).json({ message: 'Query must be at least 2 characters' })
    }
    try {
        const results = await getAddressSuggestions(q)
        res.json({ results })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/captain/suggest', authCaptain, async (req, res) => {
    const { q } = req.query
    if (!q || q.trim().length < 2) {
        return res.status(400).json({ message: 'Query must be at least 2 characters' })
    }
    try {
        const results = await getAddressSuggestions(q)
        res.json({ results })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export default router
