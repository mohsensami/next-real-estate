import { useState } from "react";

const TodoList = (props) => {
  const [editId, setEditId] = useState(null);
  const [edit, setEdit] = useState("");
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      console.log(event.target.value);
    }
  };

  return (
    <div>
      {props.todos
        .sort((a, b) => b.id - a.id)
        .map((todo, index) => (
          <div key={index}>
            {editId === todo.id ? (
              <input
                onChange={(e) => setEdit(e.target.value)}
                type="text"
                value={edit}
                onKeyDown={handleKeyDown}
              />
            ) : (
              <h2
                onClick={() => props.handleCheck(todo.id)}
                className={`${todo.completed ? "line-through" : ""}`}
              >
                {todo.id} - {todo.title}
              </h2>
            )}
            <span onClick={() => props.handleRemove(todo.id)}>Remove</span>
            <span
              onClick={() => {
                setEditId(todo.id);
                setEdit(todo.title);
              }}
            >
              Edit
            </span>
          </div>
        ))}
    </div>
  );
};

export default TodoList;
