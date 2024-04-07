import './App.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import ErrorPage from './ErrorPage';
import List from './List/List';
import Favorites from './Favorites/Favorites';
import { useState } from 'react';

function App() {
  // Common state to store the favorite images, Redux could be used for something more complicated.
  const [favorites, setFavorites] = useState({});

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard favorites={favorites} />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Favorites favorites={favorites} />
        },
        {
          path: "list",
          element: <List favorites={favorites} setFavorites={setFavorites} />
        }
      ]
    },
  ])

  return (
    <RouterProvider router={router} />
  );
}

export default App;
