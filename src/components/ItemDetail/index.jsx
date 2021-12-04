import React, {useState, useContext} from 'react'
import {Link} from 'react-router-dom';
import {CartContext} from "../../context/CartContext"
import ItemCount from '../ItemCount';
import Loader from '../Loader';
import './styles.css'

const ItemDetail = ({item}) => {
    const {addItem} = useContext(CartContext)

    const {
        title,
        description,
        price,
        pictureUrl,
        stock
    } = item;

    const [readyToPay, setReadyToPay] = useState(false);


    const onAdd = (quantity) => {
        if (quantity !== 0) {
            const itemToAdd = {
                ...item,
                quantity
            };
            alert(`Has ingresado ${quantity} productos`)
            setReadyToPay(true)
            addItem(itemToAdd)
        } else {
            alert("Debes ingresar al menos un producto")
        }
    }

    return(Object.keys(item).length !== 0 ? (<div className="container">
        <div className="product-content product-wrap clearfix product-deatil">
            <div className="row">
                <div className="col-md-5 col-sm-12 col-xs-12">
                    <div className="product-image">
                        <div id="myCarousel-2" className="carousel slide">
                            <ol className="carousel-indicators">
                                <li data-target="#myCarousel-2" data-slide-to="0" className=""></li>
                                <li data-target="#myCarousel-2" data-slide-to="1" className="active"></li>
                                <li data-target="#myCarousel-2" data-slide-to="2" className=""></li>
                            </ol>
                            <div className="carousel-inner">
                                <div className="item active">
                                    <img src={pictureUrl}
                                        className="img-responsive"
                                        alt=""
                                        style={
                                            {width: "100%"}
                                        }/>
                                </div>

                            </div>
                            <a className="left carousel-control" href="#myCarousel-2" data-slide="prev">
                                <span className="glyphicon glyphicon-chevron-left"></span>
                            </a>
                            <a className="right carousel-control" href="#myCarousel-2" data-slide="next">
                                <span className="glyphicon glyphicon-chevron-right"></span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 col-md-offset-1 col-sm-12 col-xs-12">
                    <h2 className="name"> {title} </h2>
                    <hr/>
                    <h3 className="price-container">
                        Precio: {price} </h3>

                    <hr/>
                    <div className="description description-tabs">
                        <p> {description}</p>
                    </div>
                    <hr/>
                    <div className="row mt-1">
                        <div className="col-sm-12 col-md-6 col-lg-6"> {
                            !readyToPay ? (<ItemCount stock={stock}
                                initial={1}
                                onAdd={onAdd}/>) : (<Link to="/cart" className="btn btn-xs btn-outline-success ">Terminar compra</Link>)
                        } </div>
                    </div>
                </div>
            </div>
        </div>
    </div>) : <Loader/>)
}

export default ItemDetail
