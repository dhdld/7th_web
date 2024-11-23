import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import styled from 'styled-components';

function TodoDetail() {
  const { id } = useParams(); // URL 파라미터에서 ID 추출
  const navigate = useNavigate(); // 페이지 이동을 위한 hook
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false); // 수정 모드
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedContent, setUpdatedContent] = useState('');

  // GET 요청: 단일 Todo 가져오기
  const { data: todo, error, isLoading } = useQuery({
    queryKey: ['todo', id],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/todo/${id}`);
      setUpdatedTitle(response.data.title);
      setUpdatedContent(response.data.content);
      return response.data;
    },
  });

  // PATCH 요청: Todo 수정
  const updateTodoMutation = useMutation({
    mutationFn: async (updatedTodo) => {
      return axios.patch(`http://localhost:3000/todo/${id}`, updatedTodo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todo', id] }); // 상세 페이지 데이터 갱신
      queryClient.invalidateQueries({ queryKey: ['todos'] }); // 리스트 데이터 갱신
      setIsEditing(false); // 수정 모드 종료
      navigate('/'); // 리스트 페이지로 이동
    },
  });

  // DELETE 요청: Todo 삭제
  const deleteTodoMutation = useMutation({
    mutationFn: async () => {
      return axios.delete(`http://localhost:3000/todo/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] }); // 리스트 데이터 갱신
      navigate('/'); // 삭제 후 리스트 페이지로 이동
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container>
      {isEditing ? (
        <>
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <textarea
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
          />
          <Button
            onClick={() => updateTodoMutation.mutate({ title: updatedTitle, content: updatedContent })}
            disabled={updateTodoMutation.isLoading}
          >
            {updateTodoMutation.isLoading ? 'Updating...' : '수정 완료'}
          </Button>
          <Button onClick={() => setIsEditing(false)}>취소</Button>
        </>
      ) : (
        <>
          <h1>{todo.title}</h1>
          <p>{todo.content}</p>
          <p>ID: {todo.id}</p>
          <p>{todo.updatedAt}</p>
          <p>상태: {todo.checked ? '완료' : '아직...'}</p>
          <Button onClick={() => setIsEditing(true)}>수정</Button>
          <Button onClick={() => deleteTodoMutation.mutate()} disabled={deleteTodoMutation.isLoading}>
            {deleteTodoMutation.isLoading ? 'Deleting...' : '삭제'}
          </Button>
        </>
      )}
    </Container>
  );
}

export default TodoDetail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;

  h1 {
    margin-bottom: 20px;
  }

  p {
    font-size: 18px;
    margin-bottom: 10px;
  }

  input,
  textarea {
    margin-bottom: 10px;
    padding: 8px;
    width: 80%;
    font-size: 16px;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 5px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #003f7f;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
