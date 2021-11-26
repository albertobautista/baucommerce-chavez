import React, {useEffect, useState} from 'react';
import ItemDetail from '../../components/ItemDetail'
import Loader from '../../components/Loader';
import product from './data';


const ItemDetailContainer = () => {

    const [item, setItem] = useState({});
    const [loadingItem, setLoadingItem] = useState(false);


    const getItem = () => {
        const url = 'https://gorest.co.in/public/v1/posts'
        setLoadingItem(true)
        fetch(url).then(res => res.json())
        .then(response => setItem(product))
        .catch(error => console.log('Error: ', error))
        .finally(setLoadingItem(false))

    }

    useEffect(() => {
        getItem()

    }, [])
    return (
        <div style={
            {marginTop: "80px"}
        }>
            {
            !loadingItem ? <ItemDetail item={item}/> : <Loader/>
        } </div>
    )
}

export default ItemDetailContainer
