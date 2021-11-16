import ItemListContainer from "./containers/ItemListContainer";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <ItemListContainer greeting="Bienvenidos a la tienda" />
    </>
  );
}

export default App;
