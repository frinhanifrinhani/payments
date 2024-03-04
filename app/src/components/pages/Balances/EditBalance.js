import api from '../../../utils/api'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import styles from './AddBalance.module.css'

import BalanceForm from '../../form/BalanceForm'

import useFlashMessage from '../../../hooks/useFlashMessage'

function EditBalance() {
    const [balance, setBalance] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const { id } = useParams()
    const { setFlashMessage } = useFlashMessage()

    useEffect(() => {
        api.get(`/balance/${id}`, {
            Authorization: `Bearer ${JSON.parse(token)}`
        }).then((response) => {
            setBalance(response.data.balance)

        }).catch((error) => {
            console.log(error)
        })
    }, [token, id])


    async function updateBalance(balance) {
        let message;
        let msgType = 'success'

        const data = await api.patch(`/balance/${id}`, balance, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
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
    }

    return (
        <section>
            <div className={styles.addbalance_header}>
                <h1>Editar saldo</h1>
            </div>
            {balance.name && (
                <BalanceForm
                    handleSubmit={updateBalance}
                    btnText='Atualizar'
                    disabled='true'
                    readonly='true'
                    balanceData={balance}
                />
            )}
        </section>
    )
}

export default EditBalance