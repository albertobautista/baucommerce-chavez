import { createContext, useState } from "react";

export const CartContext = createContext([]);

const CartContextProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([])

    const isInCart = (id) => cartItems.some(itemCart => itemCart.id === id);
    

    const addItem = (item) => {
    if (!isInCart(item.id)) setCartItems([...cartItems, item])
    }

    const removeItem = (id) =>{
        const cartItemsCopy = [...cartItems];
        const filtered = cartItemsCopy.filter(cartItem => cartItem.id !== id);
        setCartItems(filtered)

    }

    const cleanCart = () => {
        setCartItems([])
    }
    
    return (
        <CartContext.Provider value={{cartItems, addItem, cleanCart, removeItem, isInCart}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;