import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Reports from './pages/Reports';
import Sponsor from './pages/Sponsor';
import Login from './pages/Login';
import Polls from './pages/Polls';
import News from './pages/News';
import PhoneVerification from './pages/PhoneVerification';

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
                  path: "/sponsor",
                  element: (
                        <Sponsor />
                  ),
            },
            {
                  path: "/login",
                  element: (
                        <Login />
                  ),
            },
            {
                  path: "/polls",
                  element: (
                        <Polls />
                  ),
            },
            {
                  path: "/news",
                  element: (
                        <News />
                  ),
            },
            {
                  path: "/phone-verification",
                  element: (
                        <PhoneVerification />
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
