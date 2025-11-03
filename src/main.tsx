import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import App from './App';
import './index.css';
import GamePage from './pages/GamePage';
import MenuPage from './pages/MenuPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App становится корневым элементом
    children: [
      {
        index: true,
        element: <MenuPage />,
      },
      {
        path: 'game',
        element: <GamePage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
