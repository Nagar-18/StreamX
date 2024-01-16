import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchingTab from '../../../components/switchingTabs/SwitchingTab'
import useFetch from '../../../hook/useFetch';
import Carsouel from '../../../components/carsousel/Carsouel';

const TopRated = () => {
 
  const [endPoint,setEndPoint]=useState("movie");

  const {data,loading}=useFetch(`/${endPoint}/top_rated`);
  console.log(data);
    const onTabChange=(tab,index)=>{
      setEndPoint(tab==="Movies"?"movie":"tv");
    };
  return (
    <div className="carouselSection">
    <ContentWrapper>
        <span className='carouselTitle'>Top Rated</span>
        <SwitchingTab data={["Movies","Tv Shows"]} onTabChange={onTabChange}/>
      
      
    </ContentWrapper>
    <Carsouel data={data?.results} loading={loading} endPoint={endPoint}/></div>
  )
}


export default TopRated
