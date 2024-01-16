import React, { useEffect, useState } from 'react'
import "./heroBanner.scss"
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hook/useFetch';
import { useSelector } from 'react-redux';
import Img from '../../../components/lazyLoadImage/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
const HeroBanner = () => {
    const [query,setQuery]=useState("");
    const [background,setBackground]=useState("");
    const navigate=useNavigate();
const {url}=useSelector((state)=>state.home)
    const {data,loading}=useFetch("/movie/popular")
    useEffect(()=>{
      const bg=url.backdrop+data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path;
      setBackground(bg);
      
    //   console.log(bg)
    },[loading,data])

 const searchQueryHandler=(e)=>{
  if(e.key=="Enter"&&query.length>0){
    navigate(`/search/${query}`);

  }
 }
  return (
    <div className='heroBanner'>
       {<div className="backdrop-img">
         <Img src={background}/>
        </div>}
        <div className="opacity-layer"></div>
        <ContentWrapper>
            <div className='heroBannerContent'>
                <span className='title'>Welcome</span>
                <span className='subTitle'>Millions of Tv show and movies are dicoverd by people</span>
                <div className='searchInput'>
                 <input onKeyUp={searchQueryHandler} onChange={(e)=>setQuery(e.target.value)}  type='text' placeholder='search your movie here' />
                 <button>search</button></div>
                
            </div>
         </ContentWrapper>
      
    </div>
  )
}

export default HeroBanner
