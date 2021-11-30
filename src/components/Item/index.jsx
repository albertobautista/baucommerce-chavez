import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

const Item = ({item}) => {
    const {
        id,
        title,
        description,
        price,
        pictureUrl,
        stock,
        category
    } = item
    return (
        <div className="ibox">
            <div className="ibox-content product-box">
                <div className="product-imitation">
                    <img src={pictureUrl} alt={title} style={{width: '100%'}}/>
                </div>
                <div className="product-desc">
                    <span className="product-price">
                        {price}
                    </span>
                    {/* <small className="text-muted">Category</small> */}
                    <h1 href="#" className="product-name"> {title}</h1>

                    <div className="small m-t-xs">
                       {description}
                    </div>
                    <div className="big mt-3 m-t-xs">
                      Stock: {stock}
                    </div>
                    {category}
                    <div className="mt-3 text-right" align="center">
                        <Link to={`/item/${id}`} className="btn btn-xs btn-outline btn-primary">Ver Detalles</Link>
                    </div>
                </div>
            </div>
            </div>
    )
}

export default Item
