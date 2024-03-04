import api from '../../../utils/api'
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import useFlashMessage from '../../../hooks/useFlashMessage'

import styles from './Dashboard.module.css'

function Balances() {
    const [balances, setBalances] = useState([])
    const [token] = useState(localStorage.getItem('token'))
    const { setFlashMessage } = useFlashMessage()

    useEffect(() => {
        api.get('/balance', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            console.log(response.data.balances);
            setBalances(response.data.balances)
        })
    }, [token])

    /*async function removeBalance(id) {
        let msgType = 'success'

        const data = await api.delete(`/balances/${id}`)
            .then((response) => {
                const updatedBalances = balances.filter((balance) => balance._id !== id)
                setBalances(updatedBalances)
                return response.data
            })
            .catch((error) => {
                msgType = 'error'
                return error.response.data
            })

        setFlashMessage(data.message, msgType)
    }*/

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
                            <div className={styles.record_header_big}>{balance.description.slice(0, 20)}...</div>
                            <div className={styles.record}>{balance.initial_value}</div>
                            <div className={styles.record}>{balance.used_value}</div>
                            <div className={styles.record}>{balance.remaining_value}</div>
                            <div className={styles.record}>
                                <a className={styles.edit} href="">Editar</a>
                                <a className={styles.delete} href="">Excluir</a>
                            </div>
                        </div>
                    )
                    )
                )
                }
                {balances.length === 0 && <p>Não há Balances cadastrados</p>}
            </div>

        </section >
    )
}
/*
balances.map((balance) => ())
*/
/*
balances.map((balance) => (

    <div>teste</div>

))*/

export default Balances