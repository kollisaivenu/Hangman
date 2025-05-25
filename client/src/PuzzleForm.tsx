import {useState, type ChangeEvent, type FormEvent, useEffect} from 'react';
import axios from "axios";
import {socket} from "./socket.tsx";

function PuzzleForm (){
    const [puzzle, setPuzzle] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const gameName = sessionStorage.getItem("gameName");

    useEffect(() => {
        const onConnect = () => {socket.emit('send socket id for riddler', {gameName: sessionStorage.getItem("gameName"), id: socket.id})};
        const onGameState = (gameStatusFromEvent: string) =>{ setStatus(gameStatusFromEvent)};

        socket.on('connect', onConnect);
        socket.on('set game status', onGameState);
        socket.connect();

        return () => {
            socket.off('connect', onConnect);
            socket.off('set game status', onGameState);
        }
    }, []);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPuzzle(event.target.value);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/riddler', {
                puzzle: puzzle,
                gameName: sessionStorage.getItem("gameName")
            });
            console.log('Server response:', response.data);
            setStatus(response.data.status);
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Something went wrong.');
        }
    };

    return (
        <div>
            <h1>{gameName}</h1>
            <h1>{status}</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="myInput">Enter word to guess:</label>
                <input
                    type="text"
                    id="myInput"
                    value={puzzle}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default PuzzleForm;

