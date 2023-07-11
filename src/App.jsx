import { useState } from "react";
import Header from "./components/Header";
import TodoList from "./components/TodoList";

export default function App() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([
    { id: 1, title: "Learning React", completed: false },
    { id: 2, title: "Learning English", completed: false },
    { id: 3, title: "Learning JavaScript", completed: true },
    { id: 4, title: "Watch movie", completed: true },
    { id: 5, title: "Runing", completed: false },
  ]);
  const handleRemove = (id) => {
    const shouldRemove = window.confirm(
      "Are you sure you want to remove this?"
    );
    if (shouldRemove) {
      setTodos((prevTodos) => {
        return prevTodos.filter((todo) => {
          return id !== todo.id;
        });
      });
    }
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      id: todos.length + 1,
      title: title,
      completed: false,
    };
    setTodos((prevTodos) => {
      return [...prevTodos, newTodo];
    });
    setTitle("");
  };
  return (
    <div className="container mx-auto">
      <Header />
      <hr />

      <div className="flex flex-col gap-2 max-w-sm mx-auto">
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="New todo ..."
                className="w-full border border-gray-400 p-2"
              />
            </label>
          </form>
        </div>
        <TodoList
          todos={todos}
          handleCheck={handleCheck}
          handleRemove={handleRemove}
        />
      </div>
    </div>
  );
}
