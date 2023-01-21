import React, { useState } from "react";
import "./App.css";

function App() {
    const [todos, setTodos] = useState([
        { id: 1, content: "watch TV", done: false },
        { id: 2, content: "playing football", done: false },
        { id: 3, content: "Learning javascript", done: false },
    ]);
    return (
        <div className="App ">
            <section>
                <h2 className="bg-gray-600 text-white text-left pl-2 py-2">
                    Hello <input className="focus:outline-0 bg-gray-600" type="text" id="name" placeholder="Name here" v-model="name" />
                </h2>
            </section>
            <section>
                <div className="grid grid-cols-12">
                    <div className="col-span-12 bg-gray-100">
                        <form className="p-16" id="new-todo-form">
                            <div className="">
                                <h2 className="text-center text-2xl py-4">MY TODO LIST</h2>
                                <div className="flex">
                                    <input className="w-full py-2 px-4 border-gray-200 border focus:outline-none" type="text" name="content" id="content" placeholder="e.g. make a ToDo" v-model="input_content" />
                                    <input className="bg-gray-700 text-white cursor-pointer py-1 px-8" type="submit" value="Add todo" />
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="col-span-12 bg-gray-100">
                        <div className="mx-auto flex flex-col gap-1" id="todo-list">
                            <div className="bg-gray-500 w-full flex text-white text-center items-center" v-for="todo in todos">
                                <div className="todo-content flex-grow cursor-pointer text-xl"></div>

                                <div className="actions">
                                    <button className="bg-red-500 text-white p-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default App;
