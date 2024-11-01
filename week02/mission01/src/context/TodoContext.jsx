import { createContext, useState } from "react";

export const TodoContext = createContext();

export function TodoContextProvider({children}){
    const [todos, setTodos] = useState([
        {
          id: 1,
          task: '할일1',
        }
      ])
    
      const [text, setText] = useState('')
    
      const [editngId, setEditingId] = useState('')
      const [editingText, setEditingText] = useState('')
    
      const handleSubmit = (e) => {
        e.preventDefault()
      }
    
      const addTodo = () => {
        setTodos((prev) => [
          ...prev,
          { id: Math.floor(Math.random() * 100) * 2, task: text }
        ])
        setText('')
      }
    
      const deleteTodo = (id) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id))
      }
    
      const updateTodo = (id, text) => {
        setTodos((prev) => prev.map((item) =>
          (item.id === id ? { ...item, task: text } : item)
        ))
        setEditingId('')
      }

    return <TodoContext.Provider
    value={{
        todos,
        setTodos,
        text, setText,
        editngId, setEditingId,
        editingText, setEditingText,
        handleSubmit,
        addTodo,
        deleteTodo,
        updateTodo
    }}
    >{children}</TodoContext.Provider>
}

