//import React from 'react';
//import useFlashMessage from '../path-to-useFlashMessage'; // Importe o hook useFlashMessage do local apropriado


import { React, useState, useEffect } from "react"
import useFlashMessage from '../../utils/bus'

//import styles from './Message.module.css'

function Message() {
    const { setFlashMessage } = useFlashMessage();

    // Aqui você precisa ter uma variável de estado para armazenar os erros recebidos da API
    const [errors, setErrors] = React.useState(null);

    // Função para lidar com os erros recebidos da API
    function handleErrors(errors) {
        if (errors) {
            // Mapeie os erros e concatene-os em uma mensagem de erro
            const errorMessage = Object.keys(errors).map(field => `${field}: ${errors[field].join(", ")}`).join("\n");
            setFlashMessage(errorMessage, 'error');
            // Defina os erros na variável de estado para que possam ser exibidos no componente
            setErrors(errors);
        }
    }

    // Chame a função handleErrors com os erros recebidos da API
    React.useEffect(() => {
        // Suponha que você esteja recebendo os erros da sua API em algum lugar e armazenando em uma variável errorsReceived
        const errorsReceived = {
            email: ["The email field is required."],
            name: ["The name field is required."],
            password: ["The password field is required."]
        };

        handleErrors(errorsReceived);
    }, []); // Esta função será executada apenas uma vez, após a montagem do componente

    return (
        <div>
            {/* Aqui você pode renderizar os erros, se houver */}
            {errors && (
                <div>
                    <h2>Error:</h2>
                    <ul>
                        {Object.keys(errors).map(field => (
                            <li key={field}>
                                <strong>{field}:</strong> {errors[field].join(", ")}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Message;