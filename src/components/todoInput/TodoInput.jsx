import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { addTodo } from '../../app/todosSlice';
import './TodoInput.scss';
import axios from 'axios';

const api_url = "http://localhost:3003/api/todo";

const TodoInput = () => {
    const [input, setInput] = useState('');

    const postTodo = async () =>{
      try {
        await axios(api_url, {
          method: "POST",
          data:{
            todo: input
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <form onSubmit={postTodo} className="todo-input">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new todo"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoInput;