import { useState } from "react";
import Header from "./components/Header";

export default function App() {
  const [showTodos, setShowTodos] = useState(true);
  const [newTodo, setNewTodo] = useState({
    id: "",
    title: "",
    completed: false,
  });
  const [todos, setTodos] = useState([
    { id: 1, title: "Learning React", completed: false },
    { id: 2, title: "Learning English", completed: false },
    { id: 3, title: "Learning JavaScript", completed: false },
    { id: 4, title: "Watch movie", completed: false },
    { id: 5, title: "Runing", completed: false },
  ]);
  const handleRemove = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => {
        return id !== todo.id;
      });
    });
  };
  const handleCheck = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      })
    );
  };
  const handleChange = (value) => {
    console.log(value);
    setNewTodo({
      id: Math.random * 1000,
      title: value,
      completed: false,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos((prevTodos) => {
      return [...prevTodos, newTodo];
    });
    setNewTodo({ id: "", title: "", completed: false });
  };
  return (
    <div className="container mx-auto">
      <Header />
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
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              <input
                value={newTodo.title}
                onChange={(e) => handleChange(e.target.value)}
                type="text"
                placeholder="New todo ..."
                className="w-full border border-gray-400 p-2"
              />
            </label>
          </form>
        </div>
        {showTodos &&
          todos.map((todo, index) => (
            <div
              key={index}
              className="bg-gray-200 p-4 flex justify-between items-center cursor-pointer"
            >
              <h2
                onClick={() => handleCheck(todo.id)}
                className={`${todo.completed ? "line-through" : ""}`}
              >
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
