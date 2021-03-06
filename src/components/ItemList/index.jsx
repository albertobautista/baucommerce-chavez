import React from 'react'
import Item from '../Item'
import NoData from '../NoData'

const ItemList = ({items}) => {
    return items.length > 0 ? (
        <div className="container animate__animated animate__fadeIn">
            <div className="row d-flex justify-content-md-start justify-content-center">
                {
                items.map(item => <div key={
                        item.id
                    }
                    className="col-lg-3 col-md-6 col-sm-12 mb-4"><Item item={item}/></div>)
            } </div>
        </div>
    ) : <NoData message="No hay productos"/>
}

export default ItemList
