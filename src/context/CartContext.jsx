import {createContext, useEffect, useState} from "react";

export const CartContext = createContext([]);

const CartContextProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartTotalPrice, setCartTotalPrice] = useState(0);


    const isInCart = (id) => cartItems.some(itemCart => itemCart.id === id);


    const addItem = (item) => {
        if (!isInCart(item.id)) 
            setCartItems([
                ...cartItems,
                item
            ])
        
    }

    const removeItem = (id) => {
        const cartItemsCopy = [...cartItems];
        const filtered = cartItemsCopy.filter(cartItem => cartItem.id !== id);
        setCartItems(filtered)

    }

    const getSubtotal = () => {
        const subtotal = cartItems.map(item => ({
            id: item.id,
            subtotal: (item.price * item.quantity)
        }));
        return subtotal;
    };

    const getTotalPrice = () => {
        const subtotalPrice = getSubtotal()
        console.log("ITEEEEEMS", subtotalPrice)
        const total = subtotalPrice.reduce((total, cartItem) => total + cartItem.subtotal, 0);
        console.log("ITEEEEEMS2", total)

        setCartTotalPrice(total)
    }

    const cleanCart = () => {
        setCartItems([])
    }
    useEffect(() => {
        getTotalPrice()
    }, [cartItems])

    return (
        <CartContext.Provider value={
            {
                cartItems,
                addItem,
                cleanCart,
                removeItem,
                isInCart,
                cartTotalPrice
            }
        }>
            {children} </CartContext.Provider>
    )
}

export default CartContextProvider;
