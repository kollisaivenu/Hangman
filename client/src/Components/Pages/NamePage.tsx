import { useState, type ChangeEvent, type FormEvent } from 'react';
import Form from "../Forms/Form.tsx"
import { useNavigate } from 'react-router-dom';

function NamePage(){
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
        <Form inputLabelText="Enter Name"
              submitButtonText="Proceed"
              inputFieldValue={playerName}
              handleFormSubmit={handleSubmit}
              handleInputChange={handleChange}></Form>
    );
};

export default NamePage;
