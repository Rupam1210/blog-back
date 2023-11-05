/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios"
import Footer from "../component/Footer"
import Homepost from "../component/Homepost"
import Navbar from "../component/Navbar"
import { URL } from "../../url"
import { useEffect, useState } from "react"
import { useContext } from "react"
import {  Link, useLocation } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import Loader from "../component/Loader"


const Home = () => {
  const {search}=useLocation();
  const [posts,setPosts]=useState([])
  const {user}=useContext(UserContext)
  const [noResults,setNoResults]=useState(false)
  const [loader,setLoader]=useState(false)
const fetchpost=async()=>{
  setLoader(true)
  try {
    const res=await axios.get(URL+"/api/posts/"+search)
  
    setPosts(res.data)
    if(res.data.length===0){
      setNoResults(true)
    }else{
      setNoResults(false)
    }
    setLoader(false)

  } catch (error) {
    console.log(error)
    setLoader(true)
  }
}
useEffect(()=>{
   fetchpost();
},[search])

  return (
    <>
    <Navbar/>
    <div className="home">
      {loader?<div style={{height:"80vh" ,display:"flex" ,justifyContent:"center" ,alignItems:"center" }}><Loader/> </div>:!noResults?(posts?.map((post)=>(
        <>
        <Link key={post._id} to={user?`/posts/post/${post._id}`:"/login"}>
          <Homepost  post={post}/>
        </Link>
        </>
      ))):(
        <h3 style={{textAlign:'center',fontWeight:"bold",marginTop:"30px"}}>No Post avaliable</h3>
      )}
      
    </div>
    <Footer/>
    </>
  )
}

export default Home