import React, { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from "../Forms/Form.tsx";
import Button from "../Button/Button.tsx";

import axios from 'axios';

function GamePage(){
    const [gameName, setGameName] = useState<string>('');
    const navigate = useNavigate();
    const handleGameNameFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/joingame', {
                playerName: sessionStorage.getItem("playerName"),
                gameName: gameName
            });
            sessionStorage.setItem("gameName", gameName);
            console.log('Server response:', response.data);
            navigate("/guesser");
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Something went wrong.');
        }
    };

    const handleGameNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGameName(e.target.value);
    }

    const createGame = async () => {
        try {
            const response = await axios.post('http://localhost:3000/creategame', {
                playerName: sessionStorage.getItem("playerName"),
            });
            console.log('Server response:', response.data);
            sessionStorage.setItem("gameName", response.data.gameName);
            navigate("/riddler");
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Something went wrong.');
        }
    };

    return (
        <div>
            <Form inputLabelText="Enter Game Name"
                  submitButtonText="Proceed"
                  inputFieldValue={gameName}
                  handleFormSubmit={handleGameNameFormSubmit}
                  handleInputChange={handleGameNameChange}></Form>
            <Button buttonLabel="Create Game Instead"
                    onButtonClick={createGame}></Button>
        </div>
    );
};

export default GamePage;
