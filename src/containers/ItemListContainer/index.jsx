import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import ItemList from '../../components/ItemList';
import Loader from '../../components/Loader';
import {getProducts} from './services';


const ItemListContainer = () => {

    const {categoryId} = useParams();

    const [items, setItems] = useState([]);

    const [loading, setLoading] = useState(false);

    const getProductsCatalog = () => {
        setLoading(true)
        getProducts(categoryId).then(resp => setItems(resp)).catch(() => {}).finally(() => setLoading(false))
    }

    useEffect(() => {
        getProductsCatalog()
    }, [categoryId])

    return (
        <div className="mt-5">
            {
            !loading ? <ItemList items={items}/> : <Loader/>
        } </div>
    )
}

export default ItemListContainer
