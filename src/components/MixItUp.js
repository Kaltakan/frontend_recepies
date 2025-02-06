import React, { useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';

function MixItUp() {
    const [mixedRecipe, setMixedRecipe] = useState(null);
    const API_URL = process.env.REACT_APP_API_URL;

    const fetchMixedRecipe = async () => {
        try {
            const response = await axios.get(`${API_URL}/recepies/mix`);
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
