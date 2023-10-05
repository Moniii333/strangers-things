import React, { useEffect, useState, createContext } from 'react'
import { Routes, Route, Navigate, BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login'
import Profile from './components/Profile'
import Nav from './components/Navbar'
import SignUp from './components/SignUp'
import Posts from './components/Posts'
import LogOut from './components/LogOut'
import CreatePost from './components/CreatePost'
import Messages from './components/Messages';
import { fetchPosts } from './API';
import Searchbar from './components/SearchBar';
import EditPosts from './components/EditPosts';
import ReactSwitch from 'react-switch'

export const ThemeContext = React.createContext(null)

function App() {
  const [token, setToken] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // need to loop thru posts to have access to ids to send to children components
  const [savedPosts, setSavedPosts] = useState([])
  
  useEffect(() => {
    const searchPostsIds = async () => {
      try {
        const posts = await fetchPosts()
        if(posts.status === 200) {
          setSavedPosts(posts)
        } 
      } catch (error) {
        console.error(error);
      }
    }
    searchPostsIds()
  }, [])
  
  const onlineStatus = () => {
    if(token) {
      setIsLoggedIn(true)
    }else {
      setIsLoggedIn(false)
    }
  }

  const tokenExchange = () => {
    const savedToken = sessionStorage.getItem('token')
    setToken(savedToken)
    onlineStatus()
  }

  const updateUsername = (newUsername) => {
    setNewUsername(newUsername)
  }

  // dark/light mode
  const [theme, setTheme] = useState('dark')

  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'))
  }
 

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
    <div className='main' id={theme}>
    <Router>
       <Nav />
       <div className='theme-toggle'>
        <label>{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</label>
        <ReactSwitch onChange={toggleTheme} checked={theme === 'dark'}/>
       </div>
       <ToastContainer pauseOnFocusLoss={false}
 position="bottom-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClickrtl={false} theme='dark' />
      <Routes>
        <Route path='/login' element={<Login onlineStatus={onlineStatus} passedUsername={updateUsername} passedToken={tokenExchange} />} />
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/profile' element={<Profile passedToken={tokenExchange}/>} />
        <Route path='/signup' element={<SignUp passedToken={tokenExchange}/>} />
        <Route path='/posts' element={<Posts  />} />
        <Route path='/logout' element={<LogOut />} />
        <Route path='/createpost' element={<CreatePost passedToken={tokenExchange}/>} />
        <Route path='/messages' element={<Messages postResults={savedPosts}/>} />
        <Route path='/searchbar' element={<Searchbar  />} />
        <Route path='/editposts/:postId' exact element={<EditPosts />} />
      </Routes>
    </Router>
  </div>
  </ThemeContext.Provider>
  )
}

export default App
