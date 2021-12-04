import React, {useContext} from 'react'
import Cart from '../../components/Cart'
import { CartContext } from '../../context/CartContext'

const CartContainer = () => {
    const {cartItems, cleanCart, removeItem} = useContext(CartContext);

    return (
        <div style={{marginTop:"80px"}}>          
            <Cart cartItems={cartItems} cleanCart={cleanCart} removeItem={removeItem} />
        </div>
    )
}

export default CartContainer
