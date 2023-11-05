/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useLocation } from "react-router-dom"
import Footer from "../component/Footer"
import Navbar from "../component/Navbar"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext"
import Homepost from "../component/Homepost"
import Loader from "../component/Loader"
import axios from "axios"
import { URL } from "../../url"

 

const Myblog = () => {
  const {search}=useLocation()
  // console.log(search)
  const [posts,setPosts]=useState([])
  const [noResults,setNoResults]=useState(false)
  const [loader,setLoader]=useState(false)
  const {user}=useContext(UserContext)
  // console.log(user)
  const fetchpost=async()=>{
    setLoader(true)
    try {
      const res=await axios.get(URL+"/api/posts/users/"+user._id)
    setPosts(res.data)
      setLoader(false)
      if(res.data.length===0){
        setNoResults(true);
      }else{
        setNoResults(false)
      }
    } catch (error) {
      console.log(error)
      setLoader(true)
    }
  }
  useEffect(()=>{
    fetchpost()
  },[search])

  return (
    <>
    <Navbar/>
    <div className="myblog">
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

export default Myblog