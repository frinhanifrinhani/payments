import { NavLink } from "react-router-dom"

import styles from './Navbar.module.css'

import Logo from '../../assets/img/logo.png'

import { Context } from '../../context/UserContext'
import { useContext } from "react"

function Navbar() {

    const { authenticated, logout } = useContext(Context)

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar_logo}>
                <img src={Logo} alt="Saldos" />
                <h2>Payments</h2>
            </div>
            <ul>

                {authenticated ? (
                    <>
                        <li >
                            <NavLink to="/balance">Saldos</NavLink>
                        </li>
                        <li >
                            <NavLink to="/payment">Pagamentos</NavLink>
                        </li>
                        <li onClick={logout}>Sair</li>
                    </>
                ) : (
                    <>
                        <li>
                            <NavLink to="/login">Entrar</NavLink>
                        </li>
                        <li>
                            <NavLink to="/register">Cadastrar</NavLink>
                        </li></>
                )}

            </ul>
        </nav>
    )


}

export default Navbar