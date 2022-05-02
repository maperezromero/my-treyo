import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import CloseButton from 'react-bootstrap/CloseButton'
import validator from 'validator'
import {useContext, useEffect} from 'react';
import {AuthContext} from '../App'

const uuid = require("uuid");

function TaskForm( {id = null} ){

    const { params, setParams } = useContext(AuthContext);
    
    
    useEffect(()=>{
        
    })

    function handleAddTask(){
        const taskName = document.getElementById('task-name').value;
        const notes = document.getElementById('notes').value;
        const dueDate = document.getElementById('dueDate').value;
        const status = document.getElementById('status').value;


        if (validator.isEmpty(taskName)) {
            console.log('Should add a task name');
            return;
        }
        const task = {
            id: uuid.v4(),
            name: taskName,
            notes: notes,
            dueDate: dueDate,
            status: status,
        }
        //console.log(params.tasks);
        let tasks = [...params.tasks];
        tasks.push(task)
        window.localStorage.setItem('to-doDB',JSON.stringify(tasks))
        setParams({...params, tasks:tasks, showForm:false})
    }
    function handleChangeName(e){
        //console.log(e.target.value);
        //console.log(params);
        setParams({...params, taskSelect: {...params.taskSelect, name: e.target.value}})
        //setParams({...params, })

    }
    function handleChangeNotes(e){
        setParams({...params, taskSelect: {...params.taskSelect, notes: e.target.value}})
    }

    function handleChangeDueDate(){

    }

    function handleSaveTask(){
        
        const idTask = params.taskSelect.id;
        let tasks = [...params.tasks];
        let newTasks = tasks.map((task)=>{
            if (task.id===idTask){
                const taskName = document.getElementById('task-name').value;
                const notes = document.getElementById('notes').value;
                const status = document.getElementById('status').value;
                if (validator.isEmpty(taskName)) {
                    console.log('Should add a task name');
                    
                }
                return {...task, name:taskName, notes: notes, status: status};
                
            }else{
                return task;
            }
        })
        window.localStorage.setItem('to-doDB',JSON.stringify(newTasks))
        setParams({...params, tasks: newTasks, showForm:false})
    }

    function handleDeleteTask(){
        const idTask = params.taskSelect.id;
        let tasks = [...params.tasks];
        let newTasks = tasks.filter(task=>task.id!==idTask)
        window.localStorage.setItem('to-doDB',JSON.stringify(newTasks))
        setParams({...params, tasks: newTasks, showForm:false})
    }
    function handleCloseForm(){
        setParams({...params, showForm:false})
    }
    function handleChangeStatus(e){
        setParams({...params, status:e.target.value})
    }
    
    if (params.newTask){
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
                    <input className="task-due input" id="dueDate" type="date" placeholder=''></input>
                </div>
                <div className="container-field">
                    <label>Status</label>    
                    <Form.Select aria-label="Default select example" value={params.status} onChange={handleChangeStatus} id="status">
                        <option value="Next-Up">Next-Up</option>
                        <option value="Doing">Doing</option>
                        <option value="Completed">Completed</option>
    
                    </Form.Select>
                </div>
                <Button variant="primary" onClick={handleAddTask}>Add Task</Button>
            </div>
        )
    }else{
        return(
            <div className="task-form">
                <CloseButton className='close-form' onClick={handleCloseForm}/>
                <div className="container-field">
                    <label>Task Name</label>    
                    <input className="task-name input" autoFocus id='task-name' value={params.taskSelect.name} onChange={handleChangeName}></input>
                </div>
                <div className="container-field">
                    <label>Notes</label>    
                    <textarea className="task-notes input" placeholder="Add a more detailed description" id="notes" value={params.taskSelect.notes} onChange={handleChangeNotes}></textarea>
    
                </div>
                <div className="container-field">
                    <label>Due Date</label>    
                    <input className="task-due input" id="dueDate" type="date" value={params.taskSelect.dueDate} onChange={handleChangeDueDate}></input>
    
                </div>
                <div className="container-field">
                    <label>Status</label>    
                    <Form.Select aria-label="Default select example" value={params.taskSelect.status} onChange={handleChangeStatus} id="status">
                        <option value="Next-Up">Next-Up</option>
                        <option value="Doing">Doing</option>
                        <option value="Completed">Completed</option>
    
                    </Form.Select>
                </div>
                <div className='button-container'>
                    <Button variant="primary" onClick={handleSaveTask}>Save changes</Button>
                    <Button variant="danger" onClick={handleDeleteTask}>Delete Task</Button>
                </div>
            </div>
        )
    };
}

export default TaskForm;