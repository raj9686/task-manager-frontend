import { Task } from "../interfaces/task";

export async function fetchTasks() {
  const response = await fetch("http://localhost:3005/tasks");
  const taskData: Task[] = await response.json();
  return taskData;
}

export async function addTask(task: Task) {
  const response = await fetch("http://localhost:3005/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  const taskData: Task = await response.json();
  return taskData;
}

export async function updateTask(task: Task) {
  const response = await fetch(`http://localhost:3005/tasks/${task._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  return response;
}

export async function deleteTask(task: Task) {
  const response = await fetch(`http://localhost:3005/tasks/${task._id}`, {
    method: "DELETE",
  });
  return response;
}
