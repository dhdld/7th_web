import React, { useState } from 'react';
import styled from 'styled-components';

function TodoItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(todo.title);
  const [updatedContent, setUpdatedContent] = useState(todo.content);

  const handleUpdate = () => {
    onUpdate(todo.id, updatedTitle, updatedContent, todo.checked);
    setIsEditing(false);
  };

  const handleCheckboxChange = () => {
    onUpdate(todo.id, todo.title, todo.content, !todo.checked);
  };

  return (
    <ItemContainer>
      <CheckboxContainer>
        <input
          type="checkbox"
          checked={todo.checked}
          onChange={handleCheckboxChange}
        />
      </CheckboxContainer>
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
          <button onClick={handleUpdate}>수정 완료</button>
        </div>
      ) : (
        <div>
          <h3>{todo.title}</h3>
          <p>{todo.content}</p>
          <button onClick={() => setIsEditing(true)}>수정</button>
          <button onClick={() => onDelete(todo.id)}>삭제</button>
        </div>
      )}
    </ItemContainer>
  );
}

export default TodoItem;

const ItemContainer = styled.div`
  border: 1px solid blue;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 10px;
`;

const CheckboxContainer = styled.div`
  margin-right: 10px;
`;
