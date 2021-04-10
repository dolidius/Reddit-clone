import React from 'react';

import PropTypes from 'prop-types';

const TextFieldGroup = ({
    name,
    onChange,
    value,
    type,
    placeholder,
    error
}) => {
    let borderStyle;
    if(error){
        borderStyle = {
            borderBottom: '2px solid #CF1E1E'
        }
    }
    return(
        <div className="authform__group">
            <label className="authform__error">{error && error}</label>
            <input style={borderStyle} name={name} onChange={onChange} value={value} type={type} className="authform__input authform__item" placeholder={placeholder}/>
        </div>
    )
};

TextFieldGroup.propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    error: PropTypes.string
}


export default TextFieldGroup;