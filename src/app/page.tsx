"use client";
import TaskComponent from "@/components/TaskComponent";
import Task from "@/classes/Task";
import { useState } from "react";

export default function Home() {
  let localStorageAllTasks: string | null = localStorage.getItem("allTasks");
  let allTasksTemp = localStorageAllTasks
    ? convertStringToTask(localStorageAllTasks)
    : [new Task("task 1", true), new Task("task 2", false)];
  let [allTasks, setAllTasks] = useState(allTasksTemp);
  let [tasks, setTasks] = useState(allTasks);

  const [inputName, setInputName] = useState("");

  function convertStringToTask(taskString: string): Task[] {
    return JSON.parse(taskString).map(
      (taskData: Task) => new Task(taskData.name, taskData.isCompleted)
    );
  }

  const add = () => {
    if(!inputName)
      return;
    const newTask = new Task(inputName, false);
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setAllTasks((prevTasks) => [...prevTasks, newTask]);
    localStorage.setItem("allTasks", JSON.stringify([...allTasks, newTask]));
    setInputName("");
  };

  let filter = (filterType: string) => {
    let filteredTasks: Task[] = [];
    if (filterType == "all") {
      setTasks(allTasks);
    } else {
      if (filterType == "completed") {
        filteredTasks = allTasks.filter((t) => t.isCompleted == true);
      } else if (filterType == "active") {
        filteredTasks = allTasks.filter((t) => t.isCompleted == false);
      }
      setTasks(filteredTasks);
    }
  };

  const handleInputNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.value);
  };

  return (
    <div>
      {/* Add */}
      <div className="ms-3 mt-3">
        <span>New Task : </span>
        <input
          type="text"
          value={inputName}
          onChange={handleInputNameChange}
          className="w-64 shadow mb-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button
          className="bg-blue-500 ms-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={add}
        >
          Add
        </button>
      </div>

      {/* filters */}
      <div className="mt-3">
        <button
          className="bg-green-500 text-white font-bold py-2 px-4 rounded mx-3"
          onClick={() => filter("all")}
        >
          All
        </button>
        <button
          className="bg-green-500 text-white font-bold py-2 px-4 rounded mx-3"
          onClick={() => filter("completed")}
        >
          Completed
        </button>
        <button
          className="bg-green-500 text-white font-bold py-2 px-4 rounded mx-3"
          onClick={() => filter("active")}
        >
          Active
        </button>
      </div>

      {/* list */}
      {tasks.map((task) => (
        <TaskComponent task={task} />
      ))}
    </div>
  );
}
