// import { useContext, useState } from "react"
// import { Link, useLocation, useNavigate } from "react-router-dom"
import {BsSearch} from 'react-icons/bs'
import {FaBars} from 'react-icons/fa'
import Menu from "./Menu.jsx"
// import { UserContext } from "../context/UserContext.jsx"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext.jsx'
 

 

const Navbar = () => {

  const{user}=useContext(UserContext)
   
  const[menu,setmenu]=useState("")
  const[prompt,setprompt]=useState("")
  const navigate=useNavigate();
const path=useLocation().pathname

  const handleclick=()=>{
    setmenu(!menu)
  }
  return (
    <div className="nav">
     <h1 className='title'><Link to={"/"}>Blog Master</Link></h1>
    {path==="/" &&  <div className="search">
      <p onClick={()=>navigate(prompt?"?search="+prompt: "/")} ><BsSearch/></p>
      <input onChange={(e)=>setprompt(e.target.value)} type="text" placeholder='Search a Post' />
     </div>}
     <div className="box">
          {user?(<Link to={"/write"}>Write</Link>): (<Link to={"/login"}>Login</Link> )}
          {user?(<div onClick={handleclick} style={{cursor:"pointer",position:"relative" ,color:"white",fontSize:"20px"}}>
               <p><FaBars/></p>
               {menu && <Menu/>}
              </div>
          ):(<Link to={"/register"}>Register</Link>)}
     </div>
     <div onClick={handleclick} className="menu">
      <p><FaBars/></p>
      {menu && <Menu/>}
     </div>

    </div>
  )
}

export default Navbar