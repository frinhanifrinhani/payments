
import api from '../../utils/api'
import { useState, useEffect } from "react"
import formStyles from './Form.module.css'
import Input from "./Input"
import Select from "./SelectBalance"


function PaymentForm({ handleSubmit, paymentData, btnText }) {
    const [payment, setPayment] = useState(paymentData || {})
    const [token] = useState(localStorage.getItem('token'))
    const [balances, setBalances] = useState([]);

    useEffect(() => {
        api.get('/balance', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setBalances(response.data.balances)
        })
    }, [token])

    function hanleChange(e) {
        setPayment({ ...payment, [e.target.name]: e.target.value })
    }

    function handleBalance(e) {
        setPayment({ ...payment, balance_id: e.target.value, chosenOption: e.target.options[e.target.selectedIndex].text })
    }

    function submit(e) {
        e.preventDefault()
        console.log(payment)
        handleSubmit(payment)
    }

    return (

        < form onSubmit={submit} className={formStyles.form_container} >

            <Input
                text="Nome"
                type="texto"
                name="name"
                placeholder="Digite o nome do payment"
                handleOnChange={hanleChange}
                value={payment.name || ''}
            />

            <Input
                text="Descrição"
                type="text"
                name="description"
                placeholder="Digite a descrição do payment"
                handleOnChange={hanleChange}
                value={payment.description || ''}
            />

            <Input
                text="Valor"
                type="number"
                name="value"
                placeholder="Digite o valor do payment"
                handleOnChange={hanleChange}
                value={payment.value || ''}
            />

            <Select
                text="Saldo"
                name="balance_id"
                options={balances}
                handleOnChange={handleBalance}
                value={payment.balance_id || ''}
                chosenOption={payment.chosenOption}
            />

            <input type="submit" value={btnText} />
        </form >
    )
}

export default PaymentForm