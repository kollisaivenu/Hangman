import React from 'react';

interface FormProps {
    inputLabelText: string,
    submitButtonText: string,
    inputFieldValue: string,
    handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void

}

function Form(props: FormProps){
    return (
        <form onSubmit={props.handleFormSubmit}>
            <label htmlFor="input">{props.inputLabelText}</label>
            <input
                id="input"
                type="text"
                value={props.inputFieldValue}
                onChange={props.handleInputChange}
            />
            <button type="submit">{props.submitButtonText}</button>
        </form>
    );
}

export default Form