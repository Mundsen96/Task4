import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './views/Login';
import MainPage from './views/MainPage';
import Register from './views/Register';
import Root from './views/Root';
import ErrorPage from './views/ErrorPage';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/mainpage",
    element: <MainPage />,
  },
  {
    path: "/register",
    element: <Register />
  },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
