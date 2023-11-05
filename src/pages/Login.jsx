import { Link, useNavigate } from "react-router-dom"
import Footer from "../component/Footer"
import { useContext, useState } from "react";
import axios from "axios";
import { URL } from "../../url";
import { UserContext } from "../context/UserContext";
import toast from "react-hot-toast";

  
const Login = () => {
  const[email,setemail]=useState("");
   
  const[password,setpassword]=useState("");
  const navigate=useNavigate();
  const[error,seterror]=useState(false);
  const{setUser}=useContext(UserContext)

  const handlelogin=async()=>{
    try {
      const res= await axios.post(URL+"/api/auth/login",{
        email,password
      },{withCredentials:true})
      setUser(res.data);
      toast.success("Login succesfull")
      navigate("/")
    } catch (error) {
      seterror(true)
      console.log(error)
      toast.error("Something went wrong")
    }
  }
  return (
    <>
    <div className="custom">
        <h1><Link to={"/"}>Blog Market</Link></h1>
        <Link to={"/register"}>Register</Link>
    </div>
     <div className="login">
        <div className="box">
            <h1>Log in to your account</h1>
            <input type="email" placeholder="Enter your email" onChange={(e)=>setemail(e.target.value)}/>
            <input type="password" placeholder="Enter your password" onChange={(e)=>setpassword(e.target.value)} />
            <button onClick={handlelogin}>Login</button>
            {error && <h3 style={{color:"red",fontSize:"13px",fontWeight:"500",textAlign:"center"}}>Something went wrong</h3>}
            <div className="new">
                <p>New Here ?</p>
                <p><Link to={"/register"}>Register</Link></p>
            </div>
        </div>
       
    </div>
    <Footer/>
    </>
   
  )
}

export default Login