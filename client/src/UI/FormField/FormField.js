import React from 'react';
// import './Form.css'





const FormField = (props) => {
    
    let label = props.label || null
    let onChange = props.onChange || null
    let type = props.type || null
    let autoFocus = props.autoFocus || null
    let name = props.name || null
    let required = props.required || null



    return (
        <React.Fragment>
            <label>{label}<span>{required}</span></label>
            <input onChange={onChange} type={type} autoFocus={autoFocus} name={props} />
        </React.Fragment>
    )
}


export default FormField;