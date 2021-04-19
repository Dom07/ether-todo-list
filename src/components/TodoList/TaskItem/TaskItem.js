import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

function TaskItem(props) {
    return (
        <Row className="justify-content-left">
            <Col xs="3"/>
            <Col xs="1">
                <input
                    type='checkbox'
                    checked={props.taskStatus}
                    onChange={() => props.toggleCheckBox(props.taskId)}
                />
            </Col>
            <Col xs="1.5" className="justify-content-left">
                {props.taskName}
            </Col>
            
        </Row>
    )

}

export default TaskItem;