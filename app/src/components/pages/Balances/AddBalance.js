import api from '../../../utils/api'

import styles from './AddBalance.module.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useFlashMessage from '../../../hooks/useFlashMessage'

import BalanceForm from '../../form/BalanceForm'

function AddBalance() {
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()

    async function registerBalance(balance) {
        let message;
        let msgType = 'success'

        const data = await api.post(`/balance`, balance, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },

        }).then((response) => {
            message = response.data.message
            return message;

        }).catch((error) => {

            const errorsArray = Object.entries(error.response.data.message)

            const reversedArray = errorsArray.reverse();

            reversedArray.map(([field, messages]) => {

                message = messages
            })
            msgType = 'error'

        })

        setFlashMessage(message, msgType)

        if (msgType !== 'error') {
            navigate('/balance')
        }
    }

    return (
        <section className={styles.addbalance_header}>
            <div >
                <h1>Cadastro de Saldos</h1>
            </div>
            <BalanceForm handleSubmit={registerBalance} btnText="Cadastrar" />

        </section >
    )
}

export default AddBalance