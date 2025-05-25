import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function GameForm(){
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
        <div className="max-w-md mx-auto mt-10 p-4 border rounded">
            <h2 className="text-xl mb-4">Enter game name</h2>

            <form onSubmit={handleGameNameFormSubmit}>
                <label className="block mb-2">
                    Name:
                    <input
                        type="text"
                        value={gameName}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setGameName(e.target.value)}
                        className="w-full p-2 border rounded mt-1"
                        placeholder="Enter your name"
                    />
                </label>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Enter Game
                </button>
            </form>

            <button
                type="button"
                onClick={createGame}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
                Create game
            </button>
        </div>
    );
};

export default GameForm;
