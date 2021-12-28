import React from 'react'
import NoData from '../NoData'
import { ProductsSummary } from '../ProductsSummary'
import ProductsTable from '../ProductsTable'
import "./styles.css"

const Cart = ({cartItems, cleanCart, removeItem, cartTotalPrice}) => {

    return cartItems.length > 0 ? (
        <div className="container">
            <div className="row">
                <aside className="col-lg-9">
                   <ProductsTable cartItems={cartItems} removeItem={removeItem} />
                </aside>
                <aside className="col-lg-3">
                    <ProductsSummary cartTotalPrice={cartTotalPrice} cleanCart={cleanCart}/>
                </aside>
            </div>
        </div>
    ) : <NoData message="Carrito vacío"/>

}

export default Cart
