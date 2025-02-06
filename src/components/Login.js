import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import { AuthContext } from '../components/AuthContext';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setToken } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });
            setToken(response.data.access_token);
            navigate('/user-recipes');
        } catch (error) {
            alert('Credenziali non valide');
        }
    };

    return (
        <Card className="mx-auto" style={{ maxWidth: '400px' }}>
            <Card.Body>
                <Card.Title className="mb-3">Login</Card.Title>
                <Form onSubmit={handleLogin}>
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
                    <Button variant="primary" type="submit" className="w-100">Accedi</Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default Login;
