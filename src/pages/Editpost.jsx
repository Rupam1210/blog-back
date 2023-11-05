/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { ImCross } from "react-icons/im";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import toast from "react-hot-toast";
import axios from "axios";
import { URL } from "../../url";

 

const Editpost = () => {
    const postId=useParams().id
    const{user}=useContext(UserContext)
    const [title,setTitle]=useState("")
    const [desc,setDesc]=useState("")
    const [file,setFile]=useState(null)
  const [cat,setcat]=useState("");
  const [cats,setcats]=useState([]);
  const navigate=useNavigate();

const fetchpost=async()=>{
    try {
        const res=await axios.get(URL+"/api/posts/"+postId)
        setTitle(res.data.title)
        setDesc(res.data.desc)
        setFile(res.data.photo)
        setcats(res.data.categories)
    } catch (error) {
        toast.error("something went wrong")
    }
}
useEffect(()=>{
    fetchpost()
},[postId])

  const handleupdate=async(e)=>{
    e.preventDefault();
    const post={
        title,
        desc,
        username:user.username,
        userId:user._id,
        categories:cats
    }
    if(file){
        const data=new FormData()
        const filename=Date.now()+file.name
        data.append("img",filename)
        data.append("file",file)
        post.photo=filename
//img upload
        try {
            const imhUpload=await axios.post(URL+"/api/upload",data)
        } catch (error) {
            toast.error("Unable to upload")
        }
    }
    try {
        const res=await axios.put(URL+"/api/posts/"+postId,post,{withCredentials:true})
        toast.success(res.data.message)
        console.log(res)
        navigate("/posts/post/"+res.data.updatepost._id)
    } catch (error) {
        toast.error()
    }
  }

  const addcategory=()=>{
      let updatecat=[...cats]
       updatecat.push(cat)
       setcat("");
      setcats(updatecat)
  }
  const deletecategory=(i)=>{
      let updatecat=[...cats]
      updatecat.splice(i)
      setcats(updatecat)
  }
  return (
    <>
    <Navbar/>
    <div className="post">
        <h1>Update a post</h1>
        <form>
            <input type="text" placeholder="Enter the post title" value={title} onChange={(e)=>setTitle(e.target.value)} />
            <input type="file" onChange={(e)=>setFile(e.target.files[0])}    />
            <div className="container">
                <div className="add">
                    <input type="text" value={cat} onChange={(e)=>setcat(e.target.value)} placeholder="Enter post category" />
                    <div onClick={addcategory} className="button">Add</div>
                </div>
                <div className="categorynames">
                {cats?.map((c,i)=>(
                    <div key={i} className="item">
                        <p>{c}</p>
                        <p onClick={()=>deletecategory(i)}><ImCross/></p>
                    </div>
                 ))}   

                </div>
            </div>
            <textarea rows={15} cols={30} value={desc} placeholder="Enter post Description" onChange={(e)=>setDesc(e.target.value)} />
            <button onClick={handleupdate}>Update</button>
        </form>
    </div>
    <Footer/>

    </>
  )
}

export default Editpost