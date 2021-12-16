import {
    collection,
    addDoc,
    Timestamp,
    updateDoc,
    doc,
    getDoc,
    getDocs,
    writeBatch,
    query,
    documentId,
    where
} from 'firebase/firestore/lite';
import React, {useContext, useState} from 'react'
import {CartContext} from '../../context/CartContext'
import {db} from '../../firebase/config';
import useForm from '../../hooks/useForm';
const Checkout = () => {
    const {cartItems, cartTotalPrice, cleanCart} = useContext(CartContext);
    const {form, handleChange} = useForm({name: "", email: "", phone: ""})
    const [orderID, setOrderID] = useState("");


    const handleSubmit = (event) => {
        event.preventDefault()
        const order = {
            buyer: form,
            items: cartItems,
            total: cartTotalPrice,
            date: Timestamp.fromDate(new Date())
        }
        console.log("ORDERRR", order)

        const batch = writeBatch(db)
        const ordersRef = collection(db, "orders")

        const productosRef = collection(db, "products");
        const q = query(productosRef, where(documentId(), "in", cartItems.map(el => el.id)))

        const outOfStock = []
        //LOADIN
        getDocs(q).then((resp) => {
            console.log("docs;", resp.docs.map(doc => doc.data()))
            resp.docs.forEach(doc => {
                const itemToUpdate = cartItems.find(prod => prod.id === doc.id)
                if (doc.data().stock >= itemToUpdate.quantity) {
                    batch.update(doc.ref, {
                        stock: doc.data().stock - itemToUpdate.quantity
                    })
                } else {
                    outOfStock.push(itemToUpdate)
                }
            })
            if (outOfStock.length === 0) {

                addDoc(ordersRef, order).then(response => {
                    batch.commit()
                    console.log("Pedido creado", response)
                    console.log("Pedido creado", response.id)
                    setOrderID(response.id)
                    cleanCart()
                    //LOADIN
                })

            } else {
                alert("Hay productos sin stock")
                //LOADIN
            }
        })
        // cartItems.forEach(element => {
        //     const docRef = doc(productosRef, element.id)
        //     console.log("DOC 2", element.quantity)

        //     getDoc(docRef)
        //         .then(doc =>{
        //             console.log("DOC ", doc.data().stock)
        //             console.log("DOC 2", element.quantity)

        //             updateDoc(docRef,{
        //                 stock: doc.data().stock - element.quantity
        //             })
        //         })
        // });
        // addDoc(ordersRef, order).then(response => {
        //     console.log("Pedido creado", response)
        //     console.log("Pedido creado", response.id)
        //     setOrderID(response.id)
        //     cleanCart()
        // })

    }
    return (
        <div style={
            {marginTop: "80px"}
        }>
            {
            orderID ? (
                <h2>Tu compra fue registrada: {orderID}</h2>
            ) : (
                <form onSubmit={handleSubmit}>
                    <input onChange={handleChange}
                        type="text"
                        className='form-control my-2'
                        placeholder='Nombre:'
                        name="name"/>

                    <input onChange={handleChange}
                        type="email"
                        className='form-control my-2'
                        placeholder='Correo:'
                        name="email"/>

                    <input onChange={handleChange}
                        type="tel"
                        className='form-control my-2'
                        placeholder='Telefono:'
                        name="phone"/>
                    <button type="submit">Comprar</button>

                </form>
            )
        } </div>
    )
}

export default Checkout
