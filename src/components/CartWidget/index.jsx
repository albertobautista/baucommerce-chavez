import React from 'react'
import { Link } from 'react-router-dom'
import "./styles.css"

const CartWidget = ({cartCount}) => {
    return (
        <div class="cart-container">
            <Link type="button" class="btn-dark position-relative" to="/cart">
                <i className="bi bi-cart cart-style"></i>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                </span>
            </Link>
        </div>
    )
}

export default CartWidget
