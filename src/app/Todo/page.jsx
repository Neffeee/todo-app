"use client";
import React, { useState, useEffect } from "react";
import { IoIosAddCircle } from "react-icons/io";
import TodoItem from "../components/TodoItem";
import { taskData } from "../data";

const page = () => {
  const [newTask, setNewTask] = useState("");
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all");

  // Loads data from localstorage and puts it inside State data and loads it.
  useEffect(() => {
    return () => {
      const storedData = localStorage.getItem("taskData");
      if (storedData) {
        setData(JSON.parse(storedData));
      }
    };
  }, []);

  const handleChange = (e) => {
    setNewTask(e.target.value);
  };

  // Handles the submit to add new task to todo list.
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newTask.trim()) return;
    const newId =
      data.length > 0 ? Math.max(...data.map((task) => task.id)) + 1 : 1;
    const newTasks = [...data, { id: newId, task: newTask, complete: false }];
    setData(newTasks);
    setNewTask("");
    //Set a new task to localstorage.
    localStorage.setItem("taskData", JSON.stringify(newTasks));
  };

  // Removes a task from task list. Takes a taskId as para
  const removeTask = (taskId) => {
    const updatedTasks = data.filter((task) => task.id !== taskId);
    setData(updatedTasks);
    // Remove item from localstorage
    localStorage.setItem("taskData", JSON.stringify(updatedTasks));
  };

  const filteredTasks = data.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    } else if (filter === "notCompleted") {
      return !task.completed;
    }
    return true;
  });
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl p-10 textColor">Things to do:</h1>
      <div className="border bg-white flex flex-row justify-center items-center">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newTask}
            className="w-[400px] h-12 p-3 "
            placeholder="Add new to do"
            onChange={handleChange}
          />
        </form>
        <div className="flex mr-5">
          <button type="submit">
            <IoIosAddCircle size={26} />
          </button>
        </div>
      </div>
      <div className="p-5">
        {/* We map the filteredTasks and display here. */}
        {filteredTasks
          .slice(0)
          .reverse()
          .map((item) => (
            <div key={item.id}>
              <TodoItem
                item={item}
                removeTask={removeTask}
                data={data}
                setData={setData}
              />
            </div>
          ))}
      </div>
      <div className="flex gap-2">
        <button className="btnStyling " onClick={() => setFilter("all")}>
          All
        </button>
        <button className="btnStyling" onClick={() => setFilter("completed")}>
          Completed
        </button>
        <button
          className=" btnStyling"
          onClick={() => setFilter("notCompleted")}
        >
          Not Completed
        </button>
      </div>
    </div>
  );
};

export default page;
