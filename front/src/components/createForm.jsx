import React, { useState } from "react";
import { createUser } from '../api/users'
import { toast } from 'react-toastify'

export const CreateForm = ({ setFetch }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        secondName: '',
        lastName: '',
        email: '',
        password: '',
        repeatPassword: '',
        rutOrPassport: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newUser = await createUser(formData);
        if(newUser.status !== 200) toast.error('Algo salió mal, inténtalo nuevamente!.')
        if(newUser.status === 200) {
            setFormData({
                firstName: '',
                secondName: '',
                lastName: '',
                email: '',
                password: '',
                repeatPassword: '',
                rutOrPassport: ''
            })
            toast.success('Usuario creado con éxito!.')
            setFetch(true)
        }
    }

    const disabled = !formData.email || !formData.firstName || !formData.lastName || !formData.password || !formData.repeatPassword || !formData.rutOrPassport || formData.password !== formData.repeatPassword

    return (
        <form onSubmit={handleSubmit}>
            <label>Correo</label>
            <input placeholder="Ingrese correo" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            <section className="form-section">
                <div>
                    <label>Contraseña</label>
                    <input placeholder="Ingrese contraseña" value={formData.password} type="password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                </div>
                <div>
                    <label>Repetir Contraseña</label>
                    <input placeholder="Repetir contraseña" value={formData.repeatPassword} type="password" onChange={(e) => setFormData({ ...formData, repeatPassword: e.target.value })} />
                </div>
            </section>
            <section className="form-section">
                <div>
                    <label>Nombre</label>
                    <input placeholder="Ingrese nombre" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                </div>
                <div>
                    <label>Segundo Nombre</label>
                    <input placeholder="Ingrese segundo nombre" value={formData.secondName} onChange={(e) => setFormData({ ...formData, secondName: e.target.value })} />
                </div>
            </section>
            <section className="form-section">
                <div>
                    <label>Apellidos</label>
                    <input placeholder="Ingrese apellidos" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                </div>
                <div>
                    <label>Rut</label>
                    <input placeholder="Ingrese rut" value={formData.rutOrPassport} maxLength={9} onChange={(e) => setFormData({ ...formData, rutOrPassport: e.target.value })} />
                </div>
            </section>
            <button className="send-button" type="submit" disabled={disabled}>Crear</button>
        </form>
    )
}