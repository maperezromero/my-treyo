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
      newTask:true,
      tasks:data? data:[],
      idTask: '',
      taskSelect: {
        name:'',
        notes:'',
        status:'',
      }
    }
  )
  
  function handleAddTask(status){
    //e.preventDefault();
    //console.log(status);
    setParams({...params, status: status, showForm:true, newTask:true});
  }
  
  function handleClickTask(id){
    //console.log(id);

    let readTask = {};
    readTask = params.tasks.filter(task => task.id === id );
    
        //console.log(readTask[0]);
        //setParams({...params, taskSelect: readTask[0]});
        //console.log(readTask);
        //console.log(readTask[0].name);
    
    setParams({...params, showForm:true, newTask:false, idTask:id, taskSelect: readTask[0]})
  }
  function startDrag(e){
    console.log(e.dataTransfer.setData("drag-item", props.dataItem));
  }
  return (
    <AuthContext.Provider value={{params, setParams}}>
      <div className="App">
        <header className="App-header">
        </header>
        <div className="main-panel">
          <div className="column" id="next-up">
            <h3 className="column-type">Next-Up</h3>
            <div className="tasks-container">
            {params.tasks.map((task,i)=>{
              if (task.status === 'Next-Up'){
                //console.log('test');
                return <div className="task-element" draggable key={i} onClick={()=>handleClickTask(task.id)} onDragStart={startDrag}>{task.name}</div>
              }else{
                return null;
              }
            })}
            </div>
            <button className='add-task' onClick={()=>handleAddTask('Next-Up')}>➕ Add task</button>
          </div>
          <div className="column" id="doing">
            <h3 className="column-type">Doing</h3>
            <div className="tasks-container">
              {params.tasks.map((task,i)=>{
                if (task.status === 'Doing'){
                  //console.log('test');
                  return <div className="task-element" draggable key={i} onClick={()=>handleClickTask(task.id)} onDragStart={startDrag}>{task.name}</div>
                }else{
                  return null;
                }
              })}
            </div>
            <button className='add-task' onClick={()=>handleAddTask('Doing')}>➕ Add task</button>
          </div>
          <div className="column" id="completed">
            <h3 className="column-type">Completed</h3>
            <div className="tasks-container">
              {params.tasks.map((task,i)=>{
                  if (task.status === 'Completed'){
                    //console.log('test');
                    return <div className="task-element" draggable key={i} onClick={()=>handleClickTask(task.id)}>{task.name}</div>
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
