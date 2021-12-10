import React from 'react'
import {Link} from 'react-router-dom'
import "./styles.css"

const Cart = ({cartItems, cleanCart, removeItem, cartTotalPrice}) => {

    return cartItems.length > 0 ? (
        <div className="container">
            <div className="row">
                <aside className="col-lg-9">
                    <div className="card">
                        <div className="table-responsive">
                            <table className="table table-borderless table-shopping-cart text-center">
                                <thead className="text-muted">
                                    <tr className="small text-uppercase">
                                        <th scope="col"></th>
                                        <th scope="col">Producto</th>
                                        <th scope="col">Cantidad</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Subtotal</th>
                                        <th scope="col" className="text-right d-none d-md-block"></th>
                                    </tr>
                                </thead>
                                <tbody> {
                                    cartItems.map(cartItem => (
                                        <tr className="align-middle"
                                            key={
                                                cartItem.id
                                        }>
                                            <td>
                                                <figure className="itemside align-items-center">
                                                    <div className="aside"><img src={
                                                                cartItem.pictureUrl
                                                            }
                                                            className="img-sm"
                                                            alt={
                                                                cartItem.title
                                                            }/></div>
                                                </figure>
                                            </td>
                                            <td>
                                                <figure className="align-items-center">
                                                    <figcaption className="info">
                                                        <span href="#" className="title text-dark" data-abc="true">
                                                            {
                                                            cartItem.title
                                                        }</span>

                                                    </figcaption>
                                                </figure>
                                            </td>
                                            <td>
                                                <div className="price-wrap">
                                                    {
                                                    cartItem.quantity
                                                } </div>
                                            </td>
                                            <td>
                                                <div className="price-wrap ">
                                                    <var className="price">${
                                                        cartItem.price
                                                    }</var>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="price-wrap ">
                                                    <var className="price">${
                                                        cartItem.price * cartItem.quantity
                                                    }</var>
                                                </div>
                                            </td>
                                            <td>
                                                <button onClick={
                                                        () => removeItem(cartItem.id)
                                                    }
                                                    className="btn btn-light">
                                                    Eliminar</button>
                                            </td>
                                        </tr>
                                    ))
                                } </tbody>
                            </table>
                        </div>
                    </div>
                </aside>
                <aside className="col-lg-3">

                    <div className="card">
                        <div className="card-body">
                            <dl className="dlist-align">
                                <dt>Total:</dt>
                                <dd className="text-right text-dark b ml-3">
                                    <strong>
                                        $ {cartTotalPrice}</strong>
                                </dd>
                            </dl>
                            <hr/>
                            <button className="btn btn-out btn-success btn-square btn-main">
                                Terminar Compra
                            </button>
                            <button onClick={
                                    () => cleanCart()
                                }
                                className="btn btn-out btn-danger btn-square btn-main mt-2">Limpiar carrito</button>
                            <Link to="/" className="btn btn-out btn-secondary btn-square btn-main mt-2">Continuar comprando</Link>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    ) : "NO hay"

}

export default Cart
