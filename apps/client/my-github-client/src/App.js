import logo from './logo.svg';
import './App.css';
import TableView from './tableView';
import UpdateButton from './updateDB';

function App() {
  return (
    <div className="App">
      <header className="App-header">
	  <UpdateButton/>

		<br></br>
		  <TableView />
      </header>
    </div>
  );
}

export default App;
