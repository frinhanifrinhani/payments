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

        let message;
        let msgType = 'success'

        try {

            await api.post('/register', user).
                then((response) => {
                    message = response.data.message
                    return message;
                })

            navigate('/login')

        } catch (error) {

            const typeResponseError = typeof error.response.data.message;

            let errors
            if (typeResponseError === 'object') {
                errors = Object.entries(error.response.data.message).reverse()
            }

            if (typeResponseError === 'string') {
                errors = Object.entries(error.response.data)
            }

            errors.map(([field, messages]) => {

                message = messages
            })
            msgType = 'error'

        }

        setFlashMessage(message, msgType)
    }

    async function authUser(data) {

        setAuthenticated(true)

        localStorage.setItem('token', JSON.stringify(data.token))

        navigate('/')
    }

    async function login(user) {
        let message;
        let msgType = 'success'

        try {

            await api.post('/login', user).
                then((response) => {
                    authUser(response.data)
                    message = response.data.message
                    return message;
                })

        } catch (error) {

            const typeResponseError = typeof error.response.data.message;

            let errors
            if (typeResponseError === 'object') {
                errors = Object.entries(error.response.data.message).reverse()
            }

            if (typeResponseError === 'string') {
                errors = Object.entries(error.response.data)
            }

            errors.map(([field, messages]) => {

                message = messages
            })
            msgType = 'error'
        }

        setFlashMessage(message, msgType)

    }

    function logout() {
        const msgText = 'Logout realizado com sucesso!'
        const msgType = 'success'

        setAuthenticated(false)
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = undefined

        navigate('/')

        setFlashMessage(msgText, msgType)

    }

    return { authenticated, register, login, logout }
}
