import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import ItemListContainer from "./containers/ItemListContainer";
import NavBar from "./components/NavBar";
import ItemDetailContainer from "./containers/ItemDetailContainer";
import CartContainer from "./containers/CartContainer";
import CartContextProvider from "./context/CartContext"
import Checkout from "./components/Checkout";

function App() {
  return (
    <CartContextProvider>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" render={() => <ItemListContainer greeting="Bienvenidos a la tienda" />}/>
          <Route path="/category/:categoryId">
            <ItemListContainer greeting="Bienvenidos a la tienda"/>
          </Route>
          <Route path="/item/:id"><ItemDetailContainer /></Route>
          <Route path="/cart"><CartContainer /></Route>
          <Route path="/checkout"><Checkout/></Route>

        </Switch>        
      </Router>
    </CartContextProvider>
  );
}

export default App;
