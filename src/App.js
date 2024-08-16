import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, NavigationType } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import HomePage from './pages/HomePage';
import Products from './pages/Products';
import NewProduct from './pages/products/NewProduct';
import UpdateProduct from './pages/UpdateProduct';

function App({ element: Component, ...rest }) {
  const isLoggedIn = !!localStorage.getItem('token');
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path='/' element={<Login />} />
          <Route path='/home' {...rest} element={isLoggedIn ? <HomePage/> : <Navigate to="/"/>}/>
          <Route path='/products' {...rest} element={isLoggedIn ? <Products/> : <Navigate to="/"/>}/>
          <Route path='/products/new' {...rest} element={isLoggedIn ? <NewProduct/> : <Navigate to="/"/>}/>
          <Route path='/edit-product/:id' {...rest} element={isLoggedIn ? <UpdateProduct/> : <Navigate to="/"/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;