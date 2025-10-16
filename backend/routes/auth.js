const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')
const router = express.Router()

// Mock database
const participants = []
const admins = [
  {
    id: '1',
    email: 'superadmin@mathvibe.id',
    password: '$2b$10$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj5bP2UvcD7W',
    role: 'super_admin',
    isActive: true
  },
  {
    id: '2',
    email: 'admin1@mathvibe.id',
    password: '$2b$10$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj5bP2UvcD7W',
    role: 'payment_admin',
    isActive: true
  },
  {
    id: '3',
    email: 'admin2@mathvibe.id',
    password: '$2b$10$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj5bP2UvcD7W',
    role: 'payment_admin',
    isActive: true
  }
]

// Login endpoint
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    // Check admin login first
    const admin = admins.find(a => a.email === email && a.isActive)
    if (admin) {
      const isValidPassword = await bcrypt.compare(password, admin.password)
      if (isValidPassword) {
        const token = jwt.sign(
          { userId: admin.id, email: admin.email, role: admin.role },
          process.env.JWT_SECRET || 'fallback-secret',
          { expiresIn: '24h' }
        )

        return res.json({
          success: true,
          token,
          user: {
            id: admin.id,
            email: admin.email,
            role: admin.role,
            isAdmin: true
          }
        })
      }
    }

    // Check participant login
    const participant = participants.find(p => p.email === email)
    if (participant) {
      const isValidPassword = await bcrypt.compare(password, participant.passwordHash)
      if (isValidPassword) {
        const token = jwt.sign(
          { userId: participant.id, email: participant.email },
          process.env.JWT_SECRET || 'fallback-secret',
          { expiresIn: '24h' }
        )

        return res.json({
          success: true,
          token,
          user: {
            id: participant.id,
            email: participant.email,
            nama: participant.nama,
            paymentStatus: participant.paymentStatus,
            isAdmin: false
          }
        })
      }
    }

    return res.status(401).json({ error: 'Email atau password salah' })

  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Terjadi kesalahan server' })
  }
})

// Admin login endpoint
router.post('/admin/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    const admin = admins.find(a => a.email === email && a.isActive)
    if (!admin) {
      return res.status(401).json({ error: 'Admin tidak ditemukan atau tidak aktif' })
    }

    const isValidPassword = await bcrypt.compare(password, admin.password)
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Password salah' })
    }

    const token = jwt.sign(
      { userId: admin.id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    )

    res.json({
      success: true,
      token,
      user: {
        id: admin.id,
        email: admin.email,
        role: admin.role
      }
    })

  } catch (error) {
    console.error('Admin login error:', error)
    res.status(500).json({ error: 'Terjadi kesalahan server' })
  }
})

// Verify token endpoint
router.post('/verify', async (req, res) => {
  try {
    const { token } = req.body

    if (!token) {
      return res.status(401).json({ error: 'Token tidak ditemukan' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret')
    res.json({ success: true, user: decoded })

  } catch (error) {
    res.status(401).json({ error: 'Token tidak valid' })
  }
})

module.exports = router