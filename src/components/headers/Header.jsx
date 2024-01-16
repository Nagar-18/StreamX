import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./header.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
   


    useEffect(()=>{
      
        window.scrollTo(0,0);
    },[location])
 

    const handleNavbar=()=>{
        // console.log(window.scrollY)
        if(window.scrollY>200)
        {
            if(window.scrollY>lastScrollY&&!mobileMenu)
            {
                setShow("hide");
            }
            else
            setShow("show")
        }
        else
        {
            setShow("top")
          
        }
          setLastScrollY(window.scrollY)
    }
    useEffect(()=>{
        window.addEventListener("scroll",handleNavbar)
        return()=>  window.removeEventListener("scroll",handleNavbar) 
    },[lastScrollY])

    const openMobileMenu=()=>{
        setMobileMenu(true);
        setShowSearch(false);

    }
     const openSearchMenu=()=>{
        setMobileMenu(false);
        setShowSearch(true);

    }
    
 const searchQueryHandler=(e)=>{
  if(e.key=="Enter"&&query.length>0){
    navigate(`/search/${query}`);

    setTimeout(() => {
        setShowSearch(false);
    }, 1000);

  }
 }
 const navigationHandler=(slug)=>{
    if(slug==="movie")
    navigate("/explore/movie")
    else
    navigate("/explore/tv")
 setMobileMenu(false)

 }
   
    return (
       <header className={`header ${mobileMenu?'mobileView':''} ${show}`}>
        <ContentWrapper>
            <img onClick={()=>navigate('/')} src={logo} alt="#" />
            <ul className="menuItems">
                <li className="menuItem" onClick={()=>navigationHandler("movie")}>Movies</li>
                <li className="menuItem" onClick={()=>navigationHandler("tv")}>Tv-show</li>
                <li className="menuItem"><HiOutlineSearch onClick={openSearchMenu}/></li>
            </ul>
            <div className="mobileMenuItems">
                <HiOutlineSearch onClick={openSearchMenu}/>
                {
                    mobileMenu?(<VscChromeClose onClick={()=>setMobileMenu(false)}/>):(
                        <SlMenu onClick={openMobileMenu}/>
                    )
                }
            </div>
        </ContentWrapper>
        {showSearch&&<div className="searchBar">
            <ContentWrapper>
                 <div className='searchInput'>
                 <input onKeyUp={searchQueryHandler} onChange={(e)=>setQuery(e.target.value)}  type='text' placeholder='search your movie here' />
                  
                    <VscChromeClose onClick={()=>setShowSearch(false)}/>
                
              </div>
            </ContentWrapper>
         </div>}
         
       </header>
    );
};

export default Header;
