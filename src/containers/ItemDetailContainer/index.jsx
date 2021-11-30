import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import ItemDetail from '../../components/ItemDetail'
import Loader from '../../components/Loader';
import productsItems from '../ItemListContainer/data';


const ItemDetailContainer = () => {
    const {id} = useParams();

    const [item, setItem] = useState({});
    const [loadingItem, setLoadingItem] = useState(false);

    // Comment to update when use an Api request
    // const getItem = () => {
    //     const url = 'https://gorest.co.in/public/v1/posts'
    //     setLoadingItem(true)
    //     fetch(url).then(res => res.json())
    //     .then(response => setItem(product))
    //     .catch(error => console.log('Error: ', error))
    //     .finally(setLoadingItem(false))

    // }


    const getItem = () => {
        setLoadingItem(true)
        const filteredItem = productsItems.find(product => product.id === parseInt(id));
        setLoadingItem(false);
        setItem(filteredItem);
    }

    useEffect(() => {
        getItem()

    }, [id])
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
