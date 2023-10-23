import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { signUp } from '../api/users'
import { toast } from 'react-toastify'

export const CreateUser = () => {
    const [formData, setFormData] = useState({
        name: '',
        surName: '',
        email: '',
        rut: '',
        password: '',
        repeatPassword: ''
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
        const newSignUp = await signUp(formData)
        if(newSignUp.status !== 200) toast.error(newSignUp.message)
        if(newSignUp.status === 200) {
            localStorage.setItem('token', newSignUp.data.token.token)
            navigate('/users')
            return toast.success(newSignUp.message)
        }
    }
    
    const disabled = !formData.email || !formData.name || !formData.surName || !formData.password || !formData.repeatPassword || !formData.rut

    return (
        <section className="h-[90vh] w-full items-center flex">
            <div className="container m-auto bg-white dark:bg-slate-600 rounded-xl p-5 max-w-2xl">
                <h2 className="text-center text-2xl font-bold duration-200">Registrate</h2>
                <form className="m-0 p-6 dark:border border-spacing-4 border-neutral-100" onSubmit={handleSubmit} >
                    <label className="text-xl mb-2">Nombres</label>
                    <input placeholder="Nombres" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    <label className="text-xl mb-2">Apellidos</label>
                    <input placeholder="Apellidos" value={formData.surName} onChange={(e) => setFormData({...formData, surName: e.target.value})} />
                    <label className="text-xl mb-2">Correo</label>
                    <input placeholder="Correo" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    <label className="text-xl mb-2">Rut</label>
                    <input placeholder="Rut" value={formData.rut} maxLength={9} onChange={(e) => setFormData({...formData, rut: e.target.value})} />
                    <label className="text-xl mb-2 mt-3">Contraseña</label>
                    <input placeholder="contraseña" type='password' value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
                    <label className="text-xl mb-2 mt-3">Repetir Contraseña</label>
                    <input placeholder="Repita contraseña" type='password' value={formData.repeatPassword} onChange={(e) => setFormData({...formData, repeatPassword: e.target.value})} />
                    <button className="send-button mt-3" disabled={disabled}>Crear</button>
                    <span className="text-center mt-3">Ya tienes una cuenta?. <Link className="text-blue-400 underline" to="/">Ingresa acá</Link></span>
                </form>
            </div>
        </section>
    )
}