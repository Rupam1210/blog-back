 
 
import './App.scss'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
 
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Postdetails from './pages/Postdetails'
import Createpost from './pages/Createpost'
import Editpost from './pages/Editpost'
import Profile from './pages/Profile'
import { UserContextProvider } from './context/UserContext'
import { Toaster } from 'react-hot-toast'
import Myblog from './pages/Myblog'

function App() {
   

  return (
    <>
    <UserContextProvider>
    <Router>
     
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/write' element={<Createpost/>}/>
        <Route exact path='/profile' element={<Profile/>}/>
        <Route exact path='/posts/post/:id' element={<Postdetails/>}/>
        <Route exact path='/myblogs/:id' element={<Myblog/>}/>
        <Route exact path='/edit/:id' element={<Editpost/>}/>
      </Routes>
      
       <Toaster/>
    </Router>
    </UserContextProvider>
      
      
    </>
  )
}

export default App
