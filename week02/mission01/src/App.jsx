import './App.css'
import { useContext } from 'react'
import Button from './Button';
import Input from './Input';
import { TodoContext } from './context/TodoContext';

function App() {
  const  {
    todos,
        setTodos,
        text, setText,
        editngId, setEditingId,
        editingText, setEditingText,
        handleSubmit,
        addTodo,
        deleteTodo,
        updateTodo
  } = useContext(TodoContext)

  return (
    <div className='container'>
      <form onSubmit={handleSubmit} className="form-container">
        <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="할 일을 입력하세요" />
        <Button onClick={addTodo} className="todo-button">할 일 등록</Button>
      </form>
      <div>
        {todos.map((todo, _) => (
          <div key={todo.id} className="todo-container">
            {editngId !== todo.id && (
              <div key={todo.id} className="todo-item">
                <p className="todo-id">{todo.id}.</p>
                <p className="todo-task">{todo.task}</p>
              </div>
            )}
            {editngId === todo.id && (
              <div key={todo.id} className="todo-item">
                <p className="todo-id">{todo.id}.</p>
                <Input defaultValue={todo.task} onChange={(e) => setEditingText(e.target.value)} />
              </div>
            )}
            <Button onClick={() => deleteTodo(todo.id)} className="todo-button">삭제하기</Button>

            {editngId === todo.id ? (
              <Button onClick={() => updateTodo(editngId, editingText)} className="todo-button">수정 완료</Button>
            ) : (
              <Button onClick={() => {
                setEditingId(todo.id)
                setEditingText(todo.task)
              }} className="todo-button">수정 진행</Button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App;
