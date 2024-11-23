import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import TodoItem from './TodoItem';

function TodoList() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // 사용자가 입력한 검색어
  const [debouncedQuery, setDebouncedQuery] = useState(''); // 디바운스된 검색어
  const queryClient = useQueryClient();

  // 디바운스 로직
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300); // 300ms 대기

    // cleanup 함수: 입력 중 새 타이머를 설정하면 기존 타이머를 제거
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // GET 요청: Todo 리스트 가져오기
  const { data: todos, error, isLoading } = useQuery({
    queryKey: ['todos', debouncedQuery], // 디바운스된 검색어를 쿼리 키에 포함
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/todo`, {
        params: { title: debouncedQuery || undefined }, // 검색어가 없으면 전체 데이터를 가져옴
      });
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

  // 검색 입력 핸들러
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container>
      <h1>UMC Todolist</h1>
      <SearchDiv>
        <input
          type="text"
          placeholder="검색할 제목을 입력하세요"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </SearchDiv>
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
        {todos && todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </Container>
  );
}

export default TodoList;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchDiv = styled.div`
  margin: 10px 0;
  width: 60%;

  input {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
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
