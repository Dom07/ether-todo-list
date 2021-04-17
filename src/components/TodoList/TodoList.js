import React from 'react';
import TaskItem from './TaskItem/TaskItem';
import './TodoList.css';

function TodoList(props) {

    let renderList = null

    if (props.todos.length === 0) {
        renderList = (<div>Loading...</div>)
    } else {
        renderList = props.todos.map(item => 
            
            <TaskItem
                key = {item.id}
                taskId = {item.id}
                taskName = {item.content}
                taskStatus = {item.completed}
                toggleCheckBox = {props.toggle}
            />
       
        )
    }

    return (
        <ul className="TodoList">
            {renderList}
        </ul>
    )
}

export default TodoList;