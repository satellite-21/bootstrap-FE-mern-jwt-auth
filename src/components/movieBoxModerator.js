import React from "react";
import { useState } from "react";
import axios from "axios";

function Display(props) {
    const [editing, setEditing] = useState(false);
    const [editField, setEditField] = useState("");
    const [editValue, setEditValue] = useState("");

    // const handleDelete = () => {
    //     props.onDelete(props.id);
    //   };

      const handleEdit = () => {
        setEditing(true);
      };

      const handleSave = async () => {
        try {
          // Update the corresponding field based on the editField value
          const data = {
            field: editField,
            value: editValue,
          };
      
          await axios.put(`http://localhost:8080/api/movies/${props.id}`, data);
      
          setEditing(false);
          setEditField("");
          setEditValue("");
        } catch (error) {
          console.log("Error updating movie:", error);
        }
      };
      

      const handleCancel = () => {
        setEditing(false);
        setEditField("");
        setEditValue("");
      };

      const renderEditForm = () => {
        return (
          <div className="editForm">
            <select
              value={editField}
              onChange={(e) => setEditField(e.target.value)}
            >
              <option value="">Select Field</option>
              <option value="Title">Title</option>
              <option value="URL">URL</option>
              <option value="Description">Description</option>
            </select>
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            />
            <button onClick={handleSave}>Update</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        );
      };


    
  return (
    <div className="movieContainer">
      <img className="img" src={props.url} alt={props.title} />
      <span className="label">{props.title}</span>
      <p className="description">{props.description}</p>
      {editing ? (
        renderEditForm()
      ) : (
        <>
          {/* <button onClick={handleDelete}>Delete</button> */}
          <button onClick={handleEdit}>Edit</button>
        </>
      )}
    </div>
  );
}

export default Display;
