'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Users, 
  DollarSign, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye, 
  Download,
  Search,
  Filter,
  LogOut,
  Settings,
  FileText,
  Award,
  Monitor
} from 'lucide-react'

interface Peserta {
  id: string
  nama: string
  email: string
  sekolah: string
  provinsi: string
  kategori: string
  noWa: string
  statusPembayaran: 'waiting_verification' | 'verified' | 'rejected'
  statusAkun: 'created' | 'active'
  tanggalDaftar: string
  buktiFollow: string
  buktiPembayaran: string
  passwordVisible: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [adminEmail, setAdminEmail] = useState('')
  const [adminRole, setAdminRole] = useState('')
  const [peserta, setPeserta] = useState<Peserta[]>([])
  const [filteredPeserta, setFilteredPeserta] = useState<Peserta[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)

  // Mock data peserta
  const mockPeserta: Peserta[] = [
    {
      id: '1',
      nama: 'Andi Wijaya',
      email: 'andi.wijaya@gmail.com',
      sekolah: 'SMP Negeri 1 Jakarta',
      provinsi: 'Jakarta',
      kategori: 'SMP',
      noWa: '081234567890',
      statusPembayaran: 'waiting_verification',
      statusAkun: 'created',
      tanggalDaftar: '2024-10-19',
      buktiFollow: '/proofs/follow1.jpg',
      buktiPembayaran: '/proofs/payment1.jpg',
      passwordVisible: 'andi123456'
    },
    {
      id: '2',
      nama: 'Budi Santoso',
      email: 'budi.santoso@yahoo.com',
      sekolah: 'SMA Negeri 2 Bandung',
      provinsi: 'Jawa Barat',
      kategori: 'SMA',
      noWa: '082345678901',
      statusPembayaran: 'verified',
      statusAkun: 'active',
      tanggalDaftar: '2024-10-18',
      buktiFollow: '/proofs/follow2.jpg',
      buktiPembayaran: '/proofs/payment2.jpg',
      passwordVisible: 'budi654321'
    },
    {
      id: '3',
      nama: 'Citra Lestari',
      email: 'citra.lestari@gmail.com',
      sekolah: 'SMP Negeri 3 Surabaya',
      provinsi: 'Jawa Timur',
      kategori: 'SMP',
      noWa: '083456789012',
      statusPembayaran: 'rejected',
      statusAkun: 'created',
      tanggalDaftar: '2024-10-17',
      buktiFollow: '/proofs/follow3.jpg',
      buktiPembayaran: '/proofs/payment3.jpg',
      passwordVisible: 'citra789012'
    }
  ]

  useEffect(() => {
    // Check if admin is logged in
    const storedEmail = localStorage.getItem('adminEmail')
    const storedRole = localStorage.getItem('adminRole')
    
    if (!storedEmail) {
      router.push('/admin')
      return
    }
    
    setAdminEmail(storedEmail)
    setAdminRole(storedRole || 'Admin')
    
    // Load peserta data
    setTimeout(() => {
      setPeserta(mockPeserta)
      setFilteredPeserta(mockPeserta)
      setIsLoading(false)
    }, 1000)
  }, [router])

  useEffect(() => {
    let filtered = peserta

    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sekolah.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(p => p.statusPembayaran === filterStatus)
    }

    setFilteredPeserta(filtered)
  }, [searchTerm, filterStatus, peserta])

  const handleLogout = () => {
    localStorage.removeItem('adminEmail')
    localStorage.removeItem('adminRole')
    router.push('/admin')
  }

  const handleVerifikasi = (id: string, status: 'verified' | 'rejected') => {
    setPeserta(prev => prev.map(p => 
      p.id === id 
        ? { 
            ...p, 
            statusPembayaran: status,
            statusAkun: status === 'verified' ? 'active' : 'created'
          }
        : p
    ))
  }

  const handleResetPassword = (id: string) => {
    const newPassword = prompt('Masukkan password baru untuk peserta ini:')
    if (newPassword && newPassword.length >= 8) {
      setPeserta(prev => prev.map(p => 
        p.id === id 
          ? { ...p, passwordVisible: newPassword }
          : p
      ))
      alert('Password berhasil diupdate!')
    } else if (newPassword) {
      alert('Password minimal 8 karakter!')
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Terverifikasi
          </span>
        )
      case 'waiting_verification':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Menunggu Verifikasi
          </span>
        )
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            Ditolak
          </span>
        )
      default:
        return null
    }
  }

  const stats = {
    total: peserta.length,
    verified: peserta.filter(p => p.statusPembayaran === 'verified').length,
    pending: peserta.filter(p => p.statusPembayaran === 'waiting_verification').length,
    rejected: peserta.filter(p => p.statusPembayaran === 'rejected').length
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-math-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data peserta...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-math-primary mr-3" />
              <div>
                <h1 className="text-xl font-bold text-math-dark">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">{adminRole} - {adminEmail}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/admin/cbt')}
                className="btn-secondary text-sm px-4 py-2"
              >
                <Monitor className="inline h-4 w-4 mr-1" />
                CBT Control
              </button>
              <button
                onClick={() => router.push('/admin/soal')}
                className="btn-secondary text-sm px-4 py-2"
              >
                <FileText className="inline h-4 w-4 mr-1" />
                Kelola Soal
              </button>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 text-sm flex items-center"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="card text-center">
              <div className="text-2xl font-bold text-math-primary">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Peserta</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-green-600">{stats.verified}</div>
              <div className="text-sm text-gray-600">Terverifikasi</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <div className="text-sm text-gray-600">Menunggu</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
              <div className="text-sm text-gray-600">Ditolak</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-8">
        <div className="card">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
            <h2 className="text-2xl font-bold text-math-dark">Data Peserta</h2>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari peserta..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-math-primary focus:border-transparent"
                />
              </div>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-math-primary focus:border-transparent"
              >
                <option value="all">Semua Status</option>
                <option value="waiting_verification">Menunggu Verifikasi</option>
                <option value="verified">Terverifikasi</option>
                <option value="rejected">Ditolak</option>
              </select>
              
              <button className="btn-secondary text-sm px-4 py-2 flex items-center">
                <Download className="h-4 w-4 mr-1" />
                Export CSV
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sekolah</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPeserta.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{p.nama}</div>
                      <div className="text-sm text-gray-500">{p.noWa}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.sekolah}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {p.kategori}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(p.statusPembayaran)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => alert('Fitur preview akan segera tersedia')}
                          className="text-blue-600 hover:text-blue-900"
                          title="Lihat Bukti"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        
                        {p.statusPembayaran === 'waiting_verification' && (
                          <>
                            <button
                              onClick={() => handleVerifikasi(p.id, 'verified')}
                              className="text-green-600 hover:text-green-900"
                              title="Setujui"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleVerifikasi(p.id, 'rejected')}
                              className="text-red-600 hover:text-red-900"
                              title="Tolak"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          </>
                        )}
                        
                        <button
                          onClick={() => handleResetPassword(p.id)}
                          className="text-purple-600 hover:text-purple-900"
                          title="Reset Password"
                        >
                          <Settings className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPeserta.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Tidak ada data peserta yang sesuai dengan filter</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}