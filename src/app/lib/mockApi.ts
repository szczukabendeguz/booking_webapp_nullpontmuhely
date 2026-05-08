export interface Reservation {
    id: string;
    name: string;
    email: string;
    count: number;
    timestamp: string;
}

export interface Database {
    [date: string]: Reservation[];
}

const STORAGE_KEY = 'booking_demo_db';
const INITIAL_DB: Database = {
    "2026-02-21": []
};

function getDb(): Database {
    if (typeof window === 'undefined') return INITIAL_DB;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DB));
        return INITIAL_DB;
    }
    return JSON.parse(stored);
}

function saveDb(db: Database) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

export async function getAvailability(): Promise<Record<string, number>> {
    const db = getDb();
    const availability: Record<string, number> = {};

    for (const [date, reservations] of Object.entries(db)) {
        const totalSold = reservations.reduce((sum, res) => sum + res.count, 0);
        availability[date] = Math.max(0, 60 - totalSold);
    }

    return availability;
}

export async function bookTickets(date: string, name: string, email: string, count: number) {
    const db = getDb();
    
    if (!db[date]) {
        throw new Error('Érvénytelen időpont');
    }

    const currentReservations = db[date];
    const totalSold = currentReservations.reduce((sum, res) => sum + res.count, 0);

    if (totalSold + count > 60) {
        throw new Error('Nincs elég szabad hely');
    }

    const newReservation: Reservation = {
        id: crypto.randomUUID(),
        name,
        email,
        count,
        timestamp: new Date().toISOString()
    };

    db[date].push(newReservation);
    saveDb(db);

    return { success: true, reservation: newReservation };
}

export async function getReservations(): Promise<Database> {
    return getDb();
}

export async function deleteReservation(date: string, id: string) {
    const db = getDb();
    if (db[date]) {
        db[date] = db[date].filter(r => r.id !== id);
        saveDb(db);
    }
}

export async function login(username: string, password: string) {
    // Mock login - anything works in demo, or hardcoded admin/admin
    if (username === 'admin' && password === 'admin') {
        localStorage.setItem('demo_admin_session', 'true');
        return { success: true };
    }
    throw new Error('Hibás felhasználónév vagy jelszó');
}

export function logout() {
    localStorage.removeItem('demo_admin_session');
}

export function isAuthenticated() {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('demo_admin_session') === 'true';
}
