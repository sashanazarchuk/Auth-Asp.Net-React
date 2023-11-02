import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Auth/Login';
import Registration from './Auth/Register/Register';
import User from './Auth/User';
import NoMatch from './noMatch';
import DefaultHeader from './component/DefaultHeader';
import DefaultFooter from './component/DefaultFooter';
import ProductList from './ProductCart/ProductList';
import Cart from './ProductCart/Cart';
import SearchResult from './ProductCart/SearchResult';
import ProductPage from './ProductCart/ProductPage';



function App() {
  return (
    <>

      <DefaultHeader />
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="*" element={<NoMatch />} />
        <Route path="productlist" element={<ProductList />} />
        <Route path="cart" element={<Cart />} />
        <Route path="search-result" element={<SearchResult />} />
        <Route path="product/:id" element={<ProductPage />} />
      </Routes>
      <DefaultFooter />
    </>
  );
}

export default App;
