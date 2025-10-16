import Link from 'next/link'
import { ChevronLeft, BookOpen, Target, Shield, Clock, Award, AlertTriangle } from 'lucide-react'

export default function JuknisPage() {
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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-math-dark mb-4">
              Petunjuk Teknis
            </h1>
            <p className="text-xl text-gray-600">
              Olimpiade Matematika MathVibe Indonesia 2024
            </p>
          </div>

          {/* Visi & Misi */}
              <section className="card mb-8">
            <div className="flex items-center mb-6">
              <BookOpen className="h-8 w-8 text-math-primary mr-3" />
              <h2 className="text-2xl font-bold text-math-dark">Visi, Misi & Motto</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Visi</h3>
                <p className="text-gray-600">
                  Menjadi kompetisi matematika nasional yang kompetitif, inovatif, dan berkelas dunia.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Misi</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Meningkatkan minat dan bakat siswa dalam bidang matematika</li>
                  <li>• Menyediakan platform kompetisi yang adil dan transparan</li>
                  <li>• Mengembangkan sistem CBT yang modern dan anti-kecurangan</li>
                  <li>• Membangun komunitas matematika yang solid di Indonesia</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Motto</h3>
                <p className="text-math-primary font-semibold text-lg">
                  "Kompetitif, Jujur, Adil, Terbuka dalam Kecepatan dan Ketepatan Berhitung"
                </p>
              </div>
            </div>
          </section>

          {/* Informasi Lomba */}
          <section className="card mb-8">
            <div className="flex items-center mb-6">
              <Target className="h-8 w-8 text-math-primary mr-3" />
              <h2 className="text-2xl font-bold text-math-dark">Informasi Lomba</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-math-primary">Kategori SMP</h3>
                <ul className="space-y-2 text-gray-600">
                  <li><strong>Penyisihan:</strong> 30 soal / 30 menit</li>
                  <li><strong>Final:</strong> 15 soal / 15 detik per soal</li>
                  <li><strong>Penilaian:</strong> Benar +3, Salah -1, Kosong 0</li>
                  <li><strong>Peserta:</strong> Siswa SMP kelas 7-9</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 text-math-secondary">Kategori SMA</h3>
                <ul className="space-y-2 text-gray-600">
                  <li><strong>Penyisihan:</strong> 40 soal / 45 menit</li>
                  <li><strong>Final:</strong> 20 soal / 20 detik per soal</li>
                  <li><strong>Penilaian:</strong> Benar +3, Salah -1, Kosong 0</li>
                  <li><strong>Peserta:</strong> Siswa SMA kelas 10-12</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Mekanisme Perlombaan */}
          <section className="card mb-8">
            <div className="flex items-center mb-6">
              <Clock className="h-8 w-8 text-math-primary mr-3" />
              <h2 className="text-2xl font-bold text-math-dark">Mekanisme Perlombaan</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Babak Penyisihan</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Dilaksanakan secara online melalui sistem CBT</li>
                  <li>• Soal pilihan ganda dengan 4 opsi jawaban</li>
                  <li>• Sistem penilaian otomatis oleh komputer</li>
                  <li>• Peserta dengan nilai tertinggi maju ke babak final</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Babak Final</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Sistem waktu per soal (time-based)</li>
                  <li>• Soal akan berpindah otomatis setelah waktu habis</li>
                  <li>• Peserta tidak dapat kembali ke soal sebelumnya</li>
                  <li>• Kecepatan dan ketepatan menjadi kunci kemenangan</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Larangan & Sanksi */}
          <section className="card mb-8">
            <div className="flex items-center mb-6">
              <Shield className="h-8 w-8 text-red-500 mr-3" />
              <h2 className="text-2xl font-bold text-math-dark">Larangan & Sanksi</h2>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-red-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-red-800 mb-3">Larangan Selama Ujian:</h3>
                  <ul className="text-red-700 space-y-2">
                    <li>• Menggunakan kalkulator atau alat bantu hitung apa pun</li>
                    <li>• Menggunakan bantuan AI (ChatGPT, dll.)</li>
                    <li>• Meminta bantuan dari orang lain</li>
                    <li>• Membuka tab atau jendela browser lain</li>
                    <li>• Menggunakan ponsel atau perangkat lain</li>
                    <li>• Melakukan screenshot atau merekam layar</li>
                  </ul>
                  
                  <div className="mt-4 p-4 bg-red-100 rounded-lg">
                    <p className="font-semibold text-red-800">
                      Pelanggaran akan mengakibatkan DISQUALIFIKASI OTOMATIS dari kompetisi!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Jadwal & Biaya */}
          <section className="card mb-8">
            <div className="flex items-center mb-6">
              <Award className="h-8 w-8 text-math-primary mr-3" />
              <h2 className="text-2xl font-bold text-math-dark">Jadwal & Biaya</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Jadwal Penting</h3>
                <ul className="space-y-2 text-gray-600">
                  <li><strong>Pendaftaran:</strong> 19 Oktober - 9 November 2024</li>
                  <li><strong>Babak Penyisihan:</strong> 16 November 2024</li>
                  <li><strong>Pengumuman Finalis:</strong> 18 November 2024</li>
                  <li><strong>Babak Final:</strong> 23 November 2024</li>
                  <li><strong>Pengumuman Pemenang:</strong> 25 November 2024</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Biaya Pendaftaran</h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-800">Rp 30.000</div>
                    <div className="text-sm text-green-600">Diskon Launching 40%</div>
                    <div className="text-sm text-gray-500 line-through">Rp 50.000</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Hadiah */}
          <section className="card mb-8">
            <div className="flex items-center mb-6">
              <DollarSign className="h-8 w-8 text-math-primary mr-3" />
              <h2 className="text-2xl font-bold text-math-dark">Total Hadiah Rp 5.500.000</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-math-primary">Kategori SMP</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>🥇 Juara 1: Rp 750.000</li>
                  <li>🥈 Juara 2: Rp 500.000</li>
                  <li>🥉 Juara 3: Rp 250.000</li>
                  <li>🏅 Harapan 1-5: Rp 100.000</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 text-math-secondary">Kategori SMA</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>🥇 Juara 1: Rp 750.000</li>
                  <li>🥈 Juara 2: Rp 500.000</li>
                  <li>🥉 Juara 3: Rp 250.000</li>
                  <li>🏅 Harapan 1-5: Rp 100.000</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Metode Pembayaran */}
          <section className="card mb-8">
            <div className="flex items-center mb-6">
              <DollarSign className="h-8 w-8 text-math-primary mr-3" />
              <h2 className="text-2xl font-bold text-math-dark">Metode Pembayaran</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3 text-blue-800">DANA</h3>
                <p className="text-blue-700">
                  <strong>0822-7497-3133</strong><br />
                  SOFYAN HADI (Admin 1)
                </p>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3 text-green-800">BANK BRI</h3>
                <p className="text-green-700">
                  <strong>0323-01-009069-53-8</strong><br />
                  ROSI EVI SUSANTI (Admin 2)
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center">
            <Link href="/daftar" className="btn-primary text-lg inline-flex items-center">
              Daftar Sekarang
              <ChevronLeft className="ml-2 h-5 w-5 rotate-180" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}