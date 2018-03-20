import React from 'react';

export default function ShowNotification(props) {
    const { classname, message, showNotification } = props;
    if(!showNotification) {
        return "";
    }
    return (
        <div className={`alert alert-${classname}`} role="alert">
            {message}
        </div>
    )
}