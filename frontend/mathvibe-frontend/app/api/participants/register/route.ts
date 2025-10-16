import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Extract form data
    const namaLengkap = formData.get('namaLengkap') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const noWa = formData.get('noWa') as string
    const sekolah = formData.get('sekolah') as string
    const provinsi = formData.get('provinsi') as string
    const kategori = formData.get('kategori') as string
    const buktiFollow = formData.get('buktiFollow') as File
    const buktiPembayaran = formData.get('buktiPembayaran') as File
    const idPelajar = formData.get('idPelajar') as File

    // Validation
    if (!namaLengkap || !email || !password || !noWa || !sekolah || !provinsi || !kategori) {
      return NextResponse.json(
        { error: 'Semua field wajib diisi' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password minimal 8 karakter' },
        { status: 400 }
      )
    }

    if (!buktiFollow || !buktiPembayaran) {
      return NextResponse.json(
        { error: 'Bukti follow dan pembayaran wajib diupload' },
        { status: 400 }
      )
    }

    // Check file size (10MB limit)
    const maxSize = 10 * 1024 * 1024
    if (buktiFollow.size > maxSize || buktiPembayaran.size > maxSize) {
      return NextResponse.json(
        { error: 'File tidak boleh lebih dari 10MB' },
        { status: 400 }
      )
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // In production, you would:
    // 1. Upload files to cloud storage (Supabase, S3, etc.)
    // 2. Save participant data to database
    // 3. Send confirmation email

    // For now, return success
    return NextResponse.json({
      success: true,
      message: 'Pendaftaran berhasil! Silakan tunggu verifikasi pembayaran.',
      participant: {
        namaLengkap,
        email,
        sekolah,
        provinsi,
        kategori,
        status: 'waiting_verification'
      }
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat pendaftaran' },
      { status: 500 }
    )
  }
}