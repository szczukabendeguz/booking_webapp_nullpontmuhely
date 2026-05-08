'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Row, Col, Table, Button, Alert, Badge, Spinner } from 'react-bootstrap';

import { getReservations, deleteReservation, logout, isAuthenticated } from '../lib/mockApi';

interface Reservation {
    id: string;
    name: string;
    email: string;
    count: number;
    timestamp: string;
}

interface Database {
    [date: string]: Reservation[];
}

export default function AdminDashboard() {
    const [data, setData] = useState<Database | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();

    const fetchData = async () => {
        try {
            if (!isAuthenticated()) {
                router.push('/admin/login');
                return;
            }
            const db = await getReservations();
            setData(db);
        } catch (err) {
            setError('Hiba történt az adatok lekérésekor');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleLogout = async () => {
        logout();
        router.push('/admin/login');
    };

    const handleDelete = async (date: string, id: string) => {
        if (!confirm('Biztosan törölni szeretné ezt a foglalást?')) return;

        try {
            await deleteReservation(date, id);
            fetchData(); // Refresh data
        } catch (err) {
            alert('Hiba történt a törlés során');
        }
    };

    if (loading) return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Spinner animation="border" />
        </Container>
    );

    return (
        <Container className="py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Admin Dashboard</h1>
                <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            {data && Object.entries(data).map(([date, reservations]) => (
                <div key={date} className="mb-5">
                    <h3 className="mb-3 border-bottom pb-2">
                        {date} <Badge bg="secondary">{reservations.length} reservations</Badge>
                        <span className="float-end fs-6 text-muted">
                            Total Tickets: {reservations.reduce((sum, r) => sum + r.count, 0)}
                        </span>
                    </h3>

                    {reservations.length === 0 ? (
                        <p className="text-muted">No reservations for this date.</p>
                    ) : (
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Time</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Tickets</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservations.map((res) => (
                                    <tr key={res.id || Math.random()}>
                                        <td>{new Date(res.timestamp).toLocaleTimeString()}</td>
                                        <td>{res.name}</td>
                                        <td>{res.email}</td>
                                        <td>{res.count}</td>
                                        <td>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleDelete(date, res.id)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </div>
            ))}
        </Container>
    );
}
