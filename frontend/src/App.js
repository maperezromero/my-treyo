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
    }
  )
  
  function handleAddTask(status){
    //e.preventDefault();
    //console.log(status);
    setParams({...params, status: status, showForm:true});
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
                return <div className="task-element" key={i}>{task.taskName}</div>
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
                  return <div className="task-element" key={i}>{task.taskName}</div>
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
                    return <div className="task-element" key={i}>{task.taskName}</div>
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
