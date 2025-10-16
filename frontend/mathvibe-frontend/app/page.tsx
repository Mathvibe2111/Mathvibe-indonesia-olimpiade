import Link from 'next/link'
import { ChevronRight, Users, Trophy, MapPin, DollarSign, Instagram, Youtube, MessageCircle } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Olimpiade Matematika
              <span className="block text-yellow-300">MathVibe Indonesia</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Kompetisi matematika nasional untuk SMP dan SMA dengan sistem CBT modern dan hadiah total Rp 5.500.000
            </p>
            <Link href="/daftar" className="btn-primary inline-flex items-center text-lg">
              Daftar Sekarang
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          
          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-300">250</div>
              <div className="text-sm md:text-base">Peserta Terdaftar</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-300">250</div>
              <div className="text-sm md:text-base">Sudah Bayar</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-300">15</div>
              <div className="text-sm md:text-base">Provinsi</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-300">5.5JT</div>
              <div className="text-sm md:text-base">Total Hadiah</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-math-dark">
            Mengapa Memilih MathVibe?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-math-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Sistem CBT Modern</h3>
              <p className="text-gray-600">Ujian berbasis komputer dengan timer otomatis dan deteksi kecurangan</p>
            </div>
            
            <div className="card text-center">
              <div className="w-16 h-16 bg-math-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Hadiah Menarik</h3>
              <p className="text-gray-600">Total hadiah Rp 5.500.000 untuk pemenang di setiap kategori</p>
            </div>
            
            <div className="card text-center">
              <div className="w-16 h-16 bg-math-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Nasional</h3>
              <p className="text-gray-600">Terbuka untuk seluruh peserta SMP dan SMA dari berbagai provinsi</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-math-dark">
            Kategori Lomba
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card">
              <h3 className="text-2xl font-bold mb-4 text-math-primary">SMP</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Penyisihan: 30 soal / 30 menit</li>
                <li>• Final: 15 soal / 15 detik per soal</li>
                <li>• Penilaian: benar +3, salah -1, kosong 0</li>
                <li>• Biaya pendaftaran: Rp 30.000</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-2xl font-bold mb-4 text-math-secondary">SMA</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Penyisihan: 40 soal / 45 menit</li>
                <li>• Final: 20 soal / 20 detik per soal</li>
                <li>• Penilaian: benar +3, salah -1, kosong 0</li>
                <li>• Biaya pendaftaran: Rp 30.000</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-math-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Siap Menguji Kemampuan Matematikamu?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Daftar sekarang dan dapatkan diskon launching hingga 40%. Pendaftaran dibuka 19 Oktober selama 3 minggu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/daftar" className="btn-primary">
              Daftar Sekarang
            </Link>
            <Link href="/juknis" className="btn-secondary text-math-primary">
              Lihat Petunjuk Teknis
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">MathVibe Indonesia</h3>
              <p className="text-gray-400">
                Olimpiade matematika nasional dengan sistem CBT modern untuk SMP dan SMA.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Sosial Media</h3>
              <div className="space-y-2">
                <a href="https://instagram.com/mathvibe.indonesia" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-400 hover:text-white">
                  <Instagram className="h-4 w-4 mr-2" />
                  @mathvibe.indonesia
                </a>
                <a href="https://tiktok.com/@mathvibe.id" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-400 hover:text-white">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  mathvibe.id
                </a>
                <a href="https://youtube.com/@mathvibe.id" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-400 hover:text-white">
                  <Youtube className="h-4 w-4 mr-2" />
                  mathvibe.id
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Kontak Admin</h3>
              <a href="https://wa.me/6282274973133" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-400 hover:text-white">
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp: 0822-7497-3133
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MathVibe Indonesia. Hak Cipta Dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}