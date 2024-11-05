

import { Authenticator } from '@aws-amplify/ui-react';
import { createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom';
import "./App.css";
import Home from './pages/Home';
import Layout from './pages/Layout';



const AdminRoutes =() => (
  <Authenticator>
    <Routes>
      <Route path="/create-organization"></Route>
    </Routes>
  </Authenticator>
)


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/admin/*",
        element: <AdminRoutes />,
      }
    ]

  }
])

function App() {
  return <RouterProvider router={router}/>
}

export default App;
