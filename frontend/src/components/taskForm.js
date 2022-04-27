import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import CloseButton from 'react-bootstrap/CloseButton'
import validator from 'validator'
const uuidv4 = require("uuid/v4")
import {useContext} from 'react';
import {AuthContext} from '../App'
function TaskForm( {id = null} ){

    const {params,setParams} = useContext(AuthContext);

    function handleAddTask(){
        const taskName = document.getElementById('task-name').value;
        const notes = document.getElementById('notes').value;
        //const taskName = document.getElementById('task-name').value;
        const status = document.getElementById('status').value;

        if (validator.isEmpty(taskName)) {
            console.log('Should add a task name');
            return;
        }
        const task = {
            taskid: uuidv4(),
            taskName: taskName,
            notes: notes,
            status: status,
        }
        let tasks = [...params.tasks];
        tasks.push(task)
        window.localStorage.setItem('to-doDB',JSON.stringify(tasks))
        setParams({...params, tasks:tasks})
    }

    function handleDeleteTask(){

    }
    function handleCloseForm(){
        setParams({...params, showForm:false})
    }
    function handleChangeStatus(e){
        //console.log(e.target.value);
        setParams({...params, status:e.target.value})
    }
    //console.log(status);
    return(
        <div className="task-form">
            <CloseButton className='close-form' onClick={handleCloseForm}/>
            <div className="container-field">
                <label>Task Name</label>    
                <input className="task-name input" autoFocus id='task-name'></input>
            </div>
            <div className="container-field">
                <label>Notes</label>    
                <textarea className="task-notes input" placeholder="Add a more detailed description" id="notes"></textarea>

            </div>
            <div className="container-field">
                <label>Due Date</label>    
                <input className="task-due input"></input>

            </div>
            <div className="container-field">
                <label>Status</label>    
                <Form.Select aria-label="Default select example" value={params.status} onChange={handleChangeStatus} id="status">
                    <option value="Next-Up">Next-Up</option>
                    <option value="Doing">Doing</option>
                    <option value="Completed">Completed</option>

                </Form.Select>
            </div>
            {params.newTask && <Button variant="primary" onClick={handleAddTask}>Add Task</Button>}
            {!params.newTask && <Button variant="danger" onClick={handleDeleteTask}>Delete Task</Button>}
        </div>
    );
}

export default TaskForm;