import React from 'react'
import './components-css/Task.css'

function Task({item}) {
    return (
        <div className="task">
            <div className="left-side-task">
                <h2 className="title">{item.title}</h2>
                <p className='description'>{item.description}</p>
                <div className="category-n-date">
                    <span className='category'>{item.select}</span>
                    <span className="date">{item.date}</span>
                </div>
            </div>
            <div className="task-line"></div>
            <div className="right-side-task">
                <input type="checkbox" />
                <button><img src="/icons/edit.svg" /></button>
                <button><img src="/icons/bin.svg" /></button>
            </div>
        </div>
    )
}

export default Task