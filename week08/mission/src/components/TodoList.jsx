import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import styled from 'styled-components';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // 초기 데이터 로드
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/todo');
      setTodos(response.data[0]);
      console.log(response.data[0]);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    if (!title || !content) return;
    try {
      const response = await axios.post('http://localhost:3000/todo', {
        title,
        content,
        checked: false,
      });
      setTodos([...todos, response.data]);
      setTitle('');
      setContent('');
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
      fetchTodos(); // 최신 데이터를 다시 가져옴
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todo/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div>
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
        <button onClick={addTodo}>Todo 생성</button>
      </InputDiv>
      <div>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdate={updateTodo}
            onDelete={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default TodoList;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  input {
    margin-bottom: 10px;
    padding: 8px;
    font-size: 16px;
  }

  button {
    padding: 8px;
    font-size: 16px;
    cursor: pointer;
  }
`;
