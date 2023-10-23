import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom'
import { signIn } from '../api/users'
import { toast } from 'react-toastify'

export default function SignIn() {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const token = localStorage.getItem('token') || null

    useEffect(() => {
        if(token) {
            navigate('/users')
        }
    }, [token, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const login = await signIn(credentials)

        if(login.status !== 200) return toast.error(login.message)
        if(login.status === 200) {
            toast.success(login.message)
            localStorage.setItem('token', login.data.token)
            navigate("/users")
        }
    }

    const disabled = !credentials.email || !credentials.password

    return (
        <section className="h-[80vh] w-full items-center flex">
            <div className="container m-auto bg-white dark:bg-slate-600 rounded-xl p-5 max-w-2xl">
                <h2 className="text-center text-2xl font-bold duration-200">Iniciar sesión</h2>
                <form className="m-0 p-6 dark:border border-spacing-4 border-neutral-100" onSubmit={handleSubmit} >
                    <label className="text-xl mb-2">Email</label>
                    <input placeholder="email" value={credentials.email} onChange={(e) => setCredentials({...credentials, email: e.target.value})} />
                    <label className="text-xl mb-2 mt-3">Contraseña</label>
                    <input placeholder="contraseña" type='password' value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})} />
                    <button className="send-button mt-3" disabled={disabled}>Ingresar</button>
                    <span className="text-center mt-3 text-lg">o</span>
                    <Link className="text-center cursor-pointer underline text-blue-400" to="/sign-up" >Crea una cuenta</Link>
                </form>
            </div>
        </section>
    )
}