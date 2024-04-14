import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewTaskMutation } from "./tasksApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"

const NewTaskForm = ({ users }) => {

    const [addNewTask, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewTaskMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [userId, setUserId] = useState(users[0].id)

    useEffect(() => {
        if (isSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dash/tasks')
        }
    }, [isSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [title, text, userId].every(Boolean) && !isLoading

    const onSaveTaskClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewTask({ user: userId, title, text })
        }
    }

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}
            > {user.username}</option >
        )
    })

    const errClass = isError ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validTextClass = !text ? "form__input--incomplete" : ''

    const content = (
        <>
            <p classNameName={errClass}>{error?.data?.message}</p>

              <div className="sm:ml-80 max-w-max mx-20 my-0 p-8 bg-gray-900 rounded-md shadow-md form-container">
                <h2 className="text-2xl font-semibold text-white mb-6 w-80">New Task!</h2>
                <form onSubmit={onSaveTaskClicked}>
                <div className="mb-8">
                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="title">
                        Title</label>
                    <input
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
                        id="title"
                        name="title"
                        type="text"
                        autoComplete="off"
                        value={title}
                        onChange={onTitleChanged}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="text" className="block text-gray-300 text-sm font-bold mb-2">Text</label>
                    <textarea
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
                        id="text"
                        name="text"
                        value={text}
                        onChange={onTextChanged}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="username" className="block text-gray-300 text-sm font-bold mb-2">Assigned to:</label>
                    <select
                        id="username"
                        name="username"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
                        value={userId}
                        onChange={onUserIdChanged}
                    >
                        {options}
                </select>

                </div>
                <button type="submit" title="Save" disabled={!canSave}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
                    Save
                </button>
                </form>
            </div>
        </>
    )

    return content
}

export default NewTaskForm