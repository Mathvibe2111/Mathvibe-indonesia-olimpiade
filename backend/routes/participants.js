const express = require('express')
const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator')
const router = express.Router()

// Mock database
let participants = []

// Get all participants
router.get('/', async (req, res) => {
  try {
    const { status, kategori, search } = req.query
    
    let filteredParticipants = participants

    if (status && status !== 'all') {
      filteredParticipants = filteredParticipants.filter(p => p.paymentStatus === status)
    }

    if (kategori && kategori !== 'all') {
      filteredParticipants = filteredParticipants.filter(p => p.kategori === kategori)
    }

    if (search) {
      const searchTerm = search.toLowerCase()
      filteredParticipants = filteredParticipants.filter(p => 
        p.nama.toLowerCase().includes(searchTerm) ||
        p.email.toLowerCase().includes(searchTerm) ||
        p.sekolah.toLowerCase().includes(searchTerm)
      )
    }

    res.json({
      success: true,
      data: filteredParticipants,
      total: filteredParticipants.length
    })

  } catch (error) {
    console.error('Get participants error:', error)
    res.status(500).json({ error: 'Terjadi kesalahan server' })
  }
})

// Get participant by ID
router.get('/:id', async (req, res) => {
  try {
    const participant = participants.find(p => p.id === req.params.id)
    if (!participant) {
      return res.status(404).json({ error: 'Peserta tidak ditemukan' })
    }

    // Remove sensitive data
    const { passwordHash, dashboardPasswordVisible, ...safeData } = participant
    res.json({ success: true, data: safeData })

  } catch (error) {
    console.error('Get participant error:', error)
    res.status(500).json({ error: 'Terjadi kesalahan server' })
  }
})

// Register new participant
router.post('/register', [
  body('namaLengkap').isLength({ min: 3 }).trim(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  body('noWa').isMobilePhone('id-ID'),
  body('sekolah').isLength({ min: 3 }).trim(),
  body('provinsi').isLength({ min: 2 }).trim(),
  body('kategori').isIn(['SMP', 'SMA'])
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const {
      namaLengkap,
      email,
      password,
      noWa,
      sekolah,
      provinsi,
      kategori
    } = req.body

    // Check if email already exists
    const existingParticipant = participants.find(p => p.email === email)
    if (existingParticipant) {
      return res.status(400).json({ error: 'Email sudah terdaftar' })
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)
    
    // Create new participant
    const newParticipant = {
      id: Date.now().toString(),
      nama: namaLengkap,
      email,
      passwordHash,
      dashboardPasswordVisible: password, // Store plain text password as requested
      noWa,
      sekolah,
      provinsi,
      kategori,
      paymentStatus: 'waiting_verification',
      accountStatus: 'created',
      proofFollowUrl: null,
      proofPaymentUrl: null,
      idPelajarUrl: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    participants.push(newParticipant)

    // Remove sensitive data from response
    const { passwordHash: _, dashboardPasswordVisible: __, ...safeData } = newParticipant
    
    res.status(201).json({
      success: true,
      message: 'Pendaftaran berhasil! Silakan tunggu verifikasi pembayaran.',
      data: safeData
    })

  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ error: 'Terjadi kesalahan server' })
  }
})

// Update participant status (admin only)outer.patch('/:id/status', async (req, res) => {
  try {
    const { paymentStatus, accountStatus } = req.body
    
    const participant = participants.find(p => p.id === req.params.id)
    if (!participant) {
      return res.status(404).json({ error: 'Peserta tidak ditemukan' })
    }

    if (paymentStatus) {
      participant.paymentStatus = paymentStatus
    }
    
    if (accountStatus) {
      participant.accountStatus = accountStatus
    }

    participant.updatedAt = new Date().toISOString()

    res.json({
      success: true,
      message: 'Status peserta berhasil diupdate',
      data: participant
    })

  } catch (error) {
    console.error('Update status error:', error)
    res.status(500).json({ error: 'Terjadi kesalahan server' })
  }
})

// Reset password (admin only)outer.patch('/:id/reset-password', async (req, res) => {
  try {
    const { newPassword } = req.body
    
    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({ error: 'Password minimal 8 karakter' })
    }

    const participant = participants.find(p => p.id === req.params.id)
    if (!participant) {
      return res.status(404).json({ error: 'Peserta tidak ditemukan' })
    }

    // Update both hashed and plain text password
    participant.passwordHash = await bcrypt.hash(newPassword, 10)
    participant.dashboardPasswordVisible = newPassword
    participant.updatedAt = new Date().toISOString()

    res.json({
      success: true,
      message: 'Password berhasil direset'
    })

  } catch (error) {
    console.error('Reset password error:', error)
    res.status(500).json({ error: 'Terjadi kesalahan server' })
  }
})

// Get statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = {
      total: participants.length,
      verified: participants.filter(p => p.paymentStatus === 'verified').length,
      pending: participants.filter(p => p.paymentStatus === 'waiting_verification').length,
      rejected: participants.filter(p => p.paymentStatus === 'rejected').length,
      smp: participants.filter(p => p.kategori === 'SMP').length,
      sma: participants.filter(p => p.kategori === 'SMA').length
    }

    res.json({ success: true, data: stats })

  } catch (error) {
    console.error('Get stats error:', error)
    res.status(500).json({ error: 'Terjadi kesalahan server' })
  }
})

module.exports = router