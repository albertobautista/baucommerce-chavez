import React from 'react'
import {currencyFormat} from '../../utils'

const ProductsTable = ({cartItems, removeItem, options=true}) => {
    return (
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
                    <tbody> 
                    {
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
                                        <var className="price">
                                            {
                                            currencyFormat(cartItem.price)
                                        }</var>
                                    </div>
                                </td>
                                <td>
                                    <div className="price-wrap ">
                                        <var className="price">
                                            {
                                            currencyFormat(cartItem.price * cartItem.quantity)
                                        }</var>
                                    </div>
                                </td>
                                {options && <td>
                                    <button onClick={
                                            () => removeItem(cartItem.id)
                                        }
                                        className="btn btn-light">
                                        Eliminar</button>
                                </td>
                                }

                            </tr>
                        ))
                    } </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductsTable
