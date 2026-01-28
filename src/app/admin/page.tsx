'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Row, Col, Table, Button, Alert, Badge, Spinner } from 'react-bootstrap';

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
            const res = await fetch('/api/admin/reservations');
            if (res.ok) {
                const db = await res.json();
                setData(db);
            } else {
                if (res.status === 401) router.push('/admin/login');
                else setError('Failed to fetch data');
            }
        } catch (err) {
            setError('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleLogout = async () => {
        await fetch('/api/admin/logout', { method: 'POST' });
        router.push('/admin/login');
    };

    const handleDelete = async (date: string, id: string) => {
        if (!confirm('Are you sure you want to delete this reservation?')) return;

        try {
            const res = await fetch(`/api/admin/reservations?date=${date}&id=${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                fetchData(); // Refresh data
            } else {
                alert('Failed to delete reservation');
            }
        } catch (err) {
            alert('Error deleting reservation');
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
