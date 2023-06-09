import React from "react";


function display(props) {
    return(
        <div className="movieContainer">
            <img className="img" src={props.url} />
            <span className="label">{props.title}</span>
        </div>
    )
}

export default display;