
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import { URL } from '../../url'
import toast from 'react-hot-toast'
const Menu = () => {
  const{user,setUser}=useContext(UserContext)
  const handlelogout=async()=>{
    try {
      const res =await axios.get(URL+"/api/auth/logout",{withCredentials:true})
      setUser(null);
      console.log(res)
      toast.success(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="menubar">
      <div className="list">
        {!user && <h3 className='bar'><Link to={"/login"} style={{color:"white"}}>Login</Link></h3>}
        {!user && <h3 className='bar'><Link to={"/register"} style={{color:"white"}}>Register</Link></h3>}
        {user && <h3 className='bar'><Link to={"/profile"} style={{color:"white"}}>Profile</Link></h3>}
        {user && <h3 className='bar'><Link to={"/write"} style={{color:"white"}}>write</Link></h3>}
        {user && <h3 className='bar'><Link to={"/myblogs/"+user._id} style={{color:"white"}}>My blog</Link></h3>}
        {user && <h3 onClick={handlelogout} className='bar'><Link style={{color:"white"}}  >Logout</Link></h3>}
         
      </div>
    </div>
  )
}

export default Menu
