import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import getTasks from './controllers/tasks';
import jsonExists from './helpers/JSON-exists';
import TaskForm from './components/taskForm';
import { useState, createContext } from 'react';

export const AuthContext = createContext(null);
function App() {
 
  const data = jsonExists();
  //console.log(data);
  const [params, setParams] = useState(
    {
      showForm: false,
      typeTask: '',
      status: '',
      dueDate: '',
      newTask:true,
      tasks:data? data:[],
      idTask: '',
      taskSelect: {
        name:'',
        notes:'',
        dueDate: '',
        status:'',
      }
    }
  )
  let idTaskDrag;

  function handleAddTask(status){
    //e.preventDefault();
    //console.log(status);
    setParams({...params, status: status, showForm:true, newTask:true});
  }
  
  function handleClickTask(id){
    //console.log(id);

    //let readTask = {};
    let readTask = params.tasks.filter(task => task.id === id );
    setParams({...params, showForm:true, newTask:false, idTask:id, taskSelect: readTask[0]})
  }
  function startDrag(ev){
    ev.dataTransfer.setData("text/plain", ev.target.innerText);
    //console.log(ev.dataTransfer);
    //console.log('START DRAG');
    //this.style.opacity = '0.4';
  }

  var dragged;

  /* events fired on the draggable target */
  document.addEventListener("drag", function( event ) {
    //console.log('DRAG');

  }, false);

  document.addEventListener("dragstart", function( event ) {
      // store a ref. on the dragged elem
      dragged = event.target;
      idTaskDrag = event.target.dataset.id;
      //console.log(idTask);
  }, false);
   
  /* events fired on the drop targets */
   document.addEventListener("dragover", function( event ) {
    // prevent default to allow drop
    event.preventDefault();
    //console.log('DRAGOVER');
    
}, false);

  document.addEventListener("dragenter", function( event ) {
    // highlight potential drop target when the draggable element enters it
    if ( event.target.className === "tasks-container" ) {
        event.target.style.background = "#98C1D9";
    }
    //console.log('DRAG ENTER');

  }, false);

  document.addEventListener("dragleave", function( event ) {
    // reset background of potential drop target when the draggable element leaves it
    if ( event.target.className === "tasks-container" ) {
        event.target.style.background = "";
    }
    
  }, false);
 
  document.addEventListener("drop", function( event ) {
    // prevent default action (open as link for some elements)
    event.preventDefault();
    // move dragged elem to the selected drop target
    if ( event.target.className === "tasks-container" ) {
        event.target.style.background = "";
        //Updating component's status allows me to skip the
        //dragged.parentNode.removeChild( dragged );
        //event.target.appendChild( dragged );
        const type = event.target.dataset.type;
        let tasks = [...params.tasks];
        let newTasks = tasks.map((task)=>{
            if (task.id===idTaskDrag){
                return {...task, status: type};   
            }else{
                return task;
            }
        })
        window.localStorage.setItem('to-doDB',JSON.stringify(newTasks))
        setParams({...params, tasks: newTasks, showForm:false})
    }
  }, false);

  return (
    <AuthContext.Provider value={{params, setParams}}>
      <div className="App">
        <header className="App-header">
        </header>
        <div className="main-panel">
          <div className="column" id="next-up">
            <h3 className="column-type">Next-Up</h3>
            <div className="tasks-container" data-type="Next-Up">
            {params.tasks.map((task)=>{
              if (task.status === 'Next-Up'){
                //console.log('test');
                return <div className="task-element" draggable key={task.id} data-id={task.id} onClick={()=>handleClickTask(task.id)} onDragStart={startDrag}>{task.name}</div>
              }else{
                return null;
              }
            })}
            </div>
            <button className='add-task' onClick={()=>handleAddTask('Next-Up')}>➕ Add task</button>
          </div>
          <div className="column" id="doing">
            <h3 className="column-type">Doing</h3>
            <div className="tasks-container" data-type="Doing">
              {params.tasks.map((task,i)=>{
                if (task.status === 'Doing'){
                  //console.log('test');
                  return <div className="task-element" draggable key={i} data-id={task.id} onClick={()=>handleClickTask(task.id)} onDragStart={startDrag}>{task.name}</div>
                }else{
                  return null;
                }
              })}
            </div>
            <button className='add-task' onClick={()=>handleAddTask('Doing')}>➕ Add task</button>
          </div>
          <div className="column" id="completed">
            <h3 className="column-type">Completed</h3>
            <div className="tasks-container" data-type="Completed">
              {params.tasks.map((task,i)=>{
                  if (task.status === 'Completed'){
                    //console.log('test');
                    return <div className="task-element" draggable key={i} data-id={task.id} onClick={()=>handleClickTask(task.id)} onDragStart={startDrag}>{task.name}</div>
                  }else{
                    return null;
                  }
                })}
            </div>
            <button className='add-task' onClick={()=>handleAddTask('Completed')}>➕ Add task</button>
          </div>
        </div>
        {params.showForm && <TaskForm></TaskForm>}
      </div>
      </AuthContext.Provider>
  );
}

export default App;
