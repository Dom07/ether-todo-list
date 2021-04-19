import React from 'react';
import {Form, Col, Button} from 'react-bootstrap';

const TaskForm = (props) =>{
    return(
        <Form onSubmit={(e) => props.submitAction(e)}>
            <Form.Row className="align-items-center justify-content-center">
              <Col xs="4">
                <Form.Control placeholder="Enter Task Name" value={props.taskName} onChange={(e) => props.taskNameChange(e)}>
                </Form.Control>
              </Col>
              <Col xs="1">
                <Button variant="primary" type="submit">Add</Button>
              </Col>
            </Form.Row>
          </Form>
    )
}

export default TaskForm;