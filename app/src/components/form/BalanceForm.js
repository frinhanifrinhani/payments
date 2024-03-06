import { useState } from "react"
import formStyles from './Form.module.css'
import Input from "./Input"

function BalanceForm({ handleSubmit, balanceData, disabled, readonly, btnText }) {
    const [balance, setBalance] = useState(balanceData || {})

    const formatCurrency = (input) => {
        const numberValue = input.replace(/[^\d]/g, '')
        const formatterToHandleChange = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
        return formatterToHandleChange.format(numberValue / 100);
    };

    function handleChange(e) {

        const targetName = e.target.name
        const input = e.target.value
        const formattedValue = formatCurrency(input);

        setBalance({
            ...balance,
            [targetName]: targetName === 'initial_value' ? formattedValue : e.target.value

        });
    }

    function submit(e) {
        e.preventDefault()
        const cleanedInitialValue = balance.initial_value
            .replace(/[^\d]/g, '')
            .replace(/^0+/g, '');

        const updatedBalance = {
            ...balance,
            initial_value: parseFloat(cleanedInitialValue) / 100
        };

        handleSubmit(updatedBalance);

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
                type="text"
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