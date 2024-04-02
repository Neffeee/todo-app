"use client";
import React, { useState } from "react";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { MdEdit } from "react-icons/md";

const TodoItem = ({ item, data, setData, removeTask }) => {
  const [editingTaskId, setEditingTaskId] = useState(null); // State to track the task being edited
  const [editedTaskText, setEditedTaskText] = useState(""); // State to track the edited task text

  const handleEditChange = (e) => {
    setEditedTaskText(e.target.value);
  };


  const handleEditStart = (taskId, taskText) => {

      setEditingTaskId(taskId);
      setEditedTaskText(taskText);
    
  };
  
  const toggleCompleted = (taskId) => {
    const updatedTasks = data.map(task => {
        if (task.id === taskId){
            return {...task, completed: !task.completed}
        }
        return task;
    })
    setData(updatedTasks)
  }
  const handleEditSubmit = (taskId) => {
    // Find the tas being edited in data array
    const updatedTasks = data.map((task) => {
      if (task.id === taskId) {
        return { ...task, task: editedTaskText }; // Update the task text
      }
      return task;
    });
    setData(updatedTasks); //Update the data stat
    setEditingTaskId(null); // Reset editing state
    setEditedTaskText(""); // Reset edited task text
    localStorage.setItem("taskData", JSON.stringify(updatedTasks));
  };

  return (

    <div className="flex flex-row items-center gap-2 p-3 w-[400px] border">
  <input type="checkbox" checked={item.completed || false} onChange={() => toggleCompleted(item.id)}/>
  <div className="flex flex-col flex-grow">
    <div className="flex justify-between">
      <h1 className={item.completed ? "completed-task" : "incomplete-task"}>{item.task}</h1>
      <div>
        <button onClick={() => handleEditStart(item.id, item.task)}>
          <MdEdit size={24} />
        </button>
        <button onClick={() => removeTask(item.id)}>
          <IoIosRemoveCircleOutline size={24} />
        </button>
      </div>
    </div>
    {editingTaskId === item.id && (
      <input 
        type="text"
        value={editedTaskText}
        onChange={handleEditChange}
        onBlur={() => handleEditSubmit(item.id)}
        onKeyPress={(e) => {
            if (e.key === 'Enter'){
                handleEditSubmit(item.id)
            }
        }}
        autoFocus={true}
      />

    )}
  </div>
</div>

  );
};

export default TodoItem;
