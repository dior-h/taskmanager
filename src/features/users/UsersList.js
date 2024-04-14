import React from 'react';
import { useGetUsersQuery } from "./usersApiSlice";
import User from './User';
import PulseLoader from 'react-spinners/PulseLoader';

const UsersList = () => {

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('usersList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    }) 

    let content; 

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if(isError) {
        content = <p className="errmsg">error?.data?message</p>
    }

    if (isSuccess) {

        const { ids } = users

        const tableContent = ids?.length && ids.map(userId => <User key={userId} userId={userId} />)

        content = (
            <div className="sm:ml-80 max-w-full mx-20 my-2 border rounded-2xl border-gray-200 shadow-lg form-container ">
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                <thead className='bg-pink-100'>
                    <tr>
                        <th scope='col' className='px-6 py-4 font-medium text-gray-900'>Username</th>
                        <th scope='col' className='px-6 py-4 font-medium text-gray-900'>Roles</th>
                        <th scope='col' className='px-6 py-4 font-medium text-gray-900'>Edit</th>
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

export default UsersList
