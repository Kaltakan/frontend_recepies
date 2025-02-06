import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Card, ListGroup, Row, Col } from 'react-bootstrap';

function UserRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const token = localStorage.getItem('token');
    const API_URL = process.env.REACT_APP_API_URL;

    const fetchRecipes = async () => {
        try {
            const response = await axios.get(`${API_URL}/user/recipes`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRecipes(response.data);
        } catch (error) {
            console.error('Errore nel recupero delle ricette', error);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    const handleAddRecipe = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `${API_URL}/user/recipes`,
                { title, description, is_public: isPublic },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setTitle('');
            setDescription('');
            setIsPublic(false);
            fetchRecipes();
        } catch (error) {
            console.error("Errore nell'aggiunta della ricetta", error);
        }
    };

    const handleDeleteRecipe = async (id) => {
        try {
            await axios.delete(`${API_URL }/user/recipes/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchRecipes();
        } catch (error) {
            console.error('Errore nella rimozione della ricetta', error);
        }
    };

    const handleTogglePublic = async (id, currentStatus) => {
        try {
            await axios.put(
                `${API_URL }/user/recipes/${id}/toggle_public`,
                { is_public: !currentStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchRecipes();
        } catch (error) {
            console.error("Errore nell'aggiornamento dello stato pubblico", error);
        }
    };

    return (
        <>
            <Card className="mb-4">
                <Card.Body>
                    <Card.Title>Aggiungi Nuova Ricetta</Card.Title>
                    <Form onSubmit={handleAddRecipe}>
                        <Form.Group controlId="formTitle" className="mb-3">
                            <Form.Label>Titolo</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Titolo ricetta"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formDescription" className="mb-3">
                            <Form.Label>Descrizione</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Descrizione ricetta"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formIsPublic" className="mb-3">
                            <Form.Check
                                type="checkbox"
                                label="Rendi pubblica"
                                checked={isPublic}
                                onChange={e => setIsPublic(e.target.checked)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Aggiungi Ricetta</Button>
                    </Form>
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                    <Card.Title>Le Mie Ricette</Card.Title>
                    {recipes.length === 0 ? (
                        <p>Nessuna ricetta trovata.</p>
                    ) : (
                        <ListGroup variant="flush">
                            {recipes.map(recipe => (
                                <ListGroup.Item key={recipe.id}>
                                    <Row>
                                        <Col>
                                            <h5>{recipe.title}</h5>
                                            <p>{recipe.description}</p>
                                            <p>Stato: {recipe.is_public ? 'Pubblica' : 'Privata'}</p>
                                        </Col>
                                        <Col xs="auto">
                                            <Button variant="warning" size="sm" className="mb-1" onClick={() => handleTogglePublic(recipe.id, recipe.is_public)}>
                                                {recipe.is_public ? 'Rendi Privata' : 'Rendi Pubblica'}
                                            </Button>
                                            <Button variant="danger" size="sm" onClick={() => handleDeleteRecipe(recipe.id)}>
                                                Rimuovi
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Card.Body>
            </Card>
        </>
    );
}

export default UserRecipes;
