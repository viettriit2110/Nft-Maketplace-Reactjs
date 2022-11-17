import React from 'react'
import "./Spinner.css"

const Spinner = (props) => {
    return (
        <div className="d-flex justify-content-center align-items-center spinner">
            <span className="loader"></span>
            {props.children}
        </div>
    )
}

export default Spinner