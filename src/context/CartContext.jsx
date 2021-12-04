import { createContext, useState } from "react";

export const CartContext = createContext([]);

const CartContextProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([])

    const isInCart = (id) => {
        const isInCartItem = cartItems.find(itemCart => itemCart.id === id);
        if (isInCartItem !== undefined) return true;
        return false
    }

    const addItem = (item) => {
        const isItemInCart = isInCart(item.id)
        if (!isItemInCart) setCartItems([...cartItems, item])
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
        <CartContext.Provider value={{cartItems, addItem, cleanCart, removeItem}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;