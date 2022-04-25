import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import getTasks from './controllers/tasks';
import jsonExists from './helpers/JSON-exists';
import TaskForm from './components/taskForm';

function App() {
  //const data = getTasks();
  //console.log(data);
  const data = jsonExists();
  //console.log(data);
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className="main-panel">
        <div className="column" id="next-up">
          <h3 className="column-type">Next-Up</h3>
          <div className="tasks-container">

          </div>
          <button className='add-task'>➕ Add task</button>
        </div>
        <div className="column" id="doing">
          <h3 className="column-type">Doing</h3>
          <div className="tasks-container">
            
          </div>
          <button className='add-task'>➕ Add task</button>
        </div>
        <div className="column" id="completed">
          <h3 className="column-type">Completed</h3>
          <div className="tasks-container">

          </div>
          <button className='add-task'>➕ Add task</button>
        </div>
      </div>
      <TaskForm></TaskForm>
    </div>
  );
}

export default App;
