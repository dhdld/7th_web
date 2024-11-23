import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

function TodoDetail() {
  const { id } = useParams(); // URL 파라미터에서 ID 추출
  const navigate = useNavigate(); // 페이지 이동을 위한 hook
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // 수정 모드
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedContent, setUpdatedContent] = useState('');

  // 데이터 가져오기
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/todo/${id}`);
        setTodo(response.data);
        setUpdatedTitle(response.data.title);
        setUpdatedContent(response.data.content);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  // Todo 수정
  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`http://localhost:3000/todo/${id}`, {
        title: updatedTitle,
        content: updatedContent,
      });
      setTodo(response.data); // 상태 업데이트
      setIsEditing(false); // 수정 모드 종료
      navigate('/')
    } catch (err) {
      setError(err);
    }
  };

  // Todo 삭제
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/todo/${id}`);
      navigate('/'); // 삭제 후 리스트 페이지로 이동
    } catch (err) {
      setError(err);
    }
  };

  if (loading) return <p>Loading...</p>;
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
          <Button onClick={handleUpdate}>수정 완료</Button>
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
          <Button onClick={handleDelete}>삭제</Button>
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

  input, textarea {
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
`;
