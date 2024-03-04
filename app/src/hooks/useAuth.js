import api from '../utils/api'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useFlashMessage from './useFlashMessage'

export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false)
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
        }
    }, [])

    async function register(user) {

        let msgText
        let msgType

        try {

            const data = await api.post('/register', user).
                then((response) => {
                    return response.data
                })

            await authUser(data)

            msgText = 'Cadastro realizado com sucesso!'
            msgType = 'success'


        } catch (error) {

            const errorsArray = Object.entries(error.response.data.message)

            const reversedArray = errorsArray.reverse();

            reversedArray.map(([field, messages]) => {
                msgText = messages
            })
            msgType = 'error'

        }

        setFlashMessage(msgText, msgType)
    }

    async function authUser(data) {

        setAuthenticated(true)

        localStorage.setItem('token', JSON.stringify(data.token))

        navigate('/')
    }

    async function login(user) {
        let msgText
        let msgType

        try {

            const data = await api.post('/login', user).
                then((response) => {
                    return response.data
                })

            await authUser(data)

            msgText = 'Login realizado com sucesso'
            msgType = 'success'

        } catch (error) {
            const errorsArray = Object.entries(error.response.data.message)

            const errorMessages = errorsArray.map(([field, messages]) => {

                msgText = messages
            })
            msgType = 'error'
        }

        setFlashMessage(msgText, msgType)

    }

    function logout() {
        const msgText = 'Logout realizado com sucesso'
        const msgType = 'success'

        setAuthenticated(false)
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = undefined

        navigate('/')

        setFlashMessage(msgText, msgType)

    }

    return { authenticated, register, login, logout }
}
