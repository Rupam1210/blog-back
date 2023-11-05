/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react"
import Comment from "../component/Comment"
import Footer from "../component/Footer"
import Navbar from "../component/Navbar"
import {BiEdit} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'
import axios from "axios"
import { IF, URL } from "../../url"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import Loader from "../component/Loader"
import toast from "react-hot-toast"


const Postdetails = () => {
  const postId=useParams().id
  const [post,setpost]=useState([])
  const {user}=useContext(UserContext)
  const [comments,setComments]=useState([])
  const [comment,setComment]=useState("")
  const [loader,setLoader]=useState(false)
  const navigate=useNavigate()
  
  const handledelete=async()=>{
    try {
      const res =await axios.delete(URL+"/api/posts/"+postId,{withCredentials:true})
      toast.success(res.data)
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  
  const fetchpost=async()=>{
    setLoader(true)
    try {
     
      const res=await axios.get(URL+"/api/posts/"+postId)
      setpost(res.data)
      setLoader(false)
    } catch (error) {
      console.log(error)
      setLoader(true)
    }
  }
  useEffect(()=>{
    fetchpost()
  },[postId])

const fetchPostComments=async()=>{
  setLoader(true)
  try {
    const res=await axios.get(URL+"/api/coments/post/"+postId)
    setComments(res.data)
    

    setLoader(false)
  } catch (error) {
    console.log(error)
  }
}

  const postcomment=async(e)=>{
    e.preventDefault();
    try {
      const res=await axios.post(URL+"/api/coments/create",{
        comment:comment,author:user.username,postId:postId,userId:user._id},
        {withCredentials:true})
 
        window.location.reload(true)
    } catch (error) {
      toast.error("Unable to add ")
      console.log(error)
    }
  }
  useEffect(()=>{
    fetchPostComments()
 
  },[postId])
  return (
    <div>
        <Navbar/>
        {loader?(<div style={{height:"80vh" ,display:"flex" ,justifyContent:"center" ,alignItems:"center" }}><Loader/> </div>):<div className="block">
            <div className="box">
                <h1 style={{fontWeight:"bold"}}>{post.title}</h1>
                {user?._id===post?.userId && <div className="icons">
                    <p style={{cursor:"pointer"}} onClick={()=>navigate("/edit/"+postId)}><BiEdit/></p>
                    <p style={{cursor:"pointer"}} onClick={handledelete}><MdDelete/></p>
                </div>} 
            </div>
            <div className="textbox">
                <p>@{post.username}</p>
                <div className="date">
                    <p>{new Date(post.updatedAt).toString().slice(0,15)}</p>
                    <p>{new Date(post.updatedAt).toString().slice(16,24)}</p>
                </div>          
            </div>
            <img src={IF+post.photo}  />
          <p className="desc"> {post.desc}

          </p>
          <div className="category">
            <p>Category:</p>
            <div className="cbox">
                
              {post.categories?.map((i,index)=>(
                <div key={index} className="item">{i}</div>
              ))}
            </div>
          </div>
          {/* write a comment */}
          <div className="comments">
            <h3>Comments:</h3>
            {comments?.map((c)=>(
              <Comment key={c._id} c={c} post={post}/>
            ))}
            
          </div>
          <div className="commentitem">
            <input type="text"  placeholder="write a comment" onChange={(e)=>setComment(e.target.value)}/>
            <button onClick={postcomment}>Add <br/> Coment</button>
          </div>
        </div>}

        <Footer/>
    </div>
  )
}

export default Postdetails