const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const { verifyToken, requireStaff } = require('../middleware/authMiddleware')
const prisma = new PrismaClient()

// POST register new vendor (public)
router.post('/', async (req, res) => {
  try {
    const {
      businessName, contactName, email, phone,
      address, businessType, ein, categories,
      documentNames
    } = req.body

    const count = await prisma.vendor.count()
    const vendorId = `WLR-V-${String(count + 1).padStart(3, '0')}`

    const vendor = await prisma.vendor.create({
      data: {
        vendorId,
        businessName,
        contactName,
        email,
        phone,
        address,
        businessType,
        ein,
        status: 'Active',
        categories: {
          connect: categories.map(name => ({ name }))
        }
      },
      include: { categories: true }
    })

    res.json({ success: true, vendor })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
})

// GET all vendors (staff only)
router.get('/', verifyToken, requireStaff, async (req, res) => {
  try {
    const { category, status } = req.query

    const vendors = await prisma.vendor.findMany({
      include: { categories: true },
      orderBy: { createdAt: 'desc' }
    })

    res.json(vendors)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router