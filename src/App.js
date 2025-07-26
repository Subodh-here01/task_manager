import React, { useState, useEffect } from "react";
import "./App.css";
import Particles from "./ReactBits/Particles/Particles"; 

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, { text: input, completed: false }]);
    setInput("");
  };

  const toggleTask = (index) => {
    const updated = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
  <div className="App">
      
  <Particles 
  className="particles-bg"
  style={{ position: 'fixed', top: 0, left: 0, width: '600px', height: '100vh', zIndex: 0 , pointerEvents: 'none' }}
    particleColors={['#ffffff', '#ffffff']}
    fullScreen={true}
    particleCount={2000}
    particleSpread={10}
   
    speed={0.1}
    particleBaseSize={100}
    moveParticlesOnHover={true}
    alphaParticles={false}
    disableRotation={false}
  />

       <div className="todo-container">
        <h1> Task-manager</h1>
        <div className="input-container">
          <input
            type="text"
            value={input}
            placeholder="Add a new task..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button onClick={addTask}>Add</button>
        </div>

        <ul className="task-list">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={task.completed ? "completed" : ""}
              onClick={() => toggleTask(index)}
            >
              {task.text}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(index);
                }}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
  </div>
  );
}

export default App;
