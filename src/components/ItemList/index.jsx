import React from 'react'
import Item from '../Item'

const ItemList = ({items}) => {
    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                {  items.map(item => <div className="col-auto mb-4"><Item key={item.id} item={item} /></div>)}
            </div>
        </div>
    )
}

export default ItemList
