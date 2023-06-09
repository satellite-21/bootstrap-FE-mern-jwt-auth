import React from "react";

function Display(props) {
  return (
        <div className="movieContainer">
          <img className="img" src={props.url} alt={props.title} />
          <span className="label">{props.title}</span>
          <p className="description">{props.description}</p>
        </div>
  );
}

export default Display;
