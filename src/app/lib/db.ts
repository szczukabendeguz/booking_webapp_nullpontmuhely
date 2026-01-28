import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'reservations.json');

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

export async function getDatabase(): Promise<Database> {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist or is invalid, return default structure
        // In a real app, we might want to log this or handle it better
        console.error("Error reading database:", error);
        return {
            "2025-11-28": [],
            "2025-12-02": [],
            "2026-02-21": []
        };
    }
}

export async function saveDatabase(data: Database): Promise<void> {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export async function getAvailability(): Promise<Record<string, number>> {
    const db = await getDatabase();
    const availability: Record<string, number> = {};

    for (const [date, reservations] of Object.entries(db)) {
        const totalSold = reservations.reduce((sum, res) => sum + res.count, 0);
        availability[date] = Math.max(0, 60 - totalSold);
    }

    return availability;
}
