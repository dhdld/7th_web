import { useState } from 'react'
import TodoList from './components/TodoList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>UMC TodoList</h1>
      <TodoList />
    </>
  )
}

export default App
