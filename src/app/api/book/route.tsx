import { NextResponse } from 'next/server';
import { getDatabase, saveDatabase, Reservation } from '@/app/lib/db';
import { Resend } from 'resend';
import { EmailTemplate } from '@/app/components/EmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { date, name, email, count } = body;

        // Basic validation
        if (!date || !name || !email || !count) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        if (count < 1) {
            return NextResponse.json({ error: 'Invalid ticket count' }, { status: 400 });
        }

        const db = await getDatabase();

        if (!db[date]) {
            return NextResponse.json({ error: 'Invalid date' }, { status: 400 });
        }

        const currentReservations = db[date];
        const totalSold = currentReservations.reduce((sum, res) => sum + res.count, 0);

        if (totalSold + count > 60) {
            return NextResponse.json({
                error: 'Not enough tickets available',
                available: 60 - totalSold
            }, { status: 400 });
        }

        // Create reservation
        const newReservation: Reservation = {
            id: crypto.randomUUID(),
            name,
            email,
            count,
            timestamp: new Date().toISOString()
        };

        db[date].push(newReservation);
        await saveDatabase(db);

        // Send confirmation email
        try {
            if (process.env.RESEND_API_KEY) {
                await resend.emails.send({
                    from: 'Rágcsálóirtás <noreply@nullpontmuhely.hu>', // Use your verified domain in production
                    to: [email],
                    subject: 'Sikeres foglalás - Rágcsálóirtás',
                    react: <EmailTemplate name={name} date={date} count={count} />,
                });
            } else {
                console.warn('RESEND_API_KEY is not set, skipping email.');
            }
        } catch (emailError) {
            console.error('Failed to send email:', emailError);
            // Don't fail the request if email fails, just log it
        }

        return NextResponse.json({ success: true, reservation: newReservation });

    } catch (error) {
        console.error('Booking error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
