import { useState } from "react"
import formStyles from './Form.module.css'
import Input from "./Input"

function BalanceForm({ handleSubmit, balanceData, disabled, readonly, btnText }) {
    const [balance, setBalance] = useState(balanceData || {})

    function handleChange(e) {
        setBalance({ ...balance, [e.target.name]: e.target.value })
    }


    function submit(e) {
        e.preventDefault()

        handleSubmit(balance)
    }

    return (

        < form onSubmit={submit} className={formStyles.form_container_large} >
            <Input
                text="Nome"
                type="text"
                name="name"
                placeholder="Digite o nome do saldo"
                handleOnChange={handleChange}
                value={balance.name || ''}
            />
            <Input
                text="Descrição"
                type="text"
                name="description"
                placeholder="Digite a descrição do saldo"
                handleOnChange={handleChange}
                value={balance.description || ''}
            />

            <Input
                text="Valor inicial"
                type="number"
                name="initial_value"
                disabled={disabled ? true : false}
                readonly={readonly ? true : false}
                handleOnChange={handleChange}
                value={balance.initial_value || ''}
            />

            <input type="submit" value={btnText} />
        </form >
    )
}

export default BalanceForm