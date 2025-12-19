interface ButtonProps {
    buttonLabel: string,
    onButtonClick: () => void
}

function Button(props: ButtonProps){
    return (
        <button onClick={props.onButtonClick}>
            {props.buttonLabel}
        </button>
    );
}

export default Button