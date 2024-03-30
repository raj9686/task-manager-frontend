import React from "react";
import { FaTrash } from 'react-icons/fa';
import { Task } from "../interfaces/task";

interface TaskCardProps {
    task: Task;
    setSelectedTask?: (task: Task) => void;
    setShowForm?: (value: boolean) => void;
    onDelete?: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, setSelectedTask, setShowForm, onDelete }) => {
    const onClick = () => {
        if (setSelectedTask) setSelectedTask(task);
        if (setShowForm) setShowForm(true);
    };

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete this task?")) {
            if (onDelete) onDelete(task);
        }
    };

    return (
        <div className="relative mx-auto w-80 rounded overflow-hidden shadow-lg m-4 bg-slate-100" onClick={onClick}>
            <div className="px-6 py-4">
                <div className="font-bold text-sm mb-2 text-gray-700">{task?.title}</div>
                <p className="text-gray-600 text-pretty text-sm">{task?.description}<br /></p>
                {onDelete && (
                    <button onClick={handleDelete} className="absolute bottom-0 right-0 m-2 text-gray-400 hover:text-gray-700 focus:outline-none">
                        <FaTrash />
                    </button>
                )}
            </div>
        </div>
    );
};

export default TaskCard;
