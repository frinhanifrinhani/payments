import styles from './Select.module.css'

function SelectBalance({ text, name, options, handleOnChange, value, chosenOption, returnedOption, disabled, readonly }) {

    let select
    if (returnedOption) {
        select = <option value={value}>{returnedOption.name}</option>
    } else {
        select = <option value={value}>{chosenOption || 'Selecione um saldo'}</option>
    }

    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select
                name={name}
                id={name}
                disabled={disabled ? true : false}
                readonly={readonly ? true : false}
                onChange={handleOnChange}
                value={value || ''}>
                {select}
                {options.map((option) => (

                    < option value={option.id} key={option.id} > {option.name} - R$ {parseFloat(option.initial_value) - parseFloat(option.used_value)}</option>
                ))}
            </select>
        </div >
    )
}

export default SelectBalance