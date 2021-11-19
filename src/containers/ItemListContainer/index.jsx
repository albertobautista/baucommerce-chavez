import React from 'react';
import ItemCount from '../../components/ItemCount';

const ItemListContainer = ({greeting}) => {

    const onAdd = (counter) => {
        if (counter === 0) {
            alert("Debes ingresar al menos un producto")
        } else {
            alert(`Has ingresado ${counter} productos`)
        }
    }
    return (
        <div>
            <h1>{greeting}</h1>
            <ItemCount stock={5}
                initial={1}
                onAdd={onAdd}/>
        </div>
    )
}

export default ItemListContainer
