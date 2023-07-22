import { useState } from "react";
import Header from "./components/Header";
import TodoList from "./components/TodoList";

export default function App() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([
    { id: 1, title: "aa", completed: false },
    { id: 2, title: "bbb", completed: false },
    { id: 3, title: "ccc", completed: true },
    { id: 4, title: "dddd", completed: true },
    { id: 5, title: "eeeeeee", completed: false },
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

  const handleEdit = (id, newText) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, title: newText };
        }
        return todo;
      })
    );
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
              />
            </label>
          </form>
        </div>
        <TodoList
          todos={todos}
          handleCheck={handleCheck}
          handleRemove={handleRemove}
          setTitle={setTitle}
          handleEdit={handleEdit}
        />
      </div>
    </div>
  );
}
