import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, ListGroup, Row, Col } from 'react-bootstrap';

function PublicRecipes() {
    const [recipes, setRecipes] = useState([]);

    const fetchPublicRecipes = async () => {
        try {
            const response = await axios.get('http://localhost:5000/recipes/public');
            setRecipes(response.data);
        } catch (error) {
            console.error('Errore nel recupero delle ricette pubbliche', error);
        }
    };

    useEffect(() => {
        fetchPublicRecipes();
    }, []);

    return (
        <Card>
            <Card.Body>
                <Card.Title>Ricette Pubbliche</Card.Title>
                {recipes.length === 0 ? (
                    <p>Nessuna ricetta pubblica disponibile.</p>
                ) : (
                    <ListGroup variant="flush">
                        {recipes.map(recipe => (
                            <ListGroup.Item key={recipe.id}>
                                <Row>
                                    <Col>
                                        <h5>{recipe.title}</h5>
                                        <p>{recipe.description}</p>
                                        <p>Da: {recipe.username}</p>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Card.Body>
        </Card>
    );
}

export default PublicRecipes;
