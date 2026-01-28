import { NextResponse } from 'next/server';
import { getAvailability } from '@/app/lib/db';

export const dynamic = 'force-dynamic'; // Ensure this is not cached statically

export async function GET() {
    try {
        const availability = await getAvailability();
        return NextResponse.json(availability);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 });
    }
}
