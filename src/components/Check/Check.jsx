import React from 'react'
import "./Check.css"

const Check = (props) => {
    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="check"></div>
            {props.children}
        </div>
    )
}

export default Check