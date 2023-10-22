import { useState } from 'react'
import './App.css';
import {  Users } from './components/users'
import { CreateForm } from './components/createForm'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [fetch, setFetch] = useState(true)
  return (
    <>
      <CreateForm setFetch={setFetch} />
      <Users setFetch={setFetch} fetch={fetch} />
      <ToastContainer />
    </>
  );
}

export default App;
