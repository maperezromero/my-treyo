import './App.css';
import getTasks from './controllers/tasks';

function App() {
  const data = getTasks();
  console.log(data);
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className="main-panel" id='panel'>
        HOLA
      </div>
    </div>
  );
}

export default App;
