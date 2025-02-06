import React, { useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';

function MixItUp() {
    const [mixedRecipe, setMixedRecipe] = useState(null);

    const fetchMixedRecipe = async () => {
        try {
            const response = await axios.get('http://localhost:5000/recipes/mix');
            setMixedRecipe(response.data);
        } catch (error) {
            console.error('Errore nel generare il mix di ricette', error);
        }
    };

    return (
        <Card className="text-center">
            <Card.Body>
                <Card.Title>Mix It Up</Card.Title>
                <Button variant="primary" onClick={fetchMixedRecipe}>Genera Ricetta Creativa</Button>
                {mixedRecipe && (
                    <>
                        <Card.Subtitle className="mt-3">{mixedRecipe.title}</Card.Subtitle>
                        <Card.Text>{mixedRecipe.description}</Card.Text>
                    </>
                )}
            </Card.Body>
        </Card>
    );
}

export default MixItUp;
