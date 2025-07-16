
import './App.css';
import User from './components/User';
import AddUsers from './components/AddUsers';
import {RouterProvider, createBrowserRouter} from "react-router-dom";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <User/>
    },
    {
      path: "/add",
      element: <AddUsers />
    },
    {
      path: "/update/:id",
      element: <AddUsers />
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
