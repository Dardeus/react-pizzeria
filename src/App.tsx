import './scss/app.scss'
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import {Route, Routes} from "react-router-dom";
import Cart from "./pages/Cart";

const App = () => {
  return (
    <div className="wrapper">
      <Header/>
      <div className="content">
        <Routes>
          <Route path='/react-pizzeria/' element={<Home/>}/>
          <Route path='/react-pizzeria/cart' element={<Cart/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
