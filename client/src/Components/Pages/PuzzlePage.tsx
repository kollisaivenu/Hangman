import {useState, type ChangeEvent, type FormEvent, useEffect} from 'react';
import axios from "axios";
import {socket} from "../../socket.tsx";
import Form from "../Forms/Form.tsx";
import H1 from "../TextFields/H1.tsx";

function PuzzlePage (){
    const [puzzle, setPuzzle] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const gameName = sessionStorage.getItem("gameName") || "Undefined Game" ;

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
            <H1 text={gameName} ></H1>
            <H1 text={status}></H1>
            <Form inputLabelText="Enter Puzzle"
                  submitButtonText="Send"
                  inputFieldValue={puzzle}
                  handleFormSubmit={handleSubmit}
                  handleInputChange={handleChange}></Form>
        </div>
    );
}

export default PuzzlePage;

