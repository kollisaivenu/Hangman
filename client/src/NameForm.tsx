import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

function PlayerForm(){
    const [playerName, setPlayerName] = useState<string>('');
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPlayerName(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Player name submitted:', playerName);
        sessionStorage.setItem("playerName", playerName);
        navigate("/game");
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-4 border rounded">
            <h2 className="text-xl mb-4">Enter Player Name</h2>
            <input
                type="text"
                value={playerName}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-4"
                placeholder="Enter your player name"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Submit
            </button>
        </form>
    );
};

export default PlayerForm;
