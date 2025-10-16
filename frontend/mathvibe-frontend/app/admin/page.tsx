'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Shield, User, LogIn } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const adminCredentials = [
    {
      email: 'superadmin@mathvibe.id',
      password: '210908110708',
      role: 'Super Admin',
      description: 'Akses penuh ke semua fitur'
    },
    {
      email: 'admin1@mathvibe.id',
      password: 'admin123',
      role: 'Admin Pembayaran',
      description: 'Verifikasi pembayaran DANA'
    },
    {
      email: 'admin2@mathvibe.id',
      password: 'admin123',
      role: 'Admin Pembayaran',
      description: 'Verifikasi pembayaran BRI'
    }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid'
    }

    if (!formData.password) {
      newErrors.password = 'Password wajib diisi'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Check if credentials match any admin account
      const matchedAdmin = adminCredentials.find(
        admin => admin.email === formData.email && admin.password === formData.password
      )
      
      if (matchedAdmin) {
        // Store admin session
        localStorage.setItem('adminEmail', matchedAdmin.email)
        localStorage.setItem('adminRole', matchedAdmin.role)
        
        // Redirect to dashboard
        router.push('/admin/dashboard')
      } else {
        setErrors({ general: 'Email atau password salah' })
      }
    } catch (error) {
      setErrors({ general: 'Terjadi kesalahan saat login' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-math-primary via-math-secondary to-math-accent flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-white mr-3" />
            <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
          </div>
          <p className="text-white/80">Login untuk mengakses dashboard admin</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="inline h-4 w-4 mr-1" />
                Email Admin
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-math-primary focus:border-transparent ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="admin@mathvibe.id"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Lock className="inline h-4 w-4 mr-1" />
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-math-primary focus:border-transparent ${
                  errors.password ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Masukkan password"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{errors.general}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-math-primary hover:bg-math-secondary text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Login...
                </span>
              ) : (
                <span className="flex items-center">
                  <LogIn className="mr-2 h-5 w-5" />
                  Login
                </span>
              )}
            </button>
          </form>
        </div>

        {/* Admin Accounts Info */}
        <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <User className="mr-2 h-5 w-5" />
            Akun Admin Tersedia
          </h3>
          <div className="space-y-3">
            {adminCredentials.map((admin, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-3">
                <p className="text-white text-sm font-medium">{admin.email}</p>
                <p className="text-white/70 text-xs">{admin.role} - {admin.description}</p>
                <p className="text-white/50 text-xs">Password: {admin.password}</p>
              </div>
            ))}
          </div>
          <p className="text-white/60 text-xs mt-4">
            * Sarankan untuk segera mengganti password setelah login pertama kali
          </p>
        </div>
      </div>
    </div>
  )
}