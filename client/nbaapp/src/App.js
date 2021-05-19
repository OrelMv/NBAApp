import './App.css';

//components
import TeamsDisplay from './components/TeamsDisplay'
import ChangeSectionHost from './components/ManipulateData/ChangeDataHost'

function App() {
  return (
    <div className="main">
      <h1>NBA Teams Application</h1>
      <TeamsDisplay />
      <ChangeSectionHost />
    </div>
  );
}

export default App;
