import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom';
import { useGetUsersQuery } from './usersApiSlice';
import { memo } from 'react';

const User = ({ userId }) => {
    
    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[userId]
        }),
    })

    const navigate = useNavigate();

    if (user) {

        const handleEdit = () => navigate(`/dash/users/${userId}`);
        const userRolesString = user.roles.toString().replaceAll(',', ', ');
        const cellStatus = user.active ? '' : 'table__cell--inactive';

        return (
    
        <>

            <tr class="hover:bg-gray-50">
                <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
                <div class="text-sm">
                    <div class="font-medium text-gray-700">{user.username}</div>
                </div>
                </th>
                <td class="px-6 py-4">
                    <div class="font-medium text-gray-700">{userRolesString}</div>
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
        return null
    }

}

const memoizedUser = memo(User)
export default memoizedUser
