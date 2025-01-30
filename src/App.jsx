import React, { useState, useEffect } from "react";
import { TbLetterX } from "react-icons/tb";
import { TbCopyCheck } from "react-icons/tb";
import Card from "./card";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todoList")) || [];
    setTodos(storedTodos);
  }, []);

  const saveTodos = (todos) => {
    localStorage.setItem("todoList", JSON.stringify(todos));
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (todoText.trim() === "") {
      return;
    } else if (todos.some((todo) => todo.text === todoText)) {
      return;
    } else {
      const newTodo = { text: todoText, completed: false };
      const newTodos = [...todos, newTodo];
      setTodos(newTodos);
      saveTodos(newTodos);
      setTodoText("");
    }
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    saveTodos(newTodos);
  };

  const toggleComplete = (index) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
    saveTodos(newTodos);
  };
  const progres=()=>{
    if(todos.length==0) return 0
    const completedText=todos.filter((value)=>value.completed).length
    return Math.round((completedText/todos.length)*100)
  }

  return (
    <div className="min-h-screen bg-[#caf0f8] flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-gray-800 mt-12 mb-6">
        Task List!
      </h1>
      <form onSubmit={addTodo} className="mb-6 w-full max-w-md">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Yangi todo qo'shing..."
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 px-4 transition-colors"
          >
            +
          </button>
        </div>
      </form>
      <ul className="w-full max-w-md space-y-2">
        {todos.map((todo, index) => (
          <li
            key={index}
            id={`todo-${index}`}
            className="flex justify-between items-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm"
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            <span>{todo.text}</span>
            <div className="flex gap-2">
              <input type="checkbox" onChange={() => toggleComplete(index)} />
              <button
                onClick={() => deleteTodo(index)}
                className="text-red-500 hover:text-red-700"
              >
                <TbLetterX />
              </button>
            </div>
          </li>
        ))}
      </ul>
      {todos.length !== 0 ? (
        <div className="flex flex-col gap-[5px] w-[30%] my-4">
          <div className="w-full flex justify-between items-center gap-[10px]">
            <h1 className="font-[600]">Progress</h1>
            <p className="font-[600]">{progres()}%</p>
          </div>
          <div className="w-full overflow-hidden flex justify-start h-[13px] bg-gray-300 rounded-[10px]">
            <div
              style={{ width: `${progres()}%` }}
              className="h-full bg-blue-400"
            ></div>
          </div>
        </div>
      ) : (
        ""
      )}

      <Card />
    </div>
  );
}

export default App;
