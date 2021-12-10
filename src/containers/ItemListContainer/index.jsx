import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import ItemList from '../../components/ItemList';
import Loader from '../../components/Loader';
import productsItems from './data';
import {collection, getDocs, query, where} from "firebase/firestore/lite"
import {db} from "../../firebase/config"


const ItemListContainer = ({greeting}) => {

    const {categoryId} = useParams();

    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);

    const [loadingItems, setLoadingItems] = useState(false);

    const getProducts = () => {
        const url = 'https://gorest.co.in/public/v1/posts'
        setLoadingItems(true)
        fetch(url).then(res => res.json()).then(response => {
            setItems(productsItems);
            setFilteredItems(productsItems);
        }).catch(error => console.log('Error: ', error)).finally(setLoadingItems(false))
    }

    const getProductsByCategory = () => {
        let productsAux = [...items]

        if (categoryId) 
            productsAux = productsAux.filter(product => product.category === parseInt(categoryId))


        


        setFilteredItems(productsAux)

    }

    // useEffect(() => {
    //     getProducts()
    // }, [])

    useEffect(() => {
        setLoadingItems(true)
        const productosRef = collection(db, "products")
        console.log("categoryId", categoryId)

        const q = categoryId ?  query(productosRef, where("category" ,"==", Number(categoryId))) : productosRef
        console.log("QQQQQQQQQQQ", q)

        getDocs(q).then(response => {
            const items = response.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            console.log("ITEMS", items)
            setFilteredItems(items)
        }).finally(() => {
            setLoadingItems(false)
        })
        // getProductsByCategory()
    }, [categoryId])

    return (<div style={
        {marginTop: "80px"}
    }>
        <h1 className="text-center"> {greeting}</h1>
        {
        !loadingItems ? <ItemList items={filteredItems}/> : <Loader/>
    } </div>)
}

export default ItemListContainer
