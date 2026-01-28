'use client';

import { useState, useEffect } from 'react';

interface Availability {
    [date: string]: number;
}

export default function BookingForm() {
    const [availability, setAvailability] = useState<Availability | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [count, setCount] = useState(1);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchAvailability();
    }, []);

    const fetchAvailability = async () => {
        try {
            const res = await fetch('/api/availability');
            if (res.ok) {
                const data = await res.json();
                setAvailability(data);
            }
        } catch (error) {
            console.error('Failed to fetch availability', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setMessage('');

        try {
            const res = await fetch('/api/book', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ date: selectedDate, name, email, count }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus('success');
                setMessage('Köszönjük! A részletekről hamarosan emailt küldünk.');
                // Refresh availability
                fetchAvailability();
                // Reset form
                setName('');
                setEmail('');
                setCount(1);
                setSelectedDate('');
            } else {
                setStatus('error');
                setMessage(data.error || 'Hiba történt a foglalás során.');
            }
        } catch (error) {
            setStatus('error');
            setMessage('Hálózati hiba történt.');
        }
    };

    if (!availability) {
        return <div className="text-center p-4">Betöltés...</div>;
    }

    const dates = [
        { key: '2026-02-21', label: 'Február 21. (Szombat)' },
    ];

    return (
        <div className="glass-panel text-white">
            <h2 className="text-center mb-4" style={{ fontFamily: 'Special Elite, cursive' }}>Jegyfoglalás</h2>

            {status === 'success' ? (
                <div className="alert alert-success text-center" role="alert">
                    <h4 className="alert-heading">Sikeres Foglalás!</h4>
                    <p>{message}</p>
                    <button
                        className="btn btn-outline-success mt-3"
                        onClick={() => setStatus('idle')}
                    >
                        Új foglalás
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="form-label fw-bold">Válasszon időpontot:</label>
                        <div className="d-grid gap-2">
                            {dates.map((d) => {
                                const available = availability[d.key] ?? 0;
                                const isSoldOut = available === 0;
                                return (
                                    <div key={d.key} className="position-relative">
                                        <input
                                            type="radio"
                                            className="btn-check"
                                            name="date"
                                            id={`date-${d.key}`}
                                            value={d.key}
                                            autoComplete="off"
                                            disabled={isSoldOut}
                                            checked={selectedDate === d.key}
                                            onChange={(e) => setSelectedDate(e.target.value)}
                                            required
                                        />
                                        <label
                                            className={`btn w-100 text-start d-flex justify-content-between align-items-center ${selectedDate === d.key ? 'btn-primary' : 'btn-outline-light'
                                                } ${isSoldOut ? 'disabled opacity-50' : ''}`}
                                            htmlFor={`date-${d.key}`}
                                        >
                                            <span>{d.label}</span>
                                            <span className="badge bg-dark">
                                                {isSoldOut ? 'TELTHÁZ' : `${available} hely`}
                                            </span>
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Név</label>
                        <input
                            type="text"
                            className="form-control bg-dark text-white border-secondary"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email cím</label>
                        <input
                            type="email"
                            className="form-control bg-dark text-white border-secondary"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="count" className="form-label">Jegyek száma</label>
                        <input
                            type="number"
                            className="form-control bg-dark text-white border-secondary"
                            id="count"
                            min="1"
                            max="10"
                            value={count}
                            onChange={(e) => setCount(parseInt(e.target.value))}
                            required
                        />
                    </div>

                    {status === 'error' && (
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    )}

                    <div className="d-grid">
                        <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                            disabled={status === 'loading' || !selectedDate}
                        >
                            {status === 'loading' ? 'Foglalás...' : 'Lefoglalom'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
