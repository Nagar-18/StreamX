import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchingTab from '../../../components/switchingTabs/SwitchingTab'
import useFetch from '../../../hook/useFetch';
import Carsouel from '../../../components/carsousel/Carsouel';

const Trending = () => {

  const [endPoint,setEndPoint]=useState("day");

  const {data,loading}=useFetch(`/trending/all/${endPoint}`);
  console.log(data);
    const onTabChange=(tab,index)=>{
      setEndPoint(tab);
    };
  return (
    <div className="carouselSection">
    <ContentWrapper>
        <span className='carouselTitle'>Trending</span>
        <SwitchingTab data={["day","week"]} onTabChange={onTabChange}/>
      
      
    </ContentWrapper>
    <Carsouel data={data?.results} loading={loading}/></div>
  )
}

export default Trending
