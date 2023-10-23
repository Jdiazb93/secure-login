import React, { useState, useEffect } from "react";
import { InputSwitch } from 'primereact/inputswitch'
import { MdModeNight } from 'react-icons/md'
import { CiLight } from 'react-icons/ci'
import { AiOutlinePoweroff } from 'react-icons/ai'

export const Layout = () => {
    const [checked, setChecked] = useState(false)
    const [sessionExist, setSessionExist] = useState(false)

    const token = localStorage.getItem('token')

    useEffect(() => {
        if(!checked) {
            localStorage.removeItem('theme')
            document.documentElement.classList.remove('dark')
        }
        if(checked) {
            localStorage.setItem('theme', 'dark')
            document.documentElement.classList.add('dark')
        }
    }, [checked])

    useEffect(() => {
        if(token) setSessionExist(true)
        if(!token) setSessionExist(false)
    }, [token])

    return (
        <nav className="bg-cyan-500 dark:bg-blue-700 p-3 top-0 w-full flex justify-end pr-10 items-center duration-200">
            {!checked ? <CiLight className="fill-slate-950 text-3xl" /> :
            <MdModeNight className="fill-slate-950 text-3xl" />}
            <InputSwitch checked={checked} onChange={(e) => setChecked(e.value)} className="ml-3" />
            {sessionExist && 
            <a href="/">
                <AiOutlinePoweroff className="cursor-pointer text-2xl fill-slate-950 ml-5" onClick={() => localStorage.removeItem('token')} />
            </a>}
        </nav>
    )
}