import {
    collection,
    addDoc,
    Timestamp,
    getDocs,
    writeBatch,
    query,
    documentId,
    where
} from 'firebase/firestore/lite';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, {useContext, useState} from 'react'
import {CartContext} from '../../context/CartContext'
import {db} from '../../firebase/config';
import * as Yup from "yup";
import { Link, Redirect } from 'react-router-dom';
import ProductsTable from '../ProductsTable';
import { ProductsSummary } from '../ProductsSummary';

const initialValues = {
    name:"",
    email:"",
    confirmEmail: "",
    phone:""
}
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schema = Yup.object().shape({
    name: Yup.string().min(5, "No cumple con el mínimo de caracteres").max(35, "Excede el número de caracteres").required("Este campo es requerido"),
    email: Yup.string().email('Formato no válido de correo"').required("Este campo es requerido"),
    confirmEmail:Yup.string().oneOf([Yup.ref('email')], "Los correos no coinciden").required("Este campo es requerido"),
    phone: Yup.string().matches(phoneRegExp, 'El formato debe ser numérico').required("Este campo es requerido"),


})

const Checkout = () => {
    const {cartItems, cartTotalPrice, cleanCart} = useContext(CartContext);
    const [orderID, setOrderID] = useState("");

    const handleSubmit = (values) => {
        const order = {
            buyer: values,
            items: cartItems,
            total: cartTotalPrice,
            date: Timestamp.fromDate(new Date())
        }

        const batch = writeBatch(db)
        const ordersRef = collection(db, "orders")

        const productosRef = collection(db, "products");
        const q = query(productosRef, where(documentId(), "in", cartItems.map(el => el.id)))

        const outOfStock = []
        getDocs(q).then((resp) => {
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
                    setOrderID(response.id)
                    cleanCart()
                })

            } else {
                alert("Hay productos sin stock")
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
                <>
                    <h2>Tu compra fue registrada con el ID de pedido: <strong>{orderID}</strong></h2>
                    <Link to="/" className='btn btn-primary'>Ir a inicio</Link>
                </>
            ) : (
                <>
                    <h1 className='text-center'>Checkout</h1>
                    <div className="row">
                        <aside className="col-md-7">
                            <ProductsTable cartItems={cartItems} options={false}/>
                            <ProductsSummary cartTotalPrice={cartTotalPrice} options={false}/>                            
                        </aside>  
                        <aside className="col-md-5">
                        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={schema}>
                            {()=>(
                                <Form>
                                    <Field name="name" className='form-control my-2' placeholder="Nombre:"/>                              
                                    <ErrorMessage name={"name"} render={msg => <p className='alert alert-danger'>{msg}</p>} />

                                
                                    <Field name="email" className='form-control my-2' placeholder="Correo:"/>                              
                                    <ErrorMessage name={"email"} render={msg => <p className='alert alert-danger'>{msg}</p>} />

                                    <Field name="confirmEmail" className='form-control my-2' placeholder="Confirmar correo:"/>                              
                                    <ErrorMessage name={"confirmEmail"} render={msg => <p className='alert alert-danger'>{msg}</p>} />

                                    <Field name="phone" className='form-control my-2' placeholder="Telefono:"/>                              
                                    <ErrorMessage name={"phone"} render={msg => <p className='alert alert-danger'>{msg}</p>} />
                        
                                    <button className='btn btn-success' type="submit">Comprar</button>
                                    <Link to="/cart" className='btn btn-secondary float-end'>Regresar</Link>

                                </Form>
                            )}
                        </Formik>
                        </aside>
                    </div>
                   
                </>
            )
        } </div>
    )
}

export default Checkout
