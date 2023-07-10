const TodoList = (props) => {
    return (
        <div>
            {props.todos
                .sort((a, b) => b.id - a.id)
                .map((todo, index) => (
                    <div key={index} className="bg-gray-200 p-4 flex justify-between items-center cursor-pointer">
                        <h2
                            onClick={() => props.handleCheck(todo.id)}
                            className={`${todo.completed ? 'line-through' : ''}`}
                        >
                            {todo.id} - {todo.title}
                        </h2>
                        <span
                            onClick={() => props.handleRemove(todo.id)}
                            className="bg-red-500 text-white text-xs rounded-md p-2"
                        >
                            Remove
                        </span>
                    </div>
                ))}
        </div>
    );
};

export default TodoList;
