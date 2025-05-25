import {useState, type FormEvent, useEffect} from 'react';
import {socket} from './socket';
import axios from "axios";

function GuessForm() {
    const [guess, setGuess] = useState<string>('');
    const [gameState, setGameState] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const gameName = sessionStorage.getItem("gameName");

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
    return (<div>
        <h2>{gameName}</h2>
        <h2>{gameState}</h2>
        <h2>{message}</h2>

        <form onSubmit={handleSubmit}>
            <label htmlFor="userInput">Guess:</label>
            <input
                type="text"
                id="userInput"
                name="userInput"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    </div>);
};

export default GuessForm;