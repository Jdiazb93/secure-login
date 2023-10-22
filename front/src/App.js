import { useState } from 'react'
import './App.css';
import {  Users } from './components/users'
import { CreateForm } from './components/createForm'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [fetch, setFetch] = useState(true)
  return (
    <div className='grid sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(45%,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(45%,1fr))] gap-5'>
      <CreateForm setFetch={setFetch} />
      <Users setFetch={setFetch} fetch={fetch} />
      <ToastContainer />
    </div>
  );
}

export default App;
