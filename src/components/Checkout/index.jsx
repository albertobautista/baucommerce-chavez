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
import { Field, Formik } from 'formik';
import React, {useContext, useState} from 'react'
import {CartContext} from '../../context/CartContext'
import {db} from '../../firebase/config';
import useForm from '../../hooks/useForm';
import * as Yup from "yup";

const initialValues = {
    nombre:"",
    email:"",
    phone:""
}
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schema = Yup.object().shape({
    nombre: Yup.string().min(5, "Muy corto").max(10, "Muy largo").required("Es requerido"),
    email: Yup.string().email('Invalid email').required("Es requerido"),
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),


})

const Checkout = () => {
    const {cartItems, cartTotalPrice, cleanCart} = useContext(CartContext);
    // const {form, handleChange} = useForm({name: "", email: "", phone: ""})
    const [orderID, setOrderID] = useState("");




    const handleSubmit = (values) => {
        // event.preventDefault()
        const order = {
            buyer: values,
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
                <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={schema}>
                    {(formik)=>(
                        <form onSubmit={formik.handleSubmit}>
                            <Field name="nombre"  className='form-control my-2'/>
                            {/* <input onChange={formik.handleChange}
                                value={formik.values.nombre}
                                type="text"
                                className='form-control my-2'
                                placeholder='Nombre:'
                                name="nombre"/> */}
                                {formik.errors.nombre && <p>{formik.errors.nombre}</p>}

                            <input onChange={formik.handleChange}
                                value={formik.values.email}

                                type="email"
                                className='form-control my-2'
                                placeholder='Correo:'
                                name="email"/>
                                {formik.errors.email && <p>{formik.errors.email}</p>}


                            <input onChange={formik.handleChange}
                                value={formik.values.phone}

                                type="tel"
                                className='form-control my-2'
                                placeholder='Telefono:'
                                name="phone"/>
                                {formik.errors.phone && <p>{formik.errors.phone}</p>}

                            <button type="submit">Comprar</button>

                        </form>
                    )}
                </Formik>
                // <form onSubmit={handleSubmit}>
                //     <input onChange={handleChange}
                //         type="text"
                //         className='form-control my-2'
                //         placeholder='Nombre:'
                //         name="name"/>

                //     <input onChange={handleChange}
                //         type="email"
                //         className='form-control my-2'
                //         placeholder='Correo:'
                //         name="email"/>

                //     <input onChange={handleChange}
                //         type="tel"
                //         className='form-control my-2'
                //         placeholder='Telefono:'
                //         name="phone"/>
                //     <button type="submit">Comprar</button>

                // </form>
            )
        } </div>
    )
}

export default Checkout
