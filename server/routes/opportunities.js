const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const { verifyToken, requireStaff } = require('../middleware/authMiddleware')
const prisma = new PrismaClient()

// GET all published opportunities (public)
router.get('/', async (req, res) => {
  try {
    const { category, type } = req.query

    const where = { status: 'Published' }
    if (category) where.category = category
    if (type) where.type = type

    const opportunities = await prisma.opportunity.findMany({
      where,
      orderBy: { deadline: 'asc' }
    })

    res.json(opportunities)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

// GET single opportunity by id (public)
router.get('/:id', async (req, res) => {
  try {
    const opportunity = await prisma.opportunity.findUnique({
      where: { id: req.params.id }
    })

    if (!opportunity) {
      return res.status(404).json({ error: 'Opportunity not found' })
    }

    res.json(opportunity)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

// POST create new opportunity (staff only)
router.post('/', verifyToken, requireStaff, async (req, res) => {
  try {
    const {
      title, type, category, description,
      requirements, deadline, contactName,
      contactEmail, requiredDocs
    } = req.body

    const count = await prisma.opportunity.count()
    const oppId = `WLR-OPP-${String(count + 1).padStart(3, '0')}`

    const opportunity = await prisma.opportunity.create({
      data: {
        oppId,
        title,
        type,
        category,
        description,
        requirements,
        deadline: new Date(deadline),
        contactName,
        contactEmail,
        requiredDocs,
        status: 'Published',
        createdBy: req.user.id
      }
    })

    res.json({ success: true, opportunity })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router