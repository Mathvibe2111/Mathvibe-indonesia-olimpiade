# MathVibe Olimpiade Indonesia

Website resmi Olimpiade Matematika MathVibe Indonesia dengan sistem pendaftaran online, verifikasi pembayaran, dashboard admin multi-level, dan CBT (Computer Based Test) modern.

## 🌐 Fitur Utama

### A. Landing Page
- Statistik real-time peserta terdaftar
- Informasi hadiah dan kategori lomba
- Tautan media sosial dan kontak admin
- Desain modern dan responsive

### B. Sistem Pendaftaran
- Formulir pendaftaran lengkap dengan validasi
- Upload bukti follow media sosial
- Upload bukti pembayaran
- Simpan password peserta untuk admin reset

### C. Dashboard Admin Multi-Level
- **Super Admin**: Akses penuh ke semua fitur
- **Admin Pembayaran**: Verifikasi pembayaran DANA/BRI
- **Admin CBT**: Kontrol ujian dan monitor peserta

### D. Sistem CBT (Computer Based Test)
- Timer otomatis per soal
- Anti-cheat system (deteksi keluar tab)
- Soal acak per peserta
- Penilaian otomatis

### E. Keamanan
- Password hashing dengan bcrypt
- JWT authentication
- Rate limiting
- Input validation

## 🛠️ Teknologi yang Digunakan

### Frontend
- **Next.js 14** - Framework React modern
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first CSS
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing

### Database
- **Supabase** - Backend as a Service
- **PostgreSQL** - Database
- **Realtime subscriptions** - Live updates

### Deployment
- **Vercel** - Frontend hosting
- **GitHub Actions** - CI/CD pipeline

## 📁 Struktur Project

```
mathvibe-olimpiade/
├── frontend/
│   └── mathvibe-frontend/     # Next.js application
│       ├── app/               # App directory (Next.js 13+)
│       ├── components/        # React components
│       ├── lib/               # Utility functions
│       └── public/            # Static assets
├── backend/                   # Express.js API
│   ├── routes/                # API routes
│   ├── middleware/            # Custom middleware
│   └── utils/                 # Utility functions
├── database/                  # Database schema and migrations
│   └── schema.sql            # PostgreSQL schema
├── docs/                      # Documentation
└── README.md                 # Project documentation
```

## 🚀 Instalasi dan Setup

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- Git

### Langkah Instalasi

1. **Clone Repository**
```bash
git clone https://github.com/Mathvibe2111/Mathvibe-indonesia-olimpiade.git
cd Mathvibe-indonesia-olimpiade
```

2. **Setup Frontend**
```bash
cd frontend/mathvibe-frontend
npm install
```

3. **Setup Backend**
```bash
cd ../../backend
npm install
```

4. **Setup Environment Variables**
```bash
# Copy environment file
cp frontend/mathvibe-frontend/.env.example frontend/mathvibe-frontend/.env.local

# Edit .env.local with your configuration
nano frontend/mathvibe-frontend/.env.local
```

5. **Setup Database**
```bash
# Create PostgreSQL database
createdb mathvibe_olimpiade

# Run database migrations
psql -d mathvibe_olimpiade -f database/schema.sql
```

6. **Run Development Server**
```bash
# Frontend
cd frontend/mathvibe-frontend
npm run dev

# Backend (in another terminal)
cd backend
npm run dev
```

## 📊 Database Schema

### Tabel Utama

#### participants
- `id` - UUID primary key
- `nama_lengkap` - Nama peserta
- `email` - Email unik
- `password_hash` - Password ter-hash
- `dashboard_password_visible` - Password plain text (untuk admin reset)
- `payment_status` - Status pembayaran
- `account_status` - Status akun

#### admins
- `id` - UUID primary key
- `email` - Email admin
- `password_hash` - Password ter-hash
- `role` - Role admin (super_admin, payment_admin, cbt_admin)

#### questions
- `id` - UUID primary key
- `question` - Teks soal
- `option_a/b/c/d` - Pilihan jawaban
- `correct_option` - Jawaban benar
- `category` - Kategori (SMP/SMA)
- `round` - Babak (preliminary/final)

#### results
- `id` - UUID primary key
- `participant_id` - Foreign key ke participants
- `score` - Nilai akhir
- `total_correct/wrong/blank` - Statistik jawaban
- `violations` - Jumlah pelanggaran

## 🔐 Admin Accounts

### Default Admin Login
- **Super Admin**: `superadmin@mathvibe.id` / `210908110708`
- **Admin DANA**: `admin1@mathvibe.id` / `admin123`
- **Admin BRI**: `admin2@mathvibe.id` / `admin123`

> ⚠️ **PENTING**: Segera ganti password default setelah login pertama!

## 📱 API Endpoints

### Authentication
- `POST /api/auth/login` - Login peserta/admin
- `POST /api/auth/admin/login` - Login admin
- `POST /api/auth/verify` - Verifikasi token

### Participants
- `GET /api/participants` - Get semua peserta
- `POST /api/participants/register` - Registrasi peserta
- `PATCH /api/participants/:id/status` - Update status peserta
- `PATCH /api/participants/:id/reset-password` - Reset password

### CBT System
- `GET /api/questions` - Get soal
- `POST /api/results` - Submit jawaban
- `GET /api/results/:id` - Get hasil

## 🎯 Fitur Keamanan

### Password Storage
- ✅ Password di-hash dengan bcrypt
- ✅ Salt rounds configurable
- ✅ Password plain text tersimpan untuk admin reset (sesuai permintaan)

### Authentication
- ✅ JWT tokens dengan expiration
- ✅ Refresh token mechanism
- ✅ Role-based access control

### Input Validation
- ✅ Server-side validation
- ✅ File upload restrictions
- ✅ SQL injection prevention

## 🚨 Peringatan Keamanan

**Penyimpanan Password Plain Text**
> Sistem ini menyimpan password peserta dalam format plain text di field `dashboard_password_visible` sesuai permintaan pemilik. Ini memiliki risiko keamanan tinggi dan tidak disarankan untuk production environment.

**Rekomendasi Keamanan:**
1. Gunakan hashing password (bcrypt) saja
2. Implementasi reset password dengan OTP/email
3. Tambahkan audit logging untuk semua aksi admin
4. Encrypt database at rest
5. Implementasi 2FA untuk admin

## 🌐 Deployment

### Vercel (Frontend)
1. Connect GitHub repository ke Vercel
2. Setup environment variables
3. Configure build settings
4. Deploy

### Backend Deployment
Opsi deployment backend:
- Vercel Functions (serverless)
- Railway.app
- Render.com
- DigitalOcean App Platform

### Database
- Supabase (recommended)
- PlanetScale
- Railway PostgreSQL
- AWS RDS

## 📈 Monitoring dan Analytics

### Rekomendasi Tools
- **Sentry** - Error tracking
- **Vercel Analytics** - Performance monitoring
- **PostgreSQL Monitoring** - Database health
- **Uptime Robot** - Uptime monitoring

## 🔧 Maintenance

### Backup Strategy
- Daily database backup
- File storage backup
- Configuration backup
- Test restore regularly

### Update Schedule
- Security patches: ASAP
- Dependency updates: Monthly
- Feature updates: Quarterly

## 📞 Support

### Kontak Admin
- **WhatsApp**: [082274973133](https://wa.me/6282274973133)
- **Email**: admin@mathvibe.id

### Media Sosial
- **Instagram**: [@mathvibe.indonesia](https://instagram.com/mathvibe.indonesia)
- **TikTok**: [mathvibe.id](https://tiktok.com/@mathvibe.id)
- **YouTube**: [mathvibe.id](https://youtube.com/@mathvibe.id)

## 📄 Lisensi

© 2024 MathVibe Indonesia. Hak Cipta Dilindungi.

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📝 Changelog

### v1.0.0 (16 Oktober 2024)
- Initial release
- Landing page dengan statistik
- Sistem pendaftaran lengkap
- Dashboard admin multi-level
- CBT dengan anti-cheat
- Database schema
- API endpoints
- Deployment setup

---

**Dibuat dengan ❤️ untuk pendidikan matematika Indonesia**