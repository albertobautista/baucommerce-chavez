import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import ItemListContainer from "./containers/ItemListContainer";
import NavBar from "./components/NavBar";
import ItemDetailContainer from "./containers/ItemDetailContainer";
import CartContainer from "./containers/CartContainer";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" render={() => <ItemListContainer greeting="Bienvenidos a la tienda" />}/>
        <Route path="/category/:categoryId">
          <ItemListContainer greeting="Bienvenidos a la tienda"/>
        </Route>
        <Route path="/item/:id"><ItemDetailContainer /></Route>
        <Route path="/cart"><CartContainer /></Route>

      </Switch>
      
    </Router>
  );
}

export default App;
