import React from 'react'

const Item = ({item}) => {
    const {
        title,
        body: description,
        price,
        pictureUrl,
        stock
    } = item
    return (
        <div className="card border-dark"
            style={
                {width: '18rem'}
        }>
            <div className="card-header text-center">
                {title}</div>
            <div className="text-center pt-4">
                <img src={pictureUrl}
                    alt={title}/>
            </div>
            <div className="card-body text-center">
                <p className="card-text">
                    {description}</p>
                <h5 className="card-title">
                    {price}</h5>

                <button className="btn btn-dark">Ver detalles</button>
            </div>
            <div class="card-footer text-center">
                <small class="text-muted">Stock disponible: {stock}</small>
            </div>
        </div>
    )
}

export default Item
