import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TodoItem({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(todo.title);
  const [updatedContent, setUpdatedContent] = useState(todo.content);
  const queryClient = useQueryClient();
  const navigate = useNavigate(); // useNavigate를 활용한 네비게이션

  // PATCH 요청: Todo 수정
  const updateTodoMutation = useMutation({
    mutationFn: async (updatedTodo) => {
      return axios.patch(`http://localhost:3000/todo/${updatedTodo.id}`, updatedTodo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setIsEditing(false);
    },
  });

  // DELETE 요청: Todo 삭제
  const deleteTodoMutation = useMutation({
    mutationFn: async (id) => {
      return axios.delete(`http://localhost:3000/todo/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  // 수정 완료 핸들러
  const handleUpdate = () => {
    updateTodoMutation.mutate({
      id: todo.id,
      title: updatedTitle,
      content: updatedContent,
      checked: todo.checked,
    });
  };

  // 삭제 핸들러
  const handleDelete = () => {
    deleteTodoMutation.mutate(todo.id);
  };

  // 체크박스 핸들러
  const handleCheckboxChange = () => {
    updateTodoMutation.mutate({
      id: todo.id,
      title: todo.title,
      content: todo.content,
      checked: !todo.checked,
    });
  };

  // 상세 페이지로 이동
  const handleNavigate = () => {
    if (!isEditing) {
      navigate(`/todo/${todo.id}`);
    }
  };

  return (
    <ItemContainer onClick={handleNavigate}>
      <CheckboxContainer onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={todo.checked}
          onChange={handleCheckboxChange}
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
          <Button onClick={(e) => { e.stopPropagation(); handleUpdate(); }} disabled={updateTodoMutation.isLoading}>
            {updateTodoMutation.isLoading ? 'Updating...' : '수정 완료'}
          </Button>
          <Button onClick={(e) => { e.stopPropagation(); setIsEditing(false); }}>취소</Button>
        </ContentContainer>
      ) : (
        <ContentContainer>
          <TextContainer>
            <h3>{todo.title}</h3>
            <p>{todo.content}</p>
          </TextContainer>
          <ButtonContainer>
            <Button onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}>수정</Button>
            <Button onClick={(e) => { e.stopPropagation(); handleDelete(); }} disabled={deleteTodoMutation.isLoading}>
              {deleteTodoMutation.isLoading ? 'Deleting...' : '삭제'}
            </Button>
          </ButtonContainer>
        </ContentContainer>
      )}
    </ItemContainer>
  );
}

export default TodoItem;

// Styled Components
const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const CheckboxContainer = styled.div`
  margin-right: 10px;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const TextContainer = styled.div`
  flex: 1;

  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: bold;
  }

  p {
    margin: 5px 0;
    color: #555;
  }

  input {
    width: 100%;
    margin: 5px 5px;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: gray;
  color: white;
  font-size: 14px;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #003f7f;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
