import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Pages/Login/Login'
import Home from './Pages/Home/Home'
import Category from './Componenets/Category/Category'
import City from './Componenets/City/City'
import Cars from './Componenets/Cars/Cars'
import Location from './Componenets/Location/Location'
import Model from './Componenets/Model/Model'
import Brand from './Componenets/Brand/Brand'

function App() {


  return (
    <>
      <Routes path='/'>
        <Route index element={<Login />} />
        <Route path="home" element={<Home />}>
          <Route path='/home/category' element={<Category/>}/>
          <Route path='/home/city' element={<City/>}/>
          <Route path='/home/cars' element={<Cars/>}/>
          <Route path='/home/loc' element={<Location/>}/>
          <Route path='/home/model' element={<Model/>}/>
          <Route path='/home/brand' element={<Brand/>}/>
          
        </Route>
      </Routes>
    </>
  )
}

export default App
