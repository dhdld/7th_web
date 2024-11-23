import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // useNavigate import

function TodoItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(todo.title);
  const [updatedContent, setUpdatedContent] = useState(todo.content);

  const navigate = useNavigate(); // Navigation hook

  const handleUpdate = () => {
    onUpdate(todo.id, updatedTitle, updatedContent, todo.checked);
    setIsEditing(false);
  };

  const handleCheckboxChange = () => {
    onUpdate(todo.id, todo.title, todo.content, !todo.checked);
  };

  const handleNavigate = () => {
    navigate(`/todo/${todo.id}`); // 상세 페이지로 이동
  };

  return (
    <ItemContainer onClick={handleNavigate}>
      <CheckboxContainer>
        <input
          type="checkbox"
          checked={todo.checked}
          onChange={(e) => {
            e.stopPropagation(); // 부모 클릭 이벤트 방지
            handleCheckboxChange();
          }}
        />
      </CheckboxContainer>
      {isEditing ? (
        <ContentContainer>
          <TextContainer>
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
          </TextContainer>
          <Button onClick={(e)=>{
            e.stopPropagation();
            handleUpdate()}}>수정 완료</Button>
        </ContentContainer>
      ) : (
        <ContentContainer>
          <TextContainer>
            <p>{todo.title}</p>
            <p>{todo.content}</p>
          </TextContainer>
          <Button
            onClick={(e) => {
              e.stopPropagation(); // 부모 클릭 이벤트 방지
              setIsEditing(true);
            }}
          >
            수정
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation(); // 부모 클릭 이벤트 방지
              onDelete(todo.id);
            }}
          >
            삭제
          </Button>
        </ContentContainer>
      )}
    </ItemContainer>
  );
}

export default TodoItem;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const CheckboxContainer = styled.div`
  margin-right: 10px;
`;

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
`;

const TextContainer = styled.div`
  p {
    margin: 0;
  }
`;

const Button = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  cursor: pointer;
`;
