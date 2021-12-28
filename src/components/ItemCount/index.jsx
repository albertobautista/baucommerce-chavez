import {useState} from 'react';
import './styles.css';

const ItemCount = ({stock, initial, onAdd}) => {
    const [counter, setCounter] = useState(initial);

    const handleIncrementCounter = () => {
        if (counter < stock) {
            setCounter(counter + 1)
        }
    }

    const handleDecrementCounter = () => {
        if (counter > 0) {
            setCounter(counter - 1)
        }
    }
    return (
        <div className="widthContainer">
            <div className="quantity buttons_added button_add_container">
                <div className="row">
                    <div className="col" align="center">
                        <button onClick={handleDecrementCounter}
                            className="minus text-left">-</button>
                    </div>
                    <div className="col" align="center">
                        <input type="number" className="input-text qty text" defaultValue={counter}
                            value={counter}/>

                    </div>
                    <div className="col" align="center">
                        <button type="button" value="+" className="plus"
                            onClick={handleIncrementCounter}>+</button>

                    </div>
                </div>
            </div>
            <div className="button_add_container">
                <button className="button_add btn btn-outline-primary"
                    onClick={
                        () => onAdd(counter)
                    }
                    disabled={
                        stock === 0
                }>Agregar al carrito</button>
            </div>
        </div>
    )
}

export default ItemCount
