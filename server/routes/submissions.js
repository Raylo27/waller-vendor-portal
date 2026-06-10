const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const { verifyToken, requireStaff } = require('../middleware/authMiddleware')
const prisma = new PrismaClient()

// POST create new submission (vendor)
router.post('/', verifyToken, async (req, res) => {
  try {
    const {
      opportunityId, notes, bidAmount, documentNames
    } = req.body

    const count = await prisma.submission.count()
    const refNum = `WLR-SUB-${String(count + 52).padStart(4, '0')}`

    const submission = await prisma.submission.create({
      data: {
        referenceNumber: refNum,
        opportunityId,
        vendorId: req.user.id,
        notes,
        bidAmount: bidAmount ? parseFloat(bidAmount) : null,
        documentNames: documentNames || [],
        status: 'New'
      }
    })

    res.json({ success: true, submission })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
})

// GET all submissions (staff only)
router.get('/', verifyToken, requireStaff, async (req, res) => {
  try {
    const { opportunityId } = req.query

    const where = {}
    if (opportunityId) where.opportunityId = opportunityId

    const submissions = await prisma.submission.findMany({
      where,
      include: {
        vendor: true,
        opportunity: true
      },
      orderBy: { submittedAt: 'desc' }
    })

    res.json(submissions)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

// PATCH update submission status (staff only)
router.patch('/:id', verifyToken, requireStaff, async (req, res) => {
  try {
    const { status } = req.body

    const submission = await prisma.submission.update({
      where: { id: req.params.id },
      data: { status }
    })

    res.json({ success: true, submission })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router