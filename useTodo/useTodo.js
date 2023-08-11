import { useEffect, useReducer } from "react";
import { todoReducer } from "./../08-useReducer/todoReducer";

const initialState = [
    // {
    //     id: new Date().getTime(),
    //     description: 'Ir al trabajo',
    //     done: false
    // },
];

const init = () => {
    return JSON.parse(localStorage.getItem('todos') ) || [];
}

export const useTodo = () => {
    const [ todos, dispatchTodo ] = useReducer(todoReducer, initialState, init);

    const handleAddTodo = (newTodo) => {
        dispatchTodo({
            type: 'add',
            payload: newTodo
        })
    };
    
    const handleRemoveTodo = (todoId) => {
        // console.log(todoId);
        dispatchTodo({
            type: 'remove',
            payload: todoId
        })
    };
    
    const handleToggleTodo = (todoId) => {
        // console.log(todoId);
        dispatchTodo({
            type: 'toggle',
            payload: todoId
        })
    };

    useEffect(() => {
        // console.log(todos);
        localStorage.setItem( 'todos', JSON.stringify(todos));
    }, [ todos ]);

    return {
        todos,
        handleAddTodo,
        handleRemoveTodo,
        handleToggleTodo,
        todosCount: todos.length,
        pendingTodosCount: todos.filter( t => !t.done).length,
    }
}
