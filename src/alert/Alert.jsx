import React from 'react';

const Alert = ({ message, type }) => {
    let alertStyle = {};

    if (type === 'success') {
        alertStyle = { backgroundColor: 'green', color: 'white' };
    }else {
        alertStyle = { backgroundColor: 'red', color: 'white' };
    }
    return (
        <div style={{ padding: '10px', borderRadius: '5px', ...alertStyle }}>
            {message}
        </div>
    );
};

export default Alert;