import React from 'react';
import './Form.css'





const Form = (props) => {
    const { onSubmit, createAccount, buttonText, switchText } = props

    return(
        <div className="form">
            <form onSubmit={ onSubmit }>
                { props.children }
                <div className="submit-box">
                    <button id="submit">{buttonText}</button>
                    <p onClick={createAccount}>{switchText}</p>
                </div>
            </form>
        </div>
    )
}


export default Form;