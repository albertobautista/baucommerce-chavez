import React from 'react'

const Cart = ({cartItems, cleanCart, removeItem}) => {

    return cartItems.length > 0 ? (
        <div className="container">
            <div className="row d-flex justify-content-md-start justify-content-center">
                {
                cartItems.map(cartItem => (
                <div>
                <h1>ID:{cartItem.id}</h1>
                <h1>Nombre:{cartItem.title}</h1>
                <h1>Cantidad:{cartItem.quantity}</h1>
                <button  onClick={()=>removeItem(cartItem.id)}>Quitar</button>
                </div>

            ))
                }
            </div>
            <div className="row d-flex justify-content-md-start justify-content-center">
            <button onClick={()=>cleanCart()}>Limpiar</button>
            </div>
        </div>
    ): "NO hay"

}

export default Cart
