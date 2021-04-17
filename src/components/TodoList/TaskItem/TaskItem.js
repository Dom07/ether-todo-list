import React from 'react';

function TaskItem (props){
    return (
        <div>
            <input 
                type='checkbox' 
                checked={props.taskStatus}
                onChange={() => props.toggleCheckBox(props.taskId)}
            />
            <span> {props.taskName}</span>
        </div>
    )

}

export default TaskItem;