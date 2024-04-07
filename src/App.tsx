import React from "react";

import './App.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard.tsx';
import ErrorPage from './ErrorPage.jsx';
import List from './List/List.tsx';
import Favorites from './Favorites/Favorites.tsx';
import { useState } from 'react';

export type TFavorites = Record<string, string>;

function App() {
  // Common state to store the favorite images, Redux could be used for something more complicated.
  const [favorites, setFavorites] = useState<TFavorites>({});

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
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
