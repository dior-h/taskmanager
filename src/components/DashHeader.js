import { useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFileCirclePlus,
    faFilePen,
    faUserGear,
    faUserPlus,
    faRightFromBracket
} from "@fortawesome/free-solid-svg-icons"
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import useAuth from '../hooks/useAuth'

const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/tasks(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const DashHeader = () => {

    const { username, isAdmin } = useAuth()

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    const onNewTaskClicked = () => navigate('/dash/tasks/new')
    const onNewUserClicked = () => navigate('/dash/users/new')
    const onTasksClicked = () => navigate('/dash/tasks')
    const onUsersClicked = () => navigate('/dash/users')

    let dashClass = null
    if (!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
        dashClass = "dash-header__container--small"
    }

    let newTaskButton = null
    if (NOTES_REGEX.test(pathname)) {
        newTaskButton = (
            <button
                className="icon-button"
                title="New Task"
                onClick={onNewTaskClicked}
            >
                <FontAwesomeIcon icon={faFileCirclePlus} />
            </button>
        )
    }

    let newUserButton = null
    if (USERS_REGEX.test(pathname)) {
        newUserButton = (
            <button
                className="icon-button"
                title="New User"
                onClick={onNewUserClicked}
            >
                <FontAwesomeIcon icon={faUserPlus} />
            </button>
        )
    }

        let userButton = null
    if (isAdmin) {
        if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
            userButton = (
                <button
                    className="icon-button"
                    title="Users"
                    onClick={onUsersClicked}
                >
                    <FontAwesomeIcon icon={faUserGear} />
                </button>
            )
        }
    }

    let tasksButton = null
    if (!NOTES_REGEX.test(pathname) && pathname.includes('/dash')) {
        tasksButton = (
            <button
                className="icon-button"
                title="Tasks"
                onClick={onTasksClicked}
            >
                <FontAwesomeIcon icon={faFilePen} />
            </button>
        )
    }

    const logoutButton = (
        <button
            title="Logout"
            onClick={sendLogout}
        >
            Logout
        </button>
    )

    const errClass = isError ? "errmsg" : "offscreen"

    let buttonContent
    if (isLoading) {
        buttonContent = <p>Logging Out...</p>
    } else {
        buttonContent = (
            <>
                {logoutButton}
            </>
        )
    }

    const content = (
        <>
        <p className={errClass}>{error?.data?.message}</p>

        <div className="min-h-screen inline-flex flex-row bg-gray-100 mx-0 fixed ">
            <div className="flex flex-col w-56 bg-white rounded-r-3xl overflow-hidden">
                <div className="flex items-center justify-center h-20 shadow-md">
                <Link to="/dash">
                        <h1 className="text-3xl text-indigo-500">{username}</h1>
                </Link>
                </div>

                <ul className="flex flex-col py-4">
                <li>
                    <Link to={'/dash/tasks/new'} className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-plus"></i></span>
                    <span className="text-sm font-medium">New Task</span>
                    </Link>
                </li>

                <li>
                    <Link to={'/dash/tasks'} className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-show"></i></span>
                    <span className="text-sm font-medium">View Tasks</span>
                    </Link>
                </li>
                <li>
                    {(isAdmin) && <Link to={'/dash/users/new'} className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-plus"></i></span>
                    <span className="text-sm font-medium">Add Users</span>
                    </Link>}
                </li>
                <li>
                    {(isAdmin) && <Link to={'/dash/users'} className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-show"></i></span>
                    <span className="text-sm font-medium">User Manager</span>
                    </Link>}
                </li>
                <li>
                    <Link className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-log-out"></i></span>
                    <span className="text-sm font-medium">{buttonContent}</span></Link>
                </li>
                </ul>

            </div>
        </div>

        </>
    )

    return content
}
export default DashHeader