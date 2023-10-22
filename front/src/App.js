import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./components/signIn";
import { Users } from "./components/users";
import { CreateForm } from "./components/createForm";
import { CreateUser } from "./components/createUser";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [fetch, setFetch] = useState(true);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <SignIn />
          <ToastContainer />
        </>
      ),
      errorElement: <div>Ups, something went wrong</div>,
    },
    {
      path: "/sign-up",
      element: (
        <>
          <CreateUser />
          <ToastContainer />
        </>
      ),
      errorElement: <div>Ups, something went wrong</div>,
    },
    {
      path: "/users",
      element: (
        <div className="grid">
          <CreateForm setFetch={setFetch} />
          <Users setFetch={setFetch} fetch={fetch} />
          <ToastContainer />
        </div>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
