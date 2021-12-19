import React, {useContext, useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import CartWidget from '../CartWidget'
import Menu from '../Menu'

const NavBar = () => {
    const {cartItems} = useContext(CartContext);
    const [cartCount, setCartCount] = useState(0)

    const getTotalItems = () => {
        const total = cartItems.reduce((total, current) => {
            return total + current.quantity
        },0)

        setCartCount(total)
    }

    useEffect(() => {
        getTotalItems()
    },[cartItems])

    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">Bau-commerce</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <Menu/>
                    <CartWidget cartCount={cartCount} />
                </div>
                <button className="btn btn-primary m-2">Login</button>
                <button className="btn btn-warning">SignUp</button>

            </div>
        </nav>
    )
}
export default NavBar
