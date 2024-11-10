import React, { useState } from 'react';

function TodoItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(todo.title);
  const [updatedContent, setUpdatedContent] = useState(todo.content);

  const handleUpdate = () => {
    onUpdate(todo.id, updatedTitle, updatedContent);
    setIsEditing(false);
  };
  
  return (
    <li>
      {isEditing ? (
        <div>
          <input 
            type="text" 
            value={updatedTitle} 
            onChange={(e) => setUpdatedTitle(e.target.value)} 
          />
          <input 
            type="text" 
            value={updatedContent} 
            onChange={(e) => setUpdatedContent(e.target.value)} 
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h3>{todo.title}</h3>
          <p>{todo.content}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(todo.id)}>Delete</button>
        </div>
      )}
    </li>
  );
}

export default TodoItem;
