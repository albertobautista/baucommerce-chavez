import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import ItemCount from '../../components/ItemCount';
import ItemList from '../../components/ItemList';
import Loader from '../../components/Loader';
import productsItems from './data';


const ItemListContainer = ({greeting}) => {

    const  {categoryId}  = useParams();

    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);

    const [loadingItems, setLoadingItems] = useState(false);

    const onAdd = (counter) => {
        if (counter === 0) {
            alert("Debes ingresar al menos un producto")
        } else {
            alert(`Has ingresado ${counter} productos`)
        }
    }
    
    const getProducts = () => {
        const url = 'https://gorest.co.in/public/v1/posts'
            setLoadingItems(true)
            fetch(url).then(res => res.json())
            .then(response => {setItems(productsItems); setFilteredItems(productsItems);})
            .catch(error => console.log('Error: ', error))
            .finally(setLoadingItems(false))
    }

    const getProductsByCategory = () => {
       let productsAux = [...items]

       if(categoryId) productsAux = productsAux.filter(product => product.category === parseInt(categoryId))
       
       setFilteredItems(productsAux)

    }

    useEffect(() => {
        getProducts()
    }, [])

    useEffect(() => {  
        getProductsByCategory()
    }, [categoryId])

    return (
        <div style={{marginTop:"80px"}}>
            <h1  className="text-center">{greeting}</h1>
            {/* <ItemCount stock={5}
                initial={1}
                onAdd={onAdd}/> */}
            {
                !loadingItems ? <ItemList items={filteredItems}/> : <Loader/>
            }
        </div>
    )
}

export default ItemListContainer
