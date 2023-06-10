import React from "react";

function Display(props) {
    const handleDelete = () => {
        props.onDelete(props.id);
      };
    
      return (
        <div className="movieContainer">
          <img className="img" src={props.url} alt={props.title} />
          <span className="label">{props.title}</span>
          <p className="description">{props.description}</p>
          <button onClick={handleDelete}>Delete</button>
        </div>
      );
}

export default Display;
