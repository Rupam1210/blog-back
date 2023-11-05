import { Link, useNavigate } from "react-router-dom"
import Footer from "../component/Footer"
import { useState } from "react"
import axios from "axios";
import { URL } from "../../url";

 

const Register = () => {
  const[email,setemail]=useState("");
  const[username,setusername]=useState("");
  const[password,setpassword]=useState("");
  const navigate=useNavigate();
  const[error,seterror]=useState(false);

  const handleregister=async()=>{
    try {
      const res=await axios.post(URL+"/api/auth/register",{
        username,email,password})
         setusername(res.data.username)
         setemail(res.data.email)
         setpassword(res.data.password)
         navigate("/login")
    } catch (error) {
      seterror(true)
      console.log(error)
    }
  }
   

  
  return (
     <>
     <div className="custom">
        <h1><Link to={"/"}>Blog Market</Link></h1>
        <Link to={"/login"}>Login</Link>
    </div>
      <div className="login">
        <div className="box">
            <h1>Create an Account</h1>
            <input type="text" placeholder="Enter your username" onChange={(e)=>setusername(e.target.value)} />
            <input type="email" placeholder="Enter your email" onChange={(e)=>setemail(e.target.value)}/>
            <input type="password" placeholder="Enter your password" onChange={(e)=>setpassword(e.target.value)}/>
            <button onClick={handleregister}>Register</button>
            {error && <h3 style={{color:"red",fontSize:"13px",fontWeight:"500",textAlign:"center"}}>Something went wrong</h3>}
            <div className="new">
                <p>Already have an account ?</p>
                <p><Link to={"/login"}>Log in</Link></p>
            </div>
        </div>
       
    </div>
    <Footer/>
     </>
  )
}

export default Register