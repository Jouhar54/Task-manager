import { useEffect, useState } from 'react'
import axios from 'axios';
import './TodoList.scss';

const url_api = "http://localhost:3003/api/todo";

const TodoList = () => {
  const [todoItems, setTodoItems] = useState([]);
  const [editingId, setEditingId] = useState('');
  const [newText, setNewText] = useState('');
  const [input, setInput] = useState('');

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

  const postTodo = async () =>{
    try {
      const response = await axios(url_api, {
        method: "POST",
        data:{
          todo: input
        }
      });
      setTodoItems(response.data);
      
    } catch (error) {
      console.log(error);
    }
  };

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
    <>
    <form onSubmit={postTodo} className="todo-input">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new todo"
      />
      <button type="submit">Add</button>
    </form>
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
              <p>{todo.todo}</p>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              <button onClick={() => handleEdit(todo.id)}>Edit</button>
            </>
          )}

        </li>
      ))}
    </ul>
    </>
  )
}

export default TodoList