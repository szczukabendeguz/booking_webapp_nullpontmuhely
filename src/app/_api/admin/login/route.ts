import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, password } = body;

        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminPassword) {
            console.error('ADMIN_PASSWORD environment variable is not set');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        // Simple check: username must be 'admin' and password must match env var
        if (username === 'admin' && password === adminPassword) {
            const cookieStore = await cookies();
            // Set a simple session cookie
            cookieStore.set('admin_session', 'true', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 // 24 hours
            });

            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
