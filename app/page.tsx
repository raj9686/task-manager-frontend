'use client'
import React, { useEffect, useState } from "react";
import { FaTape } from 'react-icons/fa';
import TasksPage from "./tasks/page";
import { Task } from "./interfaces/task";
import TaskForm from "./components/TaskForm";
import { deleteTask, fetchTasks } from "./api/tasks";

export default function Home() {
  const [task, setSelectedTask] = useState<Task>({} as Task);
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({
    "To Do": [],
    "In Progress": [],
    "Done": []
  });
  const [loading, setLoading] = useState(true); // Add loading state

  const fetchAndGroupTasks = async () => {
    const tasks = await fetchTasks();
    const groupedTasks = tasks.reduce((acc: { [key: string]: Task[] }, task: Task) => {
      acc[task.status].push(task);
      return acc;
    }, { "To Do": [], "In Progress": [], "Done": [] });
    setTasks(groupedTasks);
    setLoading(false); // Set loading to false after data is fetched
  };

  useEffect(() => {
    fetchAndGroupTasks();
  }, []);


  const onCancel = async () => {
    setShowForm(false);
    setSelectedTask({} as Task);
    await fetchAndGroupTasks();
  }

  const onDelete = async (task: Task) => {
    await deleteTask(task);
    await fetchAndGroupTasks();
  }

  return (
    <main>
      {showForm && <TaskForm task={task} onCancel={onCancel} />}
      <div className="flex items-center justify-between ml-6">
        <div className="flex items-center">
          <FaTape size={40} color="#404040" />
          <h1 className="text-3xl font-bold p-2 text-gray-700">Task Board</h1>
        </div>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white  py-2 px-4 m-4 rounded"
          onClick={() => setShowForm(true)}
        >
          Add Task
        </button>
      </div>
      {loading ? (
        <div className="grid grid-cols-4 min-h-screen justify-center">
          <div className="animate-pulse flex items-center justify-center col-span-4">
            <div className="bg-gray-300 h-48 w-48 rounded-md m-5"></div>
            <div className="bg-gray-300 h-72 w-48 rounded-md m-5"></div>
            <div className="bg-gray-300 h-96 w-48 rounded-md m-5"></div>
            <div className="bg-gray-300 h-72 w-48 rounded-md m-5"></div>
            <div className="bg-gray-300 h-48 w-48 rounded-md m-5"></div>
          </div>
          <div className="flex items-center justify-center col-span-4">
            LOADING...
          </div>
        </div>

      ) : (
        <div className="grid grid-cols-4 min-h-screen justify-center">
          {Object.keys(tasks).map((section) => (
            <TasksPage
              key={section}
              section={section as "To Do" | "In Progress" | "Done"}
              tasks={tasks[section]}
              setSelectedTask={setSelectedTask}
              setShowForm={setShowForm}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </main>
  );
}
