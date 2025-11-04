// App.tsx
import { Outlet } from 'react-router';
import './App.css';
import rootStore, { StoreContext } from './stores/root.store';

function App() {
  return (
    <StoreContext.Provider value={rootStore}>
      <div className="App">
        <main>
          <Outlet />
        </main>
      </div>
    </StoreContext.Provider>
  );
}

export default App;
