import React from 'react';
import { useGetTasksQuery } from './tasksApiSlice';
import Task from './Task';
import useAuth from '../../hooks/useAuth';
import PulseLoader from 'react-spinners/PulseLoader';

const TasksList = () => {

    const { username, isAdmin } = useAuth()

  const {
        data: tasks,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTasksQuery('tasksList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    }) 

    let content;

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError) {
      content = <p className="errmsg">{error?.data?.message}</p>
    }

      if (isSuccess) {

        const { ids, entities } = tasks

        let filteredIds;
        if (isAdmin) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(taskId => entities[taskId].username === username)
        }

        const tableContent = ids?.length && filteredIds.map(taskId => <Task key={taskId} taskId={taskId} />)

        content = (
            <div className="sm:ml-80 max-w-full mx-20 my-2 border rounded-2xl border-gray-200 shadow-lg form-container ">


            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                <thead className='bg-pink-100'>
                    <tr>
                        <th scope='col' className='px-5 py-4 font-medium text-gray-900'>Task</th>
                        <th scope='col' className='px-10 py-4 font-medium text-gray-900'>Status</th>
                        <th scope='col' className='px-10 py-4 font-medium text-gray-900'>Date</th>
                        <th scope="col" className='px-10 py-4 font-medium text-gray-900'>Owner</th>
                        <th scope="col" className='px-10 py-4 font-medium text-gray-900'>Edit</th>
                        <th scope="col" className='px-10 py-4 font-medium text-gray-900'></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                    {tableContent}

                </tbody>
            </table>
            </div>
        )
    }

    return content;
}

export default TasksList
