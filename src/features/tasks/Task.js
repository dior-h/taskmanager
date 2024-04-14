import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useGetTasksQuery } from './tasksApiSlice';
import { memo } from 'react';

const Task = ({ taskId }) => {

    const { task } = useGetTasksQuery("tasksList", {
        selectFromResult: ({ data }) => ({
            task: data?.entities[taskId]
        }),
    })
    
    const navigate = useNavigate();

    if (task) {

        const created = new Date(task.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long'});
        const updated = new Date(task.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long'});
        const handleEdit = () => navigate(`/dash/tasks/${taskId}`)

        return (

        <>
            <tr class="hover:bg-gray-50">
                <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
                <div class="text-sm">
                    <div class="font-medium text-gray-700">{task.title}</div>
                    <div class="text-gray-400">{task.text}</div>
                </div>
                </th>
                <td class="px-6 py-4">
                    {task.completed
                        ? <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                          <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>Done</span>
                        : <span class="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-2 py-1 text-xs font-semibold text-yellow-600">
                          <span class="h-1.5 w-1.5 rounded-full bg-yellow-600"></span>In progress</span>
                    }
                </td>
                <td class="px-6 py-4">{created}</td>
                <td class="px-6 py-4">
                <div class="flex gap-2">
                    <span
                    class="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
                    >
                    {task.username}
                    </span>
                </div>
                </td>
                <td class="px-6 py-4">
                <div class="flex justify-end gap-4">
                    <button x-data="{ tooltip: 'Edite' }" onClick={handleEdit}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="h-6 w-6"
                        x-tooltip="tooltip"
                    >
                        <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                    </svg>
                    </button>
                </div>
                </td>
            </tr>

            </>
        );

    } else {
        return null;
    }
}

const memoizedTask = memo(Task)
export default memoizedTask
