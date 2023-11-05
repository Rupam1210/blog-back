/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react"
import Footer from "../component/Footer"
import Navbar from "../component/Navbar"
import Profilepost from "../component/Profilepost"
import { UserContext } from "../context/UserContext"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { URL } from "../../url"
import toast from "react-hot-toast"

 

const Profile = () => {
    const param=useParams().id
    const [username,setusername]=useState("")
    const[email,setemail]=useState("")
    const {user,setUser}=useContext(UserContext);
    const [posts,setPosts]=useState([])
    
    const navigate= useNavigate()

    const fetchprofile=async()=>{
        try {
            const res=await axios.get(URL+"/api/users/"+user._id)
            setusername(res.data.username)
            setemail(res.data.email)
            
        } catch (error) {
            console.log(error)
        }
    }
    const handledelete=async()=>{
        try {
            const res=await axios.delete(URL+"/api/users/"+user._id,{withCredentials:true})
            setUser(null)
            navigate("/")
            toast.success("user is deleted succesfull")
        } catch (error) {
            console.log(error)
        }
    }
    //update
    const handleupdate=async()=>{
        try {
            const res=await axios.put(URL+"/api/users/"+user._id,{username,email},{withCredentials:true})
            toast.success("user is updated ")
           
        } catch (error) {
            console.log(error)
        }
    }

    const fetchpost=async()=>{
         
        try {
            const res=await axios.get(URL+"/api/posts/users/"+user._id)
            setPosts(res.data)
            
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchprofile()
    },[param])
    useEffect(()=>{
        fetchpost()
    },[param])
  return (
    <>
    <Navbar/>
    <div className="profile">
        
        <div className="container">
            <div className="inputfield">
                <h1>Profile</h1>
                <input type="text" placeholder="Username" value={username} onChange={(e)=>setusername(e.target.value)}/>
                <input type="email" placeholder="Your email" value={email} onChange={(e)=>setemail(e.target.value)}/>
                <div className="buttons">
                    <button onClick={handleupdate}>Update</button>
                    <button onClick={handledelete}>Delete</button>
                </div>
                
            </div>
        </div>
        <div className="post">
            <h1 className="title">Your post:</h1>
            {posts?.map((p)=>(
                <Profilepost key={p._id} p={p}/>
            ))}
            
            
        </div>
    </div>
    <Footer/>
    </>
    
  )
}

export default Profile