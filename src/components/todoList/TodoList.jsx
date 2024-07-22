import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleTodo, deleteTodo, editTodo } from '../../app/todosSlice';
import axios from 'axios';
import './TodoList.scss';

const url_api = "http://localhost:3003/api/todo";

const TodoList = () => {
  const [todoItems, setTodoItems] = useState([]);

  const fetchTodo = async ()=>{
    try{
      const response = await axios(url_api)
      setTodoItems(response.data);
      console.log(response.data);
    }catch (err){
      console.log(err);
    }
  }

  useEffect(()=>{
    fetchTodo()
  },[]);

    const dispatch = useDispatch();
    const [editingId, setEditingId] = useState(null);
    const [newText, setNewText] = useState('');

  const putTodo = async () => {
    try {
      await axios(url_api, {
        method: "PUT",
        data:{
          id : editingId,
          todo: newText,
          isCompleted : false
        }
      })
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const newTodo = (id, text) => {
    setEditingId(id);
    setNewText(text)
    e.preventDefault();
    dispatch(editTodo({ id: editingId, text: newText }));
    setEditingId(null);
    setNewText('');
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
          ) :(<>
            <span onClick={() => dispatch(toggleTodo(todo.id))}>{todo.todo}</span>
          <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
          <button onClick={ ()=>putTodo(todo.id) }>Edit</button>
          </>
          )}
          
        </li>
      ))}
    </ul>
  )
}

export default TodoList