import React from 'react'
import "./styles.css"

const CartWidget = () => {
    return (
        <div class="cart-container">
            <button type="button" class="btn-dark position-relative">
                <i className="bi bi-cart cart-style"></i>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    2
                </span>
            </button>
        </div>
    )
}

export default CartWidget
