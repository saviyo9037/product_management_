import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import ProductList from './pages/ProductList'
import AddProduct from './pages/AddProduct'
import EditProduct from './pages/EditProduct'

import ProductF from './components/ProductF'

function App() {
  return (
   <BrowserRouter>
   <div className='flex'>
    
    <Sidebar/>
    <div className=' flex-1'>
    <Header/>

    <Routes>
      <Route  path='/'  element={<ProductList/>}/>
      <Route  path='/add'  element={<AddProduct/>}/>
<Route  path='/edit/:id'  element={<EditProduct/>}/>




    </Routes>
    </div>

    </div></BrowserRouter>
  )
}

export default App
