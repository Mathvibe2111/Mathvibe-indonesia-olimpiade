-- Database Schema for MathVibe Olimpiade Indonesia
-- Created: 2024-10-16

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: participants
CREATE TABLE participants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nama_lengkap VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    dashboard_password_visible VARCHAR(255) NOT NULL, -- For admin reset feature
    no_wa VARCHAR(20) NOT NULL,
    sekolah VARCHAR(255) NOT NULL,
    provinsi VARCHAR(100) NOT NULL,
    kategori VARCHAR(10) NOT NULL CHECK (kategori IN ('SMP', 'SMA')),
    payment_status VARCHAR(50) DEFAULT 'waiting_verification' CHECK (payment_status IN ('waiting_verification', 'verified', 'rejected')),
    account_status VARCHAR(50) DEFAULT 'created' CHECK (account_status IN ('created', 'active')),
    proof_follow_url TEXT,
    proof_payment_url TEXT,
    id_pelajar_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: payments
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    participant_id UUID REFERENCES participants(id) ON DELETE CASCADE,
    method VARCHAR(50) NOT NULL CHECK (method IN ('DANA', 'BRI')),
    amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'waiting_verification' CHECK (status IN ('waiting_verification', 'verified', 'rejected')),
    verified_by VARCHAR(255),
    verified_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: questions
CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    correct_option VARCHAR(1) NOT NULL CHECK (correct_option IN ('A', 'B', 'C', 'D')),
    score INTEGER NOT NULL DEFAULT 3,
    time_limit INTEGER NOT NULL, -- in seconds
    category VARCHAR(10) NOT NULL CHECK (category IN ('SMP', 'SMA')),
    round VARCHAR(20) NOT NULL CHECK (round IN ('preliminary', 'final')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: exam_sessions
CREATE TABLE exam_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(10) NOT NULL CHECK (category IN ('SMP', 'SMA')),
    round VARCHAR(20) NOT NULL CHECK (round IN ('preliminary', 'final')),
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    duration_minutes INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT false,
    created_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: results
CREATE TABLE results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    participant_id UUID REFERENCES participants(id) ON DELETE CASCADE,
    exam_session_id UUID REFERENCES exam_sessions(id) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    total_correct INTEGER NOT NULL DEFAULT 0,
    total_wrong INTEGER NOT NULL DEFAULT 0,
    total_blank INTEGER NOT NULL DEFAULT 0,
    violations INTEGER NOT NULL DEFAULT 0,
    started_at TIMESTAMP,
    finished_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'completed' CHECK (status IN ('completed', 'disqualified', 'in_progress'))
);

-- Table: answers
CREATE TABLE answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    participant_id UUID REFERENCES participants(id) ON DELETE CASCADE,
    question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
    exam_session_id UUID REFERENCES exam_sessions(id) ON DELETE CASCADE,
    selected_answer VARCHAR(1),
    is_correct BOOLEAN,
    time_spent INTEGER, -- in seconds
    answered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: admins
CREATE TABLE admins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('super_admin', 'payment_admin', 'cbt_admin')),
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: audit_logs
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor VARCHAR(255) NOT NULL,
    action VARCHAR(255) NOT NULL,
    details TEXT,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: settings
CREATE TABLE settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(255) UNIQUE NOT NULL,
    value TEXT,
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin accounts
INSERT INTO admins (email, password_hash, role) VALUES
('superadmin@mathvibe.id', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj5bP2UvcD7W', 'super_admin'),
('admin1@mathvibe.id', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj5bP2UvcD7W', 'payment_admin'),
('admin2@mathvibe.id', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj5bP2UvcD7W', 'payment_admin');

-- Insert default settings
INSERT INTO settings (key, value, description) VALUES
('registration_open', 'true', 'Whether registration is open'),
('exam_fee', '30000', 'Registration fee in IDR'),
('total_prize', '5500000', 'Total prize pool in IDR'),
('max_violations', '3', 'Maximum allowed violations before disqualification'),
('backup_enabled', 'true', 'Whether daily backup is enabled');

-- Create indexes for better performance
CREATE INDEX idx_participants_email ON participants(email);
CREATE INDEX idx_participants_payment_status ON participants(payment_status);
CREATE INDEX idx_participants_kategori ON participants(kategori);
CREATE INDEX idx_payments_participant_id ON payments(participant_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_questions_category_round ON questions(category, round);
CREATE INDEX idx_results_participant_id ON results(participant_id);
CREATE INDEX idx_results_exam_session_id ON results(exam_session_id);
CREATE INDEX idx_answers_participant_id ON answers(participant_id);
CREATE INDEX idx_answers_question_id ON answers(question_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- Create triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_participants_updated_at BEFORE UPDATE ON participants 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();