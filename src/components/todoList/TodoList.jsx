import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleTodo, deleteTodo } from '../../app/todosSlice';
import axios from 'axios';
import './TodoList.scss';

const url_api = "http://localhost:3003/api/todo";

const TodoList = () => {
  const [todoItems, setTodoItems] = useState([]);
  const [editingId, setEditingId] = useState('');
  const [newText, setNewText] = useState('');

  const fetchTodo = async () => {
    try {
      const response = await axios(url_api)
      setTodoItems(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchTodo()
  }, []);

  const dispatch = useDispatch();

  const putTodo = async () => {
    try {
      const response = await axios(url_api, {
        method: "PUT",
        data: {
          id: editingId,
          todo: newText,
          isCompleted: false
        }
      })
      setTodoItems(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const deleteTodo = async (id) =>{
    try {
      const response = await axios(url_api, {
        method: "DELETE",
        data:{
          id: id
        }
      });
      setTodoItems(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleEdit = (id) => {
    setEditingId(id);
  };
  
  return (
    <ul className="todo-list">
      {todoItems.map((todo) => (
        <li key={todo.id} className={todo.completed ? 'completed' : ''}>
          {editingId === todo.id ? (
            <form onSubmit={putTodo}>
              <input
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                required
              />
              <button type="submit">Save</button>
              <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
            </form>
          ) : (
            <>
              <span onClick={() => dispatch(toggleTodo(todo.id))}>{todo.todo}</span>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              <button onClick={() => handleEdit(todo.id)}>Edit</button>
            </>
          )}

        </li>
      ))}
    </ul>
  )
}

export default TodoList