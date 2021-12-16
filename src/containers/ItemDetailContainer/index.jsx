import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import ItemDetail from '../../components/ItemDetail'
import Loader from '../../components/Loader';
import {getProduct} from './services';


const ItemDetailContainer = () => {
    const {id} = useParams();

    const [item, setItem] = useState({});
    const [loadingItem, setLoadingItem] = useState(false);

    const getProductDetail = () => {
        setLoadingItem(true)
        getProduct(id).then(resp => setItem(resp)).catch(() => {}).finally(() => setLoadingItem(false))
    }

    useEffect(() => {
        getProductDetail()
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
