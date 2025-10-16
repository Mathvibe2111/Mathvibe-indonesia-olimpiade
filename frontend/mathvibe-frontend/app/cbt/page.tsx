'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  ChevronRight, 
  ChevronLeft,
  Monitor,
  Eye,
  EyeOff
} from 'lucide-react'

interface Soal {
  id: string
  pertanyaan: string
  pilihanA: string
  pilihanB: string
  pilihanC: string
  pilihanD: string
  jawabanBenar: string
  jawabanPeserta: string | null
}

export default function CBTPage() {
  const router = useRouter()
  const [isActive, setIsActive] = useState(false)
  const [currentSoal, setCurrentSoal] = useState(0)
  const [waktuTersisa, setWaktuTersisa] = useState(1800) // 30 menit
  const [soalTerjawab, setSoalTerjawab] = useState<Record<string, string>>({})
  const [pelanggaran, setPelanggaran] = useState(0)
  const [showWarning, setShowWarning] = useState(false)
  const [ujianSelesai, setUjianSelesai] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Mock data soal
  const soal: Soal[] = [
    {
      id: '1',
      pertanyaan: 'Jika 2x + 5 = 13, maka nilai x adalah...',
      pilihanA: '3',
      pilihanB: '4',
      pilihanC: '5',
      pilihanD: '6',
      jawabanBenar: 'B',
      jawabanPeserta: null
    },
    {
      id: '2',
      pertanyaan: 'Diketahui sebuah segitiga siku-siku dengan panjang sisi tegak 3 cm dan 4 cm. Panjang sisi miringnya adalah...',
      pilihanA: '5 cm',
      pilihanB: '6 cm',
      pilihanC: '7 cm',
      pilihanD: '8 cm',
      jawabanBenar: 'A',
      jawabanPeserta: null
    },
    {
      id: '3',
      pertanyaan: 'Hasil dari 15% dari 240 adalah...',
      pilihanA: '36',
      pilihanB: '48',
      pilihanC: '60',
      pilihanD: '72',
      jawabanBenar: 'A',
      jawabanPeserta: null
    },
    {
      id: '4',
      pertanyaan: 'Jika f(x) = 2x² - 3x + 1, maka f(3) adalah...',
      pilihanA: '8',
      pilihanB: '10',
      pilihanC: '12',
      pilihanD: '14',
      jawabanBenar: 'B',
      jawabanPeserta: null
    },
    {
      id: '5',
      pertanyaan: 'Dalam sebuah deret aritmatika, suku pertama 3 dan beda 4. Suku ke-10 adalah...',
      pilihanA: '35',
      pilihanB: '37',
      pilihanC: '39',
      pilihanD: '41',
      jawabanBenar: 'C',
      jawabanPeserta: null
    }
  ]

  useEffect(() => {
    // Check if CBT is active
    const checkCBTStatus = () => {
      // Simulate CBT active status
      setIsActive(true)
    }
    
    checkCBTStatus()
  }, [])

  useEffect(() => {
    if (!isActive || ujianSelesai) return

    const timer = setInterval(() => {
      setWaktuTersisa(prev => {
        if (prev <= 1) {
          setUjianSelesai(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isActive, ujianSelesai])

  useEffect(() => {
    // Anti-cheat detection
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setPelanggaran(prev => prev + 1)
        setShowWarning(true)
        setTimeout(() => setShowWarning(false), 3000)
      }
    }

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    document.addEventListener('fullscreenchange', handleFullscreenChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  const formatWaktu = (detik: number) => {
    const menit = Math.floor(detik / 60)
    const sisaDetik = detik % 60
    return `${menit.toString().padStart(2, '0')}:${sisaDetik.toString().padStart(2, '0')}`
  }

  const handleJawab = (soalId: string, jawaban: string) => {
    setSoalTerjawab(prev => ({ ...prev, [soalId]: jawaban }))
  }

  const handleNext = () => {
    if (currentSoal < soal.length - 1) {
      setCurrentSoal(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentSoal > 0) {
      setCurrentSoal(prev => prev - 1)
    }
  }

  const handleSelesai = () => {
    setUjianSelesai(true)
  }

  const enterFullscreen = async () => {
    try {
      await document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } catch (error) {
      console.log('Fullscreen not supported')
    }
  }

  const hitungNilai = () => {
    let benar = 0
    let salah = 0
    let kosong = 0

    soal.forEach(s => {
      const jawabanPeserta = soalTerjawab[s.id]
      if (!jawabanPeserta) {
        kosong++
      } else if (jawabanPeserta === s.jawabanBenar) {
        benar++
      } else {
        salah++
      }
    })

    const nilai = (benar * 3) - (salah * 1)
    return { benar, salah, kosong, nilai }
  }

  if (!isActive) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Monitor className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">CBT Belum Aktif</h2>
          <p className="text-gray-600 mb-6">
            Ujian akan dimulai sesuai jadwal yang telah ditentukan. Silakan kembali lagi nanti.
          </p>
          <button
            onClick={() => router.push('/dashboard-peserta')}
            className="btn-primary"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    )
  }

  if (ujianSelesai) {
    const hasil = hitungNilai()
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <Award className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ujian Selesai!</h2>
          
          <div className="space-y-4 mb-6">
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-green-800 font-semibold">Jawaban Benar: {hasil.benar}</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <p className="text-red-800 font-semibold">Jawaban Salah: {hasil.salah}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-800 font-semibold">Tidak Dijawab: {hasil.kosong}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-blue-800 font-bold text-xl">Total Nilai: {hasil.nilai}</p>
            </div>
          </div>

          {pelanggaran > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <p className="text-yellow-800 text-sm">
                ⚠️ Anda melakukan {pelanggaran} pelanggaran selama ujian.
              </p>
            </div>
          )}

          <button
            onClick={() => router.push('/dashboard-peserta')}
            className="btn-primary w-full"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    )
  }

  if (pelanggaran >= 3) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-800 mb-4">Ujian Dihentikan!</h2>
          <p className="text-gray-600 mb-6">
            Anda telah melakukan 3 kali pelanggaran (keluar tab/minimize). 
            Ujian Anda dihentikan secara otomatis.
          </p>
          <button
            onClick={() => router.push('/dashboard-peserta')}
            className="btn-primary"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    )
  }

  const soalAktif = soal[currentSoal]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Warning Banner */}
      {showWarning && (
        <div className="bg-red-500 text-white p-4 text-center">
          <AlertTriangle className="inline h-5 w-5 mr-2" />
          <strong>Peringatan!</strong> Jangan keluar dari halaman ini! ({pelanggaran}/3 pelanggaran)
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Monitor className="h-8 w-8 text-math-primary mr-3" />
              <div>
                <h1 className="text-xl font-bold text-math-dark">CBT MathVibe</h1>
                <p className="text-sm text-gray-600">Olimpiade Matematika Indonesia</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              {/* Timer */}
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-math-primary mr-2" />
                <span className="text-lg font-bold text-math-primary">
                  {formatWaktu(waktuTersisa)}
                </span>
              </div>
              
              {/* Fullscreen Button */}
              {!isFullscreen && (
                <button
                  onClick={enterFullscreen}
                  className="btn-secondary text-sm px-3 py-1"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Fullscreen
                </button>
              )}
              
              {/* Progress */}
              <div className="text-sm text-gray-600">
                Soal {currentSoal + 1} dari {soal.length}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-gray-200 h-2">
        <div 
          className="bg-math-primary h-2 transition-all duration-300"
          style={{ width: `${((currentSoal + 1) / soal.length) * 100}%` }}
        />
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="card">
          {/* Soal */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Soal {currentSoal + 1}
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              {soalAktif.pertanyaan}
            </p>

            {/* Pilihan Jawaban */}
            <div className="space-y-3">
              {['A', 'B', 'C', 'D'].map((pilihan) => {
                const isSelected = soalTerjawab[soalAktif.id] === pilihan
                const jawabanText = soalAktif[`pilihan${pilihan}` as keyof Soal]
                
                return (
                  <label
                    key={pilihan}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                      isSelected
                        ? 'border-math-primary bg-math-primary/5'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`soal-${soalAktif.id}`}
                      value={pilihan}
                      checked={isSelected}
                      onChange={() => handleJawab(soalAktif.id, pilihan)}
                      className="sr-only"
                    />
                    <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                      isSelected ? 'border-math-primary bg-math-primary' : 'border-gray-300'
                    }`}>
                      {isSelected && (
                        <CheckCircle className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <span className="font-medium mr-3">{pilihan}.</span>
                    <span>{jawabanText}</span>
                  </label>
                )
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 border-t">
            <button
              onClick={handlePrev}
              disabled={currentSoal === 0}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Sebelumnya
            </button>

            <div className="flex space-x-4">
              {currentSoal === soal.length - 1 ? (
                <button
                  onClick={handleSelesai}
                  className="btn-primary flex items-center"
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Selesai Ujian
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="btn-primary flex items-center"
                >
                  Selanjutnya
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Nomor Soal */}
        <div className="card mt-6">
          <h3 className="font-semibold mb-4">Navigasi Soal</h3>
          <div className="grid grid-cols-5 gap-2">
            {soal.map((_, index) => {
              const isAnswered = soalTerjawab[soal[index].id]
              const isCurrent = index === currentSoal
              
              return (
                <button
                  key={index}
                  onClick={() => setCurrentSoal(index)}
                  className={`p-3 rounded-lg text-sm font-medium transition-all ${
                    isCurrent
                      ? 'bg-math-primary text-white'
                      : isAnswered
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}