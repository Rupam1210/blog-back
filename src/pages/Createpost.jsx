/* eslint-disable no-unused-vars */
import { useContext, useState } from "react"
import Footer from "../component/Footer"
import Navbar from "../component/Navbar"
import {ImCross} from 'react-icons/im'
import { UserContext } from "../context/UserContext"
import axios from "axios"
import { URL } from "../../url"
import { useNavigate } from "react-router-dom"



 

const Createpost = () => {
    const [title,setTitle]=useState("")
    const [desc,setDesc]=useState("")
    const [file,setFile]=useState(null) 
    const {user}=useContext(UserContext)
    const navigate=useNavigate()


    const [cat,setcat]=useState("");
    const [cats,setcats]=useState([]);
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
const handlecrate=async(e)=>{
  e.preventDefault();
  const post={
    title,
    desc,
    username:user.username,
    userId:user._id,
    categories:cats
  }
  //img upload
  if(file){
    const datafile=new FormData()
    const filename=Date.now()+file.name
    datafile.append("img",filename)
    datafile.append("file",file)
    post.photo=filename
    try {
        const imgupload=await axios.post(URL+"/api/upload",datafile)
        // console.log(imgupload.data)
     
    } catch (error) {
        console.log(error)
    }
  }
  //post upload
   
  
  try {
    const res=await axios.post(URL+"/api/posts/create",post,{withCredentials:true})
    // console.log(res.data)
    navigate("/posts/post/"+res.data._id)

  } catch (error) {
    console.log(error)
  }

    
}

  return (
    <>
    <Navbar/>
    <div className="post">
        <h1>Create a post</h1>
        <form>
            <input type="text" placeholder="Enter the post title" onChange={(e)=>setTitle(e.target.value)} />
            <input type="file" onChange={(e)=>setFile(e.target.files[0])}  />
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
            <textarea rows={15} cols={30} placeholder="Enter post Description" onChange={(e)=>setDesc(e.target.value)}/>
            <button onClick={handlecrate}>Create</button>
        </form>
    </div>
    <Footer/>

    </>
   
  )
}

export default Createpost