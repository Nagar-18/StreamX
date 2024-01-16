import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
// import CircleRating from "../circleRating/CircleRating";
// import Genres from "../genres/Genres";

import "./style.scss";
import CircleRating from "../circulurRating/CircleRating";
import Genres from "../genres/Genres";


const Carsouel = ({data,loading,endPoint,title}) => {
const {url}=useSelector((state)=>state.home);
const navigate=useNavigate();
const carsoueContainer=useRef();
const navigation=(dir)=>{

    const container=carsoueContainer.current;
     
    const ScrollAmount=dir==="left"?
        container.scrollLeft-(container.offsetWidth+20)
    : container.scrollLeft+(container.offsetWidth+20)

    console.log(ScrollAmount)

     container.scrollTo({left:ScrollAmount,
    behavior:"smooth"})
}
 


const skItem=()=>{
    return(
        <div className="skeltonItem">
            <div className="posterBlock skeleton"></div>
            <div className="textBlock" >
                <div className="title skeleton"></div>
                <div className="subTitle skeleton"></div>
v
            </div>
        </div>
    )
}
  return (
    <div className="carousel">
            <ContentWrapper>
               
                { <div className="carouselTitle">{title}</div>}
                <BsFillArrowLeftCircleFill
                    // style={{background:'white'}}
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRighttNav arrow"
                    onClick={() => navigation("right")}
                />
         {
            !loading?(
                <div className="carouselItems" ref={carsoueContainer}>
                    {
                        data?.map((item,key)=>{
                            const posterurl=item.poster_path?url.poster+item.poster_path:PosterFallback
                            return(<div key={key} className="carouselItem"  onClick={()=>navigate(`/${item.media_type || endPoint}/${item.id}`)} >

                                <div className="posterBlock">
                                    <Img src={posterurl}/>
                                    <CircleRating rating={item.vote_average.toFixed(1)}/>
                                      <Genres
                                            data={item.genre_ids.slice(0, 2)}
                                        />
                                </div>
                                <div className="textBlock">
                                    <span className="title">{item.title||item.name}</span>
                                    <span className="date">{
                                        dayjs(item.release_date|| item.first_air_date).format("MMM D, YYYY")
                                    }</span>
                                </div>
                                 
                            </div>)
                            
                    
                })
                    }
                </div>
            ):(<div className="loadingSkeleton">{skItem}
            {skItem}
            {skItem}
            {skItem}
            {skItem}
            {skItem}
            {skItem}
            </div>)
         }

</ContentWrapper>
     </div>           
  )
}

export default Carsouel
