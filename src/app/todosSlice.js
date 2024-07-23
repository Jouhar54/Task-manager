import { createSlice } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
    name : 'todos',
    initialState : [],
    reducers : {
        toggleTodo: (state, action) =>{
            const todo = state.find(todo => todo.id === action.payload);
            if (todo){
                todo.completed = !todo.completed;
                console.log(todo.completed);
            }
        },
        deleteTodo: (state, action)=>{
            return state.filter(todo => todo.id !== action.payload);
        },
    },
});

export const { toggleTodo, deleteTodo } = todosSlice.actions;

export default todosSlice.reducer;