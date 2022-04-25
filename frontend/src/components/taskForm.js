import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import CloseButton from 'react-bootstrap/CloseButton'
function TaskForm( id = null, status= "Next-Up" ){
    function handleAddTask(){

    }
    return(
        <div className="task-form">
            <CloseButton className='close-form'/>
            <div className="container-field">
                <label>Task Name</label>    
                <input className="task-name input"></input>
            </div>
            <div className="container-field">
                <label>Notes</label>    
                <textarea className="task-notes input" placeholder="Add a more detailer description"></textarea>

            </div>
            <div className="container-field">
                <label>Due Date</label>    
                <input className="task-due input"></input>

            </div>
            <div className="container-field">
                <label>Status</label>    
                <Form.Select aria-label="Default select example">
                    <option>Status</option>
                    <option value="1">Next-Up</option>
                    <option value="2">Doing</option>
                    <option value="3">Completed</option>
                </Form.Select>
            </div>
            <Button variant="primary">Add Task</Button>

        </div>
    );
}

export default TaskForm;