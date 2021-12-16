import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import ItemList from '../../components/ItemList';
import Loader from '../../components/Loader';
import {getProducts} from './services';


const ItemListContainer = ({greeting}) => {

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
        <div style={
            {marginTop: "80px"}
        }>
            <h1 className="text-center">
                {greeting}</h1>
            {
            !loading ? <ItemList items={items}/> : <Loader/>
        } </div>
    )
}

export default ItemListContainer
