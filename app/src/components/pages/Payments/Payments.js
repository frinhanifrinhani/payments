import api from '../../../utils/api'
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import useFlashMessage from '../../../hooks/useFlashMessage'

import Modal from 'react-modal';

import styles from './Dashboard.module.css'

function Payments() {
    const [payments, setPayments] = useState([])
    const [token] = useState(localStorage.getItem('token'))
    const { setFlashMessage } = useFlashMessage()

    const [modalIsOpen, setModalOpen] = useState(false);
    const [paymentId, setPaymentIdToRemove] = useState(null);

    useEffect(() => {
        api.get('/payment', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setPayments(response.data.payments)
        })
    }, [token])

    async function removePayment(id) {
        setModalOpen(true);
        setPaymentIdToRemove(id);
    }

    async function confirmRemovePayment() {
        setModalOpen(false);
        let msgType = 'success'

        const data = await api.delete(`/payment/${paymentId}`)
            .then((response) => {
                fetchPayments()
                return response.data
            })
            .catch((error) => {
                msgType = 'error'
                return error.response.data
            })

        setFlashMessage(data.message, msgType)

    }

    async function fetchPayments() {
        api.get('/payment', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setPayments(response.data.payments)
        })
    }

    function cancelRemovePayment() {
        setModalOpen(false);
    }

    return (
        <section>
            <div className={styles.paymentslist_header}>
                <h1>Pagamentos</h1>
                <Link to="/payment/add">Cadastrar Pagamento</Link>
            </div>
            <div className={styles.paymentslist_container}>

                {payments.length > 0 && (

                    <div className={styles.payments_header} >
                        <div className={styles.column_header}>Nome</div>
                        <div className={styles.column_header_big}>Descrição</div>
                        <div className={styles.column_header}>Valor</div>
                        <div className={styles.column_header}>Ações</div>
                    </div>
                )
                }

                {payments.length > 0 && (
                    payments.map((payment) => (
                        <div className={styles.payments} >
                            <div className={styles.record}>{payment.name}</div>
                            <div className={styles.record_header_big}>{payment.description.slice(0, 65)}...</div>
                            <div className={styles.record}>R$ {payment.value}</div>
                            <div className={styles.record}>
                                <Link className={styles.edit} to={`/payment/edit/${payment.id}`}>Editar</Link>
                                <button className={styles.delete} onClick={() => {
                                    removePayment(payment.id)
                                }} >Excluir</button>
                            </div>
                        </div>
                    )
                    )
                )
                }
                {payments.length === 0 && <p>Não existem saldos para serem mostrados</p>}
            </div>

            <Modal
                className={styles.modal}
                isOpen={modalIsOpen}
                onRequestClose={() => setModalOpen(false)}
                contentLabel="Excluir pedido"
            >
                <h2>Excluir pagmento?</h2>
                <p>Ao excluir este pagamento a ação não poderá ser revertida. Tem certeza que deseja excluir?</p>
                <button className={styles.delete} onClick={confirmRemovePayment}>Sim</button>
                <button className={styles.no_delete} onClick={cancelRemovePayment}>Não</button>
            </Modal>

        </section >
    )
}

export default Payments