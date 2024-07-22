import './App.scss'
import TodoInput from './components/todoInput/TodoInput'
import TodoList from './components/todoList/TodoList'

function App() {

  return (
    <>
      <div className='app'>
        <div className='outerDiv'>
          <h1>Todo App</h1>
          <TodoInput />
          <TodoList />
        </div>
      </div>
    </>
  )
}

export default App
