import React, {useContext} from 'react'
import Cart from '../../components/Cart'
import { CartContext } from '../../context/CartContext'

const CartContainer = () => {
    const {cartItems, cleanCart, removeItem, cartTotalPrice} = useContext(CartContext);

    return (
        <div className="mt-5">          
            <Cart cartItems={cartItems} cleanCart={cleanCart} removeItem={removeItem} cartTotalPrice={cartTotalPrice} />
        </div>
    )
}

export default CartContainer
