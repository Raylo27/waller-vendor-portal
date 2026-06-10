const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const jwt = require('jsonwebtoken')
const prisma = new PrismaClient()

// Staff login
router.post('/staff/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const staff = await prisma.staffUser.findUnique({
      where: { email }
    })

    if (!staff || staff.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { id: staff.id, role: staff.role, type: 'staff' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.json({
      token,
      user: {
        id: staff.id,
        name: staff.name,
        email: staff.email,
        role: staff.role
      }
    })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

// Vendor login
router.post('/vendor/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const vendor = await prisma.vendor.findUnique({
      where: { email },
      include: { categories: true }
    })

    if (!vendor || vendor.ein !== password) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { id: vendor.id, type: 'vendor' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.json({
      token,
      vendor: {
        id: vendor.id,
        vendorId: vendor.vendorId,
        businessName: vendor.businessName,
        status: vendor.status,
        categories: vendor.categories.map(c => c.name)
      }
    })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router