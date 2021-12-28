import React from 'react'
import {Link} from 'react-router-dom'
import {currencyFormat} from '../../utils'
import './style.css'

const Item = ({item}) => {
    const {
        id,
        title,
        description,
        price,
        pictureUrl,
        stock
    } = item
    return (
        <div className="ibox">
            <div className="ibox-content product-box">
                <div className="product-imitation">
                    <img src={
                            process.env.PUBLIC_URL + pictureUrl
                        }
                        alt={title}
                        style={
                            {width: '100%'}
                        }/>
                </div>
                <div className="product-desc">
                    <span className="product-price">
                        {
                        currencyFormat(price)
                    } </span>
                    <h1 href="#" className="product-name">
                        {title}</h1>

                    <div className="small m-t-xs">
                        {description} </div>
                    <div className="big mt-3 m-t-xs">
                        Stock: {stock} {" "}
                        piezas
                    </div>
                    <div className="mt-5 text-right" align="center">
                        <Link to={
                                `/item/${id}`
                            }
                            className="btn btn-xs btn-outline btn-primary">Ver Detalles</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Item
