/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { BiEdit } from "react-icons/bi"
import { MdDelete } from "react-icons/md"
import './style.scss'
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import axios from "axios"
import { URL } from "../../url"
// eslint-disable-next-line react/prop-types
const Comment = ({c}) => {
  const {user}=useContext(UserContext)
  const deleteComment=async(id)=>{
    try{
      await axios.delete(URL+"/api/coments/"+id,{withCredentials:true})
      window.location.reload(true)
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <>
    <div className="items">
        <div className="item">
            <h3>@{c.author}</h3>
            <div className="datebox">
            
              <div className="date">
                <p>{new Date(c.updatedAt).toString().slice(0,15)}</p>
                <p>{new Date(c.updatedAt).toString().slice(16,24)}</p>
              </div>
              {user?._id==c?.userId?
                <div className="delete">
                <p onClick={()=>deleteComment(c._id)}><MdDelete/></p>
                 
            </div>:""}
            </div>
            
            
        </div>
        <p className="desc">{c.comment}</p>
    </div>
    </>
    
  )
}

export default Comment