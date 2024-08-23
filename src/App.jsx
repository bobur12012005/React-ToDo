import { useEffect, useReducer, useState } from 'react'
import './App.css'
import Task from './components/Task'
import axios from 'axios'

const initialState = { title: "", description: "", select: "", date: "" }

function reducer(state, action) {
    switch (action.type) {
        case "SET_TITLE":
            return { ...state, title: action.payload }
        case "SET_DESCRIPTION":
            return { ...state, description: action.payload }
        case "SET_SELECT":
            return { ...state, select: action.payload }
        case "SET_DATE":
            return { ...state, date: action.payload }
        default:
            return state
    }
}

function App() {
    const [isOpen, setIsOpen] = useState(false)
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const [isOpenSearch, setIsOpenSearch] = useState(false)
    const toggleSearch = () => {
        setIsOpenSearch(!isOpenSearch)
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    const [todos, setTodos] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:8080/todos`)
            .then(res => {
                setTodos(res.data)
            })
    }, [])

    function onSubmit(e) {
        e.preventDefault()

        axios.post(`http://localhost:8080/todos`, state)
            .then(res => {
                setTodos([...todos, res.data])
                dispatch({ type: "SET_TITLE", payload: "" })
                dispatch({ type: "SET_DESCRIPTION", payload: "" })
                dispatch({ type: "SET_SELECT", payload: "" })
                dispatch({ type: "SET_DATE", payload: "" })
                setIsOpen(false)
            })
    }

    return (
        <>
            <div className="total-screen">
                <main>
                    <div className="top">
                        <div className="right">
                            <h1>To-Do by Bobur</h1>
                        </div>
                        <div className="left">
                            <input className={`search-input ${isOpenSearch ? 'active-search-input' : ''}`} type="text" placeholder='Search' />
                            <button onClick={toggleSearch}>
                                <img src="/icons/search.svg" />
                            </button>
                        </div>
                    </div>
                    <div className="todo-container">
                        {todos.map((todo) => (
                            <Task key={todo.id} item={todo} />
                        ))}
                    </div>
                </main>
                <div className={`menu ${isOpen ? 'open-menu' : ''}`}>
                    <div className="content">
                        <form onSubmit={onSubmit}>
                            <div className='lbl-place'>
                                <input
                                    name='title'
                                    id='title'
                                    placeholder=' '
                                    className='lbl-input'
                                    type="text"
                                    autoComplete='off'
                                    onChange={({ target }) => dispatch({ payload: target.value, type: "SET_TITLE" })}
                                    value={state.title}
                                />
                                <label htmlFor="title" className='lbl-label'>Title</label>
                            </div>
                            <div className='lbl-place'>
                                <textarea
                                    name='description'
                                    id='description'
                                    placeholder=' '
                                    className='lbl-input'
                                    type="text"
                                    autoComplete='off'
                                    onChange={({ target }) => dispatch({ payload: target.value, type: "SET_DESCRIPTION" })}
                                    value={state.description}
                                />
                                <label htmlFor="description" className='lbl-label'>Description</label>
                            </div>
                            <div className='lbl-place'>
                                <select
                                    name="select"
                                    id="select"
                                    placeholder=' '
                                    className='lbl-input'
                                    onChange={({ target }) => dispatch({ payload: target.value, type: "SET_SELECT" })}
                                    value={state.select}
                                >
                                    <option value="not-choosen">Not-Choosen</option>
                                    <option value="work">Work</option>
                                    <option value="study">Study</option>
                                    <option value="personal">Personal</option>
                                    <option value="other">Other</option>
                                </select>
                                <label htmlFor="select" className='lbl-label'>Category</label>
                            </div>
                            <div className="lbl-place input-date">
                                <input
                                    name='date'
                                    id='date'
                                    placeholder=' '
                                    className='lbl-input'
                                    type="date"
                                    min={new Date().toISOString().split('T')[0]} autoComplete='off'
                                    onChange={({ target }) => dispatch({ payload: target.value, type: "SET_DATE" })}
                                    value={state.date}
                                />
                                <label htmlFor="date" className='lbl-label'>Date</label>
                                <img src="/icons/calendar.svg" />
                            </div>
                            <button type="submit">Create</button>
                        </form>

                        <button onClick={toggleMenu} className='open-menu-btn'>
                            <span>+</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App