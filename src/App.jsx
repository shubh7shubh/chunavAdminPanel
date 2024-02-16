import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Reports from './pages/Reports';
import Login from './pages/Login';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Dashboard></Dashboard>
      ),
    },
    {
      path: "/reports",
      element: (
        <Reports />
      ),
    },
    {
      path: "/login",
      element: (
        <Login />
      ),
    },
  ]);

  return (
    <>
      <div className='App'>
        <RouterProvider router={router} />
        <ToastContainer />
      </div>
    </>
  )
}

export default App
