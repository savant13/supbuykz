
import React from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import Footer from './components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';
import Home from './pages/HomePage.js';
import LoginPage from './pages/LoginPage.js';
import Register from './pages/register';
import Profile from './pages/profile';
import AddProduct from './pages/add_product';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

import CatalogPage from './pages/CatalogPage';
import NotificationPage from './pages/notificationPage';
import profile_page from './pages/profile';
import AgreementPage from './pages/agreement';

function App() {
    return <div className="App">
    <Router>
      <AuthProvider>
        <Navbar/>
        <Route component={Home} path="/" exact/>
        <Route component={LoginPage} path="/login" />
        <Route component = {Register} path='/register'/>
        <PrivateRoute component = {AddProduct} path='/add_product'/>
        <PrivateRoute component = {NotificationPage} path='/notification'/>
        <PrivateRoute component = {profile_page} path='/profile-page'/>
        <PrivateRoute component = {AgreementPage} path='/agreement'/>
        <PrivateRoute component = {CatalogPage} path = '/catalog'/>
          

        <Footer/>
      </AuthProvider>
    </Router>
    {/* <AgreementPage/> */}
  </div>
}

export default App;
