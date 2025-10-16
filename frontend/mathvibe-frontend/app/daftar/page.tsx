'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronLeft, Upload, User, Mail, Phone, School, MapPin, Users } from 'lucide-react'

interface FormData {
  namaLengkap: string
  email: string
  password: string
  konfirmasiPassword: string
  noWa: string
  sekolah: string
  provinsi: string
  kategori: string
  buktiFollow: File | null
  buktiPembayaran: File | null
  idPelajar: File | null
}

export default function DaftarPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    namaLengkap: '',
    email: '',
    password: '',
    konfirmasiPassword: '',
    noWa: '',
    sekolah: '',
    provinsi: '',
    kategori: '',
    buktiFollow: null,
    buktiPembayaran: null,
    idPelajar: null
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const provinsiList = [
    'Aceh', 'Sumatra Utara', 'Sumatra Barat', 'Riau', 'Kepulauan Riau',
    'Jambi', 'Sumatra Selatan', 'Kepulauan Bangka Belitung', 'Bengkulu', 'Lampung',
    'Banten', 'Jawa Barat', 'Jakarta', 'Jawa Tengah', 'Yogyakarta',
    'Jawa Timur', 'Bali', 'Nusa Tenggara Barat', 'Nusa Tenggara Timur',
    'Kalimantan Barat', 'Kalimantan Tengah', 'Kalimantan Selatan', 'Kalimantan Timur',
    'Kalimantan Utara', 'Sulawesi Utara', 'Sulawesi Tengah', 'Sulawesi Selatan',
    'Sulawesi Tenggara', 'Gorontalo', 'Sulawesi Barat', 'Maluku', 'Maluku Utara',
    'Papua Barat', 'Papua', 'Papua Selatan', 'Papua Tengah', 'Papua Pegunungan'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof FormData) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, [fieldName]: 'File tidak boleh lebih dari 10MB' }))
        return
      }
      
      // Check file type
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        setErrors(prev => ({ ...prev, [fieldName]: 'File harus berformat JPG, JPEG, atau PNG' }))
        return
      }
      
      setFormData(prev => ({ ...prev, [fieldName]: file }))
      setErrors(prev => ({ ...prev, [fieldName]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.namaLengkap.trim()) {
      newErrors.namaLengkap = 'Nama lengkap wajib diisi'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid'
    }

    if (!formData.password) {
      newErrors.password = 'Password wajib diisi'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password minimal 8 karakter'
    }

    if (formData.password !== formData.konfirmasiPassword) {
      newErrors.konfirmasiPassword = 'Password tidak cocok'
    }

    if (!formData.noWa.trim()) {
      newErrors.noWa = 'Nomor WhatsApp wajib diisi'
    } else if (!/^\d{10,13}$/.test(formData.noWa.replace(/[^\d]/g, ''))) {
      newErrors.noWa = 'Nomor WhatsApp tidak valid'
    }

    if (!formData.sekolah.trim()) {
      newErrors.sekolah = 'Asal sekolah wajib diisi'
    }

    if (!formData.provinsi) {
      newErrors.provinsi = 'Provinsi wajib dipilih'
    }

    if (!formData.kategori) {
      newErrors.kategori = 'Kategori lomba wajib dipilih'
    }

    if (!formData.buktiFollow) {
      newErrors.buktiFollow = 'Bukti follow media sosial wajib diupload'
    }

    if (!formData.buktiPembayaran) {
      newErrors.buktiPembayaran = 'Bukti pembayaran wajib diupload'
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
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Show success message
      alert('Pendaftaran berhasil! Silakan tunggu verifikasi pembayaran oleh admin. Info lebih lanjut hubungi WA admin 082274973133.')
      router.push('/')
    } catch (error) {
      alert('Terjadi kesalahan saat mendaftar. Silakan coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center text-math-primary hover:text-math-secondary">
            <ChevronLeft className="h-5 w-5 mr-1" />
            Kembali ke Beranda
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-math-dark mb-4">
              Formulir Pendaftaran
            </h1>
            <p className="text-lg text-gray-600">
              Isi semua data dengan benar untuk mendaftar Olimpiade MathVibe
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Data Diri */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-6 text-math-dark">Data Diri Peserta</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="inline h-4 w-4 mr-1" />
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    name="namaLengkap"
                    value={formData.namaLengkap}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-math-primary focus:border-transparent ${
                      errors.namaLengkap ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Masukkan nama lengkap"
                  />
                  {errors.namaLengkap && <p className="text-red-500 text-sm mt-1">{errors.namaLengkap}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="inline h-4 w-4 mr-1" />
                      Email Aktif *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-math-primary focus:border-transparent ${
                        errors.email ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="email@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="inline h-4 w-4 mr-1" />
                      Nomor WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="noWa"
                      value={formData.noWa}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-math-primary focus:border-transparent ${
                        errors.noWa ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="0821xxxxxxxxx"
                    />
                    {errors.noWa && <p className="text-red-500 text-sm mt-1">{errors.noWa}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password *
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-math-primary focus:border-transparent ${
                        errors.password ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Minimal 8 karakter"
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Konfirmasi Password *
                    </label>
                    <input
                      type="password"
                      name="konfirmasiPassword"
                      value={formData.konfirmasiPassword}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-math-primary focus:border-transparent ${
                        errors.konfirmasiPassword ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Ulangi password"
                    />
                    {errors.konfirmasiPassword && <p className="text-red-500 text-sm mt-1">{errors.konfirmasiPassword}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Data Sekolah */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-6 text-math-dark">Data Sekolah</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <School className="inline h-4 w-4 mr-1" />
                    Asal Sekolah *
                  </label>
                  <input
                    type="text"
                    name="sekolah"
                    value={formData.sekolah}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-math-primary focus:border-transparent ${
                      errors.sekolah ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Nama lengkap sekolah"
                  />
                  {errors.sekolah && <p className="text-red-500 text-sm mt-1">{errors.sekolah}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="inline h-4 w-4 mr-1" />
                      Provinsi *
                    </label>
                    <select
                      name="provinsi"
                      value={formData.provinsi}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-math-primary focus:border-transparent ${
                        errors.provinsi ? 'border-red-300' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Pilih Provinsi</option>
                      {provinsiList.map(provinsi => (
                        <option key={provinsi} value={provinsi}>{provinsi}</option>
                      ))}
                    </select>
                    {errors.provinsi && <p className="text-red-500 text-sm mt-1">{errors.provinsi}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Users className="inline h-4 w-4 mr-1" />
                      Kategori Lomba *
                    </label>
                    <select
                      name="kategori"
                      value={formData.kategori}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-math-primary focus:border-transparent ${
                        errors.kategori ? 'border-red-300' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Pilih Kategori</option>
                      <option value="SMP">SMP (Kelas 7-9)</option>
                      <option value="SMA">SMA (Kelas 10-12)</option>
                    </select>
                    {errors.kategori && <p className="text-red-500 text-sm mt-1">{errors.kategori}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Upload File */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-6 text-math-dark">Upload Berkas</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Upload className="inline h-4 w-4 mr-1" />
                    Bukti Follow Media Sosial MathVibe *
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-math-primary hover:text-math-secondary focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-math-primary">
                          <span>Upload file</span>
                          <input
                            type="file"
                            className="sr-only"
                            accept=".jpg,.jpeg,.png"
                            onChange={(e) => handleFileChange(e, 'buktiFollow')}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                  {formData.buktiFollow && (
                    <p className="text-sm text-green-600 mt-2">✓ {formData.buktiFollow.name}</p>
                  )}
                  {errors.buktiFollow && <p className="text-red-500 text-sm mt-1">{errors.buktiFollow}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Upload className="inline h-4 w-4 mr-1" />
                    Bukti Pembayaran *
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-math-primary hover:text-math-secondary focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-math-primary">
                          <span>Upload file</span>
                          <input
                            type="file"
                            className="sr-only"
                            accept=".jpg,.jpeg,.png"
                            onChange={(e) => handleFileChange(e, 'buktiPembayaran')}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                  {formData.buktiPembayaran && (
                    <p className="text-sm text-green-600 mt-2">✓ {formData.buktiPembayaran.name}</p>
                  )}
                  {errors.buktiPembayaran && <p className="text-red-500 text-sm mt-1">{errors.buktiPembayaran}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Upload className="inline h-4 w-4 mr-1" />
                    ID Pelajar (Opsional)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-math-primary hover:text-math-secondary focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-math-primary">
                          <span>Upload file</span>
                          <input
                            type="file"
                            className="sr-only"
                            accept=".jpg,.jpeg,.png"
                            onChange={(e) => handleFileChange(e, 'idPelajar')}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                  {formData.idPelajar && (
                    <p className="text-sm text-green-600 mt-2">✓ {formData.idPelajar.name}</p>
                  )}
                  {errors.idPelajar && <p className="text-red-500 text-sm mt-1">{errors.idPelajar}</p>}
                </div>
              </div>
            </div>

            {/* Syarat & Ketentuan */}
            <div className="card">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="setuju"
                  className="mt-1 h-4 w-4 text-math-primary focus:ring-math-primary border-gray-300 rounded"
                  required
                />
                <label htmlFor="setuju" className="ml-3 text-sm text-gray-700">
                  Saya menyetujui semua syarat dan ketentuan yang berlaku dalam Olimpiade Matematika MathVibe Indonesia. 
                  Saya bertanggung jawab atas keaslian data yang saya kirimkan dan bersedia menerima sanksi jika terbukti melanggar aturan.
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary text-lg px-12 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Mengirim...
                  </span>
                ) : (
                  'Daftar Sekarang'
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}