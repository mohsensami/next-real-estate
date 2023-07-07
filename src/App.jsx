import { useState } from 'react';

export default function App() {
    const [showTodos, setShowTodos] = useState(true);
    const [todos, setTodos] = useState([
        { id: 1, title: 'Learning React', completed: false },
        { id: 2, title: 'Learning English', completed: false },
        { id: 3, title: 'Learning JavaScript', completed: false },
        { id: 4, title: 'Watch movie', completed: false },
        { id: 5, title: 'Runing', completed: false },
    ]);
    const handleRemove = (id) => {
        setTodos((prevTodos) => {
            return prevTodos.filter((todo) => {
                return id !== todo.id;
            });
        });
    };
    return (
        <div className="container mx-auto">
            <h1 className="text-3xl text-center py-4">React Todos</h1>
            <hr />
            <div className="flex justify-center gap-2">
                <button className="bg-red-500 p-2" onClick={() => setShowTodos(true)}>
                    Show
                </button>
                <button className="bg-red-500 p-2" onClick={() => setShowTodos(false)}>
                    Hide
                </button>
            </div>
            <div className="flex flex-col gap-2 max-w-sm mx-auto">
                {showTodos &&
                    todos.map((todo, index) => (
                        <div key={index} className="bg-gray-200 p-4 flex justify-between items-center">
                            <h2>
                                {index + 1} - {todo.title}
                            </h2>
                            <span
                                onClick={() => handleRemove(todo.id)}
                                className="bg-red-500 text-white p-1 cursor-pointer"
                            >
                                X
                            </span>
                        </div>
                    ))}
            </div>
        </div>
    );
}
