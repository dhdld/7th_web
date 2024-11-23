import React, { useState } from 'react';
import useFetch from '../hooks/useFetch'; // Custom Hook import
import axios from 'axios';
import TodoItem from './TodoItem';
import styled from 'styled-components';

function TodoList() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { data: todos, error, loading, refetch } = useFetch('http://localhost:3000/todo');

  const addTodo = async () => {
    if (!title || !content) return;
    try {
      await axios.post('http://localhost:3000/todo', {
        title,
        content,
        checked: false,
      });
      setTitle('');
      setContent('');
      refetch(); 
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const updateTodo = async (id, updatedTitle, updatedContent, updatedChecked) => {
    try {
      await axios.patch(`http://localhost:3000/todo/${id}`, {
        title: updatedTitle,
        content: updatedContent,
        checked: updatedChecked,
      });
      refetch();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todo/${id}`);
      refetch();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <Container>
      <InputDiv>
        <input
          type="text"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={addTodo} disabled={loading || error}>Todo 생성</button>
      </InputDiv>

      <>
        {loading && <StatusMSG>Loading...</StatusMSG>}
        {error && <StatusMSG>에러가 발생했습니다.</StatusMSG>}
        {!loading && !error && todos && (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
            />
          ))
        )}
      </>
    </Container>
  );
}

export default TodoList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width:60%;

  input {
    margin-bottom: 10px;
    padding: 10px;
    font-size: 16px;
    border-radius: 10px;
  }
  button {
    padding: 8px;
    font-size: 16px;
    border-radius: 10px;
    cursor: pointer;
  }
`;

const StatusMSG = styled.div`
  margin-top: 100px;
  align-items: center;
  font-size: 20px;
`