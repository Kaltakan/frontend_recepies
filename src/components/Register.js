import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/register', { username, password });
            alert('Registrazione avvenuta con successo');
            navigate('/login');
        } catch (error) {
            alert('Errore durante la registrazione');
        }
    };

    return (
        <Card className="mx-auto" style={{ maxWidth: '400px' }}>
            <Card.Body>
                <Card.Title className="mb-3">Registrati</Card.Title>
                <Form onSubmit={handleRegister}>
                    <Form.Group controlId="formUsername" className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Inserisci username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword" className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Inserisci password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">Registrati</Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default Register;
