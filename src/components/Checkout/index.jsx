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
import { Redirect } from 'react-router-dom';
import Cart from '../Cart';

const initialValues = {
    nombre:"",
    email:"",
    phone:""
}
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schema = Yup.object().shape({
    nombre: Yup.string().min(5, "Muy corto").max(10, "Muy largo").required("Es requerido"),
    email: Yup.string().email('Invalid email').required("Es requerido"),
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required("Es requerido"),


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
    }
    if(!orderID && cartItems.length <= 0){
        return <Redirect to="/"/>
    }

    return (
        <div className='container mt-5'>
            {
            orderID ? (
                <h2>Tu compra fue registrada: {orderID}</h2>
            ) : (
                <>
                    <h1 className='text-center'>Checkout</h1>
                    <div className="row d-flex align-items-center justify-content-center">
                        
                        <div className="col-md-6">
                        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={schema}>
                        {(formik)=>(
                            <form onSubmit={formik.handleSubmit}>
                                <Field name="nombre" className='form-control my-2' placeholder="Nombre..."/>
                                {/* <input onChange={formik.handleChange}
                                    value={formik.values.nombre}
                                    type="text"
                                    className='form-control my-2'
                                    placeholder='Nombre:'
                                    name="nombre"/> */}
                                    {formik.errors.nombre && <p className='alert alert-danger'>{formik.errors.nombre}</p>}

                                <input onChange={formik.handleChange}
                                    value={formik.values.email}

                                    type="email"
                                    className='form-control my-2'
                                    placeholder='Correo:'
                                    name="email"/>
                                    {formik.errors.email && <p className='alert alert-danger'>{formik.errors.email}</p>}


                                <input onChange={formik.handleChange}
                                    value={formik.values.phone}

                                    type="tel"
                                    className='form-control my-2'
                                    placeholder='Telefono:'
                                    name="phone"/>
                                    {formik.errors.phone && <p className='alert alert-danger'>{formik.errors.phone}</p>}

                                <button className='btn btn-success' type="submit">Comprar</button>

                            </form>
                        )}
                    </Formik>
                        </div>
                    
                    </div>
                </>
            )
        } </div>
    )
}

export default Checkout
