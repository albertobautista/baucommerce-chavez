import React from 'react'
import { Link } from 'react-router-dom'
import { currencyFormat } from '../../utils'

export const ProductsSummary = ({cartTotalPrice, cleanCart, options = true}) => {
    return (
        <div className="card">
            <div className="card-body">
                <dl className="dlist-align ">
                    <dt>Total: </dt>
                    <dd className="text-right text-dark b ml-3">
                        <strong>
                            {currencyFormat(cartTotalPrice)}</strong>
                    </dd>
                </dl>
                {options && 
                <>
                    <hr/>
                    <Link to="/checkout" className="btn btn-out btn-success btn-square btn-main">
                        Terminar Compra
                    </Link>
                    <button onClick={
                            () => cleanCart()
                        }
                        className="btn btn-out btn-danger btn-square btn-main mt-2">Limpiar carrito</button>
                    <Link to="/" className="btn btn-out btn-secondary btn-square btn-main mt-2">Continuar comprando</Link>
                </>
                }
            </div>
        </div>
    )
}
