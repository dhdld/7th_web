import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import TodoItem from './TodoItem';

function TodoList() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const queryClient = useQueryClient();

  // GET 요청: Todo 리스트 가져오기
  const { data: todos, error, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/todo');
      return response.data[0];
    },
  });

  // POST 요청: Todo 생성
  const addTodoMutation = useMutation({
    mutationFn: async (newTodo) => {
      return axios.post('http://localhost:3000/todo', newTodo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] }); // todos 쿼리 갱신
    },
  });

  // Todo 추가 핸들러
  const handleAddTodo = () => {
    if (!title || !content) return;
    addTodoMutation.mutate({
      title,
      content,
      checked: false,
    });
    setTitle('');
    setContent('');
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container>
      <h1>UMC Todolist</h1>
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
        <button onClick={handleAddTodo} disabled={addTodoMutation.isLoading}>
          {addTodoMutation.isLoading ? 'Creating...' : 'Todo 생성'}
        </button>
      </InputDiv>
      <div>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </Container>
  );
}

export default TodoList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0 50px;
  width: 60%;

  input {
    margin-bottom: 10px;
    padding: 8px;
    font-size: 16px;
  }

  button {
    padding: 8px;
    font-size: 16px;
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
`;
