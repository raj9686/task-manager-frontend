'use client';
import TasksPage from "./tasks/page";
import TaskForm from "./components/TaskForm";
import React from "react";
import { FaTape } from 'react-icons/fa';
import { Task } from "./interfaces/task";

export default function Home() {
    const data = [
        { name: 'Implement RESTful API for user authentication', description: 'Create endpoints for user registration, login, logout, and password reset using Node.js and Express.', status: 'In Progress' },
        { name: 'Integrate JWT authentication', description: 'Implement JSON Web Token (JWT) authentication to secure API endpoints and manage user sessions.', status: 'Done' },
        { name: 'Set up database schema for user data', description: 'Design and create database tables for storing user information such as username, email, and hashed passwords.', status: 'To Do' },
        { name: 'Create API documentation', description: 'Generate API documentation using tools like Swagger to provide clear guidelines for API consumers.', status: 'Backlog' },
        { name: 'Write unit tests for API endpoints', description: 'Develop unit tests using a testing framework like Jest to ensure API functionality is reliable and error-free.', status: 'Done' },
        { name: 'Optimize database queries', description: 'Improve performance by optimizing database queries and indexing for faster data retrieval.', status: 'To Do' },
        { name: 'Implement rate limiting and security measures', description: 'Add rate limiting, input validation, and other security measures to protect the API from abuse and attacks.', status: 'In Progress' },
        { name: 'Refactor code for better maintainability', description: 'Review and refactor existing codebase to improve readability, maintainability, and adherence to best practices.', status: 'In Progress' },
        { name: 'Deploy API to production environment', description: 'Deploy the API to a production server, configure environment variables, and set up logging and monitoring.', status: 'To Do' },
        { name: 'Monitor API performance and handle errors', description: 'Set up monitoring tools to track API performance metrics and implement error handling strategies.', status: 'Backlog' },
        { name: 'Implement caching for frequently accessed data', description: 'Integrate caching mechanisms such as Redis to cache responses and reduce server load for frequently accessed data.', status: 'To Do' },
        { name: 'Collaborate with frontend team for API integration', description: 'Work closely with frontend developers to integrate API endpoints into the frontend application and ensure compatibility.', status: 'In Progress' },
        { name: 'Document deployment process and setup instructions', description: 'Create documentation outlining the deployment process and setup instructions for new developers joining the team.', status: 'To Do' },
        { name: 'Review and provide feedback on code changes', description: 'Participate in code reviews to provide constructive feedback and ensure code quality and consistency.', status: 'Backlog' },
        { name: 'Attend team meetings and participate in sprint planning', description: 'Participate in regular team meetings, sprint planning sessions, and retrospective meetings to discuss progress and plan upcoming work.', status: 'In Progress' },
    ];
    const fakeTaskData = data.map((task, index) => ({
        id: index + 1,
        ...task,
    }));

    // call api to get tasks localhost:3005/tasks
    const [tasks, setTasks] = React.useState([]);
    const setMTasks = async () => {
        const mData = async () => await fetch('http://localhost:3005/tasks');
        const data = await mData();
        const taskData: Task[] = await data.json();
        setTasks(taskData as Task[]);
    };
    React.useEffect(() => {
        setMTasks();
    });

    const [showForm, setShowForm] = React.useState(false);
    const [tast, setTask] = React.useState({ id: 0, title: '', description: '' });
    const onClick = (id: any) => {
        setShowForm(true);
        const t = tasks.find((task) => task.id === id);
        if (t)
            setTask(t);
    };
    const onCancel = () => {
        setShowForm(false);
        setTask({ id: 0, title: '', description: '' });
    };
    return (
        <main>
            {showForm && <TaskForm task={tast} onCancel={onCancel} />}
            <div className="flex items-center ml-6">
                <FaTape size={40} color="#404040" />
                <h1 className="text-3xl font-bold p-2 text-gray-700">Task Board</h1>
            </div>
            <div className="grid grid-cols-4 min-h-screen justify-center">
                <TasksPage section="In progress" tasks={tasks} onClick={onClick} />
            </div>
        </main>

    );
}
