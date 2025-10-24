import './App.css';
import Board from './components/Board/Board';

function App() {
  return (
    <>
      <Board rows={6} cols={7}></Board>
    </>
  );
}

export default App;
