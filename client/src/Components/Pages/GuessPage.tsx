import {useState, type FormEvent, useEffect, type ChangeEvent} from 'react';
import {socket} from "../../socket.tsx";
import Form from "../Forms/Form.tsx";
import H1 from "../TextFields/H1.tsx";
import axios from "axios";

function GuessPage() {
    const [guess, setGuess] = useState<string>('');
    const [gameState, setGameState] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const gameName = sessionStorage.getItem("gameName") || "undefined game";

    useEffect(() => {
        const onConnect = () => {socket.emit('send socket id for guesser', {gameName: gameName, id:socket.id})};
        const onGameState = (gameStateFromEvent: string) =>{ setGameState(gameStateFromEvent)};

        socket.on('connect', onConnect);
        socket.on('set game state', onGameState);
        socket.connect();

        return () => {
            socket.off('connect', onConnect);
            socket.off('game state', onGameState);
        }
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/guesser', {
                guess: guess,
                gameName: gameName
            });
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setGuess(e.target.value);
    }
    return (<div>
                <H1 text={gameName}></H1>
                <H1 text={gameState}></H1>
                <H1 text={message}></H1>
                <Form inputLabelText="Enter Guess"
                      submitButtonText="Send"
                      inputFieldValue={guess}
                      handleFormSubmit={handleSubmit}
                      handleInputChange={handleChange}></Form>
            </div>);
};

export default GuessPage;