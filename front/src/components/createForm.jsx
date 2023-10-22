import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { createRelatedUser } from '../api/users'
import { toast } from 'react-toastify'

export const CreateForm = ({ setFetch }) => {
    const [formData, setFormData] = useState({
        name: '',
        surName: '',
        email: '',
        position: ''
    })
    const navigate = useNavigate()

    /**
     * Función que ejecuta lógica luego de enviar el formulario.
     */
    const handleSubmit = async (e) => {
        //Se previene el refrescado por defecto.
        e.preventDefault()
        //Se obtienee el token
        const token = localStorage.getItem('token')
        //Se hace petición mediante fetch
        const newUser = await createRelatedUser(formData, token);
        //Si existe un error, entregará un toast de error.
        if(newUser.status !== 200) toast.error('Algo salió mal, inténtalo nuevamente!.')
        /**
         * Si el token está vencido, será removido de la memoria local.
         * Además, se redireccionará al login para volver a iniciar sesión.
         * El token tiene una duración de 5 minutos.
         */
        if(newUser.status !== 200 && !newUser.tokenStatus) {
            localStorage.removeItem('token')
            toast.error('El token ha vencido.')
            navigate('/')
            navigate(0)
        }

        /**
         * Si todo va bien, el formulario se resetea y se muestra un toast de success.
         * Además se actualiza un estado global, que refrescará el listado de usuarios.
         */
        if(newUser.status === 200) {
            setFormData({
                name: '',
                surName: '',
                email: '',
                position: ''
            })
            toast.success('Usuario creado con éxito!.')
            setFetch(true)
        }
    }

    //Se valida si los datos mínimos requeridos existen o no, para habilitar el botón de submit y prevenir errores.
    const disabled = !formData.name || !formData.surName || !formData.email

    return (
        <form onSubmit={handleSubmit}>
            <section className="form-section">
                <div>
                    <label>Nombres</label>
                    <input placeholder="Ingrese nombres" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div>
                    <label>Apellidos</label>
                    <input placeholder="Ingrese apellidos" value={formData.surName} onChange={(e) => setFormData({ ...formData, surName: e.target.value })} />
                </div>
            </section>
            <section className="form-section">
                <div>
                    <label>Correo electrónico</label>
                    <input placeholder="Ingrese correo" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div>
                    <label>Posición</label>
                    <input placeholder="Ingrese posición" value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} />
                </div>
            </section>
            <button className="send-button" type="submit" disabled={disabled}>Crear</button>
        </form>
    )
}