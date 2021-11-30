import React from 'react'
import { NavLink } from 'react-router-dom'
import CartWidget from '../CartWidget'
import Menu from '../Menu'

const NavBar = () => {
    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">Bau-commerce</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <Menu/>
                    <CartWidget />
                </div>
            </div>
        </nav>
    )
}
export default NavBar
