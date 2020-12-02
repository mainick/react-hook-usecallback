import React, { useState, useCallback } from "react";
import { v4 as uuid } from "uuid";

const App = () => {
    console.log("Render Component App");
    const [todos, setTodos] = useState([
        { id: uuid(), title: "imparare React" },
        { id: uuid(), title: "imparare gli state" },
        { id: uuid(), title: "imparare i componenti funzionali" },
    ]);
    const [task, setTask] = useState("");

    const onChangeTask = (e) => {
        setTask(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (task.trim() === "") return;

        setTodos([...todos, { title: task }]);
        setTask("");
    };

    const handleRemove = useCallback(
        (id) => {
            setTodos(todos.filter((todo) => todo.id !== id));
        },
        [todos]
    );

    return (
        <div>
            <ListTodos todos={todos} onRemove={handleRemove} />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={task}
                    placeholder="aggiungi todo"
                    onChange={onChangeTask}
                />
            </form>
        </div>
    );
};

const ListTodos = React.memo(({ todos, onRemove }) => {
    console.log("Render Component ListTodos");
    return (
        <ul>
            {todos.map((item, i) => (
                <Todo key={i} todo={item} onRemove={onRemove} />
            ))}
        </ul>
    );
});

const Todo = React.memo(({ todo, onRemove }) => {
    console.log("Render Component Todo");
    return (
        <li key={todo.id} onClick={() => onRemove(todo.id)}>
            {todo.title}
        </li>
    );
});

export default App;
