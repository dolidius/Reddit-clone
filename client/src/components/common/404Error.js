import React from 'react';

const Error = ({error}) => (
    <div className="error">
        <h2 className="error__title">{error}</h2>
        <a className="button button--md button--blue" href="/">Go home</a>
    </div>
);

export default Error;