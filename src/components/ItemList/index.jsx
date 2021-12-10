import React from 'react'
import Item from '../Item'
import Loader from '../Loader'

const ItemList = ({items}) => {
    return items.length > 0 ? (
        <div className="container">
            <div className="row d-flex justify-content-md-start justify-content-center">
                {  items.map(item => <div key={item.id} className=" col-lg-4 col-md-6 col-sm-12 mb-4"><Item item={item} /></div>)}
            </div>
        </div>
    ): <Loader/>
}

export default ItemList
