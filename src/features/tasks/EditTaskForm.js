import { useState, useEffect } from "react"
import { useUpdateTaskMutation, useDeleteTaskMutation } from "./tasksApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

const EditTaskForm = ({ task, users }) => {
    const { isAdmin } = useAuth();

    const [updateTask, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateTaskMutation()

    const [deleteTask, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteTaskMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState(task.title)
    const [text, setText] = useState(task.text)
    const [completed, setCompleted] = useState(task.completed)
    const [userId, setUserId] = useState(task.user)

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dash')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onCompletedChanged = e => setCompleted(prev => !prev)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [title, text, userId].every(Boolean) && !isLoading

    const onSaveTaskClicked = async (e) => {
        if (canSave) {
            await updateTask({ id: task.id, user: userId, title, text, completed })
        }
    }

    const onDeleteTaskClicked = async () => {
        await deleteTask({ id: task.id })
    }

    const created = new Date(task.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(task.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}

            > {user.username}</option >
        )
    })

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validTextClass = !text ? "form__input--incomplete" : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    let deleteButton = null
    if (isAdmin) {
        deleteButton = (
            <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                title="Delete"
                onClick={onDeleteTaskClicked}
            >
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
        )
    }

    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <div className="sm:ml-80 max-w-md mx-20 my-0 p-8 bg-gray-800 rounded-md shadow-md form-container">
                <h2 className="text-2xl font-semibold text-white mb-6 w-80">Edit Task!</h2>
                <form onSubmit={onSaveTaskClicked}>
                <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="task-title">
                    Title</label>
                    <input
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
                        id="task-title"
                        name="title"
                        type="text"
                        autoComplete="off"
                        value={title}
                        onChange={onTitleChanged}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="task-text" className="block text-gray-300 text-sm font-bold mb-2">Text</label>
                    <textarea
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
                        id="task-text"
                        name="text"
                        value={text}
                        onChange={onTextChanged}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="task-completed">
                            Completed
                            <input
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
                                id="task-completed"
                                name="completed"
                                type="checkbox"
                                checked={completed}
                                onChange={onCompletedChanged}
                            />
                    </label>
                </div>

                <div className="mb-6">
                    <label htmlFor="task-username" className="block text-gray-300 text-sm font-bold mb-2">Assigned to</label>
                        <select
                            id="task-username"
                            name="username"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
                            value={userId}
                            onChange={onUserIdChanged}
                        >
                            {options}
                    </select>
                </div>

                <div className="mb-6">
                    <p className="block text-gray-300 text-sm font-bold mb-2">Created <br />{created}</p>
                    <p className="block text-gray-300 text-sm font-bold mb-2">Updated <br />{updated}</p>
                </div>

                <button type="submit" title="Save" disabled={!canSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
                        Save
                    </button>

                </form>

                    <div className='mb-6'>
                        {deleteButton}
                    </div>
            </div>

        </>
    )

    return content
}

export default EditTaskForm