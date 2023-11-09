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
import CreateProduct from './Admin/CreateProduct';
import EditProduct from './Admin/EditProduct';



function App() {
  return (
    <>

      <DefaultHeader />
      <Routes>
        {/* 
        <Route path="/admin" element={<Sidebar />}>
          <Route path="create-product" element={<CreateProduct />} />
        </Route> */}


        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="*" element={<NoMatch />} />
        <Route path="productlist" element={<ProductList />} />
        <Route path="cart" element={<Cart />} />
        <Route path="search-result" element={<SearchResult />} />
        <Route path="product/:id" element={<ProductPage />} />

        <Route path="create-product" element={<CreateProduct />} />
        <Route path="edit-product/:id" element={<EditProduct />} />
      </Routes>
      <DefaultFooter />


    </>
  );
}

export default App;
