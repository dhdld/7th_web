import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoList from './components/TodoList';
import TodoDetail from './components/TodoDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/todo/:id" element={<TodoDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
