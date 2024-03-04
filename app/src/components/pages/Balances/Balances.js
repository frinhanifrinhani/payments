import api from '../../../utils/api'
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom"
import useFlashMessage from '../../../hooks/useFlashMessage'

import Modal from 'react-modal';

import styles from './Dashboard.module.css'

function Balances() {
    const [balances, setBalances] = useState([])
    const [token] = useState(localStorage.getItem('token'))
    const { setFlashMessage } = useFlashMessage()

    const [modalIsOpen, setModalOpen] = useState(false);
    const [balanceId, setBalanceIdToRemove] = useState(null);

    const navigate = useNavigate()

    useEffect(() => {
        api.get('/balance', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setBalances(response.data.balances)
        })
    }, [token])

    async function removeBalance(id) {
        setModalOpen(true);
        setBalanceIdToRemove(id);
    }

    async function confirmRemoveBalance() {
        setModalOpen(false);
        let msgType = 'success'

        const data = await api.delete(`/balance/${balanceId}`)
            .then((response) => {
                fetchBalances()
                return response.data
            })
            .catch((error) => {
                msgType = 'error'
                return error.response.data
            })

        setFlashMessage(data.message, msgType)

    }

    async function fetchBalances() {
        api.get('/balance', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setBalances(response.data.balances)
        })
    }

    function cancelRemoveBalance() {
        setModalOpen(false);
    }

    return (
        <section>
            <div className={styles.balanceslist_header}>
                <h1>Saldos</h1>
                <Link to="/balance/add">Cadastrar Saldo</Link>
            </div>
            <div className={styles.balanceslist_container}>

                {balances.length > 0 && (

                    <div className={styles.balances_header} >
                        <div className={styles.column_header}>Nome</div>
                        <div className={styles.column_header_big}>Descrição</div>
                        <div className={styles.column_header}>Valor inicial</div>
                        <div className={styles.column_header}>Valor utilizado</div>
                        <div className={styles.column_header}>Valor restante</div>
                        <div className={styles.column_header}>Ações</div>
                    </div>

                )
                }

                {balances.length > 0 && (
                    balances.map((balance) => (
                        <div className={styles.balances} >
                            <div className={styles.record}>{balance.name}</div>
                            <div className={styles.record_header_big}>{balance.description.slice(0, 65)}...</div>
                            <div className={styles.record}>R$ {balance.initial_value}</div>
                            <div className={styles.record}>R$ {balance.used_value}</div>
                            <div className={styles.record}>R$ {balance.remaining_value}</div>
                            <div className={styles.record}>
                                <Link className={styles.edit} to={`/balance/edit/${balance.id}`}>Editar</Link>
                                <button className={styles.delete} onClick={() => {
                                    removeBalance(balance.id)
                                }} >Excluir</button>
                            </div>
                        </div>
                    )
                    )
                )
                }
                {balances.length === 0 && <p>Não existem saldos para serem mostrados</p>}
            </div>

            <Modal
                className={styles.modal}
                isOpen={modalIsOpen}
                onRequestClose={() => setModalOpen(false)}
                contentLabel="Excluir pedido"
            >
                <h2>Excluir pedido?</h2>
                <p>Ao excluir este saldo a ação não poderá ser revertida. Tem certeza que deseja excluir?</p>
                <button className={styles.delete} onClick={confirmRemoveBalance}>Sim</button>
                <button className={styles.no_delete} onClick={cancelRemoveBalance}>Não</button>
            </Modal>

        </section >
    )
}

export default Balances