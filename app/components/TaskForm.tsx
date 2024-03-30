import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Task } from '../interfaces/task';
import { addTask, updateTask } from '../api/tasks';

interface Props {
    task: Task;
    onCancel: () => void;
}

const TaskForm: React.FC<Props> = ({ task, onCancel }) => {
    const [editedTask, setEditedTask] = useState({ ...task });
    const [titleError, setTitleError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedTask((prevTask) => ({ ...prevTask, [name]: value }));
        if (name === 'title') {
            setTitleError(value.trim() === '' ? 'Title is required' : '');
        }
    };

    const handleStatusChange = (status: string) => {
        setEditedTask((prevTask) => ({ ...prevTask, status }));
    };

    const onSubmit = async () => {
        if (!editedTask.title || editedTask.title.trim() === '') {
            setTitleError('Title is required');
            return;
        }

        let response = null;
        if (editedTask._id) {
            response = await updateTask(editedTask);
        } else {
            response = await addTask({ ...editedTask, status: 'To Do' });
        }
        onCancel();
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-800 bg-opacity-50 z-20">
            <div className="bg-white p-6 rounded-lg shadow-md w-1/3 relative ">
                <button
                    className="absolute top-2 right-6 text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={onCancel}
                >
                    <FaTimes size={24} />
                </button>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-bold text-gray-700 mb-2">Title:</label>
                    <input
                        id="title"
                        name="title"
                        className={`border border-gray-300 rounded-md w-full py-2 px-3 text-sm focus:outline-none focus:border-blue-500 bg-white ${titleError && 'border-red-500'}`}
                        type="text"
                        value={editedTask.title}
                        onChange={handleChange}
                    />
                    {titleError && <p className="text-red-500 text-xs mt-1">{titleError}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-bold text-gray-700 mb-2">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        className="border min-h-[10rem] border-gray-300 rounded-md w-full py-2 px-3 text-sm focus:outline-none focus:border-blue-500 bg-white"
                        value={editedTask.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                {editedTask._id && (
                    <div className="mb-4 flex items-center">
                        <label className="block text-sm font-bold text-gray-700 mr-2">Status:</label>
                        <div className=' text-gray-600 text-xs'>
                            <button
                                className={`mr-2 ${editedTask.status === 'To Do' ? 'bg-blue-500 text-white' : 'bg-gray-200'} px-2 py-1 rounded-xl`}
                                onClick={() => handleStatusChange('To Do')}
                            >
                                To Do
                            </button>
                        </div>
                        <div className=' text-gray-600 text-xs'>
                            <button
                                className={`mr-2 ${editedTask.status === 'In Progress' ? 'bg-blue-500 text-white' : 'bg-gray-200'} px-2 py-1 rounded-xl`}
                                onClick={() => handleStatusChange('In Progress')}
                            >
                                In Progress
                            </button>
                        </div>
                        <div className=' text-gray-600 text-xs'>
                            <button
                                className={`mr-2 ${editedTask.status === 'Done' ? 'bg-blue-500 text-white' : 'bg-gray-200'} px-2 py-1 rounded-xl`}
                                onClick={() => handleStatusChange('Done')}
                            >
                                Done
                            </button>
                        </div>
                    </div>

                )}

                <div className="flex justify-end">
                    <button
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none"
                        onClick={onSubmit}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskForm;
