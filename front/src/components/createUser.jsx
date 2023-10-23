import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { signUp } from '../api/users'
import { emailValidator, minLength, formatRut } from '../utils/validator'
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
    const [error, setError] = useState({
        email: '',
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

    useEffect(() => {
        const isEmailValid = emailValidator(formData.email)
        const isPasswordValid = minLength(formData.password, 7)
        const isRepeatPasswordValid = minLength(formData.repeatPassword, 7)
        setError({ 
            email: !isEmailValid ?  'El correo no es válido.' : null,
            password: !isPasswordValid ?  'La clave debe tener un largo mínimo de 8.' : null,
            repeatPassword: !isRepeatPasswordValid ?  'La clave debe tener un largo mínimo de 8.' : null,
        })
    }, [formData])

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

    const dataValues = Object.values(formData)
    
    const disabled = dataValues.some((data) => data === '' || null) || error.email || error.password || error.repeatPassword

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
                    {error?.email && <span className="text-red-400">{error.email}</span>}
                    <label className="text-xl mb-2">Rut</label>
                    <input placeholder="Rut" value={formatRut(formData.rut)} maxLength={12} onChange={(e) => setFormData({...formData, rut: e.target.value.replace(/[^0-9Kk]/g, "")})} />
                    <label className="text-xl mb-2 mt-3">Contraseña</label>
                    <input placeholder="contraseña" type='password' value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
                    {error?.password && <span className="text-red-400">{error.password}</span>}
                    <label className="text-xl mb-2 mt-3">Repetir Contraseña</label>
                    <input placeholder="Repita contraseña" type='password' value={formData.repeatPassword} onChange={(e) => setFormData({...formData, repeatPassword: e.target.value})} />
                    {error?.repeatPassword && <span className="text-red-400">{error.repeatPassword}</span>}
                    <button className="send-button mt-3" disabled={disabled}>Crear</button>
                    <span className="text-center mt-3">Ya tienes una cuenta?. <Link className="text-blue-400 underline" to="/">Ingresa acá</Link></span>
                </form>
            </div>
        </section>
    )
}