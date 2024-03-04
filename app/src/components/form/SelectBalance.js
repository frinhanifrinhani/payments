import styles from './Select.module.css'

function SelectBalance({ text, name, options, handleOnChange, value, chosenOption }) {

    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select
                name={name}
                id={name}
                onChange={handleOnChange}
                value={value || ''}>
                <option value={value}>{chosenOption || 'Selecione um saldo'}</option>
                {options.map((option) => (

                    < option value={option.id} key={option.id} > {option.name} - R$ {parseFloat(option.initial_value) - parseFloat(option.used_value)}</option>
                ))}
            </select>
        </div >
    )
}

export default SelectBalance