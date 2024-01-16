import { useEffect, useState } from 'react'
import { getApiConfiguration,getGenres } from './store/homeSlice.js';
import {fetchDataFromAPI}from "./utiils/api.js"
import { BrowserRouter, createBrowserRouter,Outlet,Route,RouterProvider, Routes } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux'

import Header from './components/headers/Header.jsx';
import Footer from './components/footer/Footer.jsx';

import NotFound from './pages/404/NotFound.jsx';
import Details from './pages/details/Details.jsx';
import Explore from './pages/explore/Explore.jsx';
import Home from './pages/home/Home.jsx';
import SearchResult from './pages/searchResult/SearchResult.jsx';



function App() {

  const dispatch=useDispatch();
   
  const ul=useSelector((state=>state.home.url));
  
useEffect(()=>{
  getData()
  getGenresCall()
  },[])

  const getData=()=>{
    
    fetchDataFromAPI('/configuration').then((res)=>{
      const url={backdrop:res.images.secure_base_url+"original",
    poster:res.images.secure_base_url+"original",
        profile:res.images.secure_base_url+"original"}
       dispatch(getApiConfiguration(url))
     
}).catch((err)=>
console.error(err))

  }

  const getGenresCall=async()=>{
    const promises=[];
    const allGenres={};
    const endPoints=["tv","movie"];

    endPoints.forEach((url)=>{
         promises.push(fetchDataFromAPI(`/genre/${url}/list`))
    }
  )
    const data= await Promise.all(promises);
    data?.map(({genres})=>{
      return genres?.map((item)=>(allGenres[item.id]=item))

    })
    dispatch(getGenres(allGenres))
    console.log(allGenres);
    
  }


  return (
  <BrowserRouter>
  <Header/>
     <Routes>
     <Route path='/' element={<Home/>}/>
      <Route path='/:mediaType/:id' element={<Details/>}/>
      <Route  path='/search/:query' element={<SearchResult/>}/>
      <Route path='/explore/:mediaType' element={<Explore/>}/>
      <Route path='*' element={<NotFound/>}/>
     </Routes>
     <Footer/>
  </BrowserRouter>
  )
}

export default App
