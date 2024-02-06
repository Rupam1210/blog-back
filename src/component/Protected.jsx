/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
 
import { Navigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';
const Protected = ({children}) => {
    const[cookie,setcookie]=useCookies('token')
     
     if(cookie.token){ 
         return children
     } else{
         return <Navigate to={"/"}/>
     }
    
     
 }

export default Protected
