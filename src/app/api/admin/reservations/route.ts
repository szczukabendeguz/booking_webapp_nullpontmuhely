import { NextResponse } from 'next/server';
import { getDatabase, saveDatabase } from '@/app/lib/db';
import { cookies } from 'next/headers';

async function isAuthenticated() {
    const cookieStore = await cookies();
    return cookieStore.has('admin_session');
}

export async function GET() {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const db = await getDatabase();
        return NextResponse.json(db);
    } catch (error) {
        console.error('Error fetching reservations:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const date = searchParams.get('date');

        if (!id || !date) {
            return NextResponse.json({ error: 'Missing id or date' }, { status: 400 });
        }

        const db = await getDatabase();

        if (!db[date]) {
            return NextResponse.json({ error: 'Date not found' }, { status: 404 });
        }

        const initialLength = db[date].length;
        db[date] = db[date].filter(res => res.id !== id);

        if (db[date].length === initialLength) {
            return NextResponse.json({ error: 'Reservation not found' }, { status: 404 });
        }

        await saveDatabase(db);

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Error deleting reservation:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
