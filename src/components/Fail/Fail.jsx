import React from 'react'
import "./Fail.css"

const ExclamationPoint = (props) => {
    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="fail"></div>
            {props.children}
        </div>
    )
}

export default ExclamationPoint