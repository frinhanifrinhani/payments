import api from '../../../utils/api'

import styles from './AddPayment.module.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useFlashMessage from '../../../hooks/useFlashMessage'

import PaymentForm from '../../form/PaymentForm'

function AddPayment() {
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()

    async function registerPayment(payment) {
        let message;
        let msgType = 'success'

        const data = await api.post(`/payment`, payment, {
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
            navigate('/payment')
        }
    }

    return (
        <section className={styles.addpayment_header}>
            <div >
                <h1>Cadastro de Pagamentos</h1>
            </div>
            <PaymentForm handleSubmit={registerPayment} btnText="Cadastrar" />

        </section >
    )
}

export default AddPayment