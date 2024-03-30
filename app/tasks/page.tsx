import React from 'react';
import TaskCard from '../components/TaskCard';
import { Task } from '../interfaces/task';

interface TasksPageProps {
    tasks: Task[];
    section: string;
    className?: string;
    setSelectedTask: (task: Task) => void;
    setShowForm: (value: boolean) => void;
    onDelete?: (task: Task) => void;
}

const TasksPage: React.FC<TasksPageProps> = ({ section, tasks, className = '', setSelectedTask, setShowForm, onDelete, }) => {
    return (
        <div className={`flex flex-col ${className}`}>
            <div className="flex mx-auto w-80 overflow-hidden rounded-md font-bold text-gray-600 text-lg m-4 sticky top-0 bg-stone-300 z-10 p-2">
                <h1>{section}</h1>
            </div>
            {tasks.map((task, index) => (
                <TaskCard key={index} task={task} setSelectedTask={setSelectedTask} setShowForm={setShowForm} onDelete={onDelete} />
            ))}
        </div>
    );
};

export default TasksPage;
