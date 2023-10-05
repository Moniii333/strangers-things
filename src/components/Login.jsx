import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authLogin } from '../API'

function Login({ passedToken, passedUsername, onlineStatus }) {
  const [newUsername, setNewUsername] = useState('')
  const [pwd, setPwd] = useState('')

  const navigation = useNavigate()

  const updatedUsername = (newUsername) => {
    passedUsername(newUsername)
  }
  
  const handleLogin = async (e) => {
    e.preventDefault()

    const user = {
      username: newUsername,
      password: pwd,

    }
    try {
      const loginResponse = await authLogin(user)

      if(loginResponse.success === true) {
        updatedUsername(newUsername)
        console.log('updated username', newUsername)
        passedToken(loginResponse.data.token)
        sessionStorage.setItem('token', loginResponse.data.token)
        sessionStorage.setItem('username', newUsername)
        toast.success('login successful')
        console.log('whats in storage',sessionStorage)
        toast.info('Please wait while we load your profile!')
        {setTimeout(() => {
          navigation('/profile')
        }, 1800)}

      } else {
        toast.error('User login failed!')
      }
    } catch(error) {
      toast.error('Unable to log in!')
      console.warn('Unable to log in!', error)
    }

    
  }

  return (
    <div>
      <h1>Stranger's Things</h1>
      <div>
        <form className='login-div' onSubmit={handleLogin}>
          <label htmlFor='usernameInput'>Username:
            <input type='text' id='usernameInput' required placeholder='Username' onChange={(e)=> {
        setNewUsername(e.target.value) 
      }} />
          </label>
          <label htmlFor='passwordInput'>Password:
            <input type='password' id='passwordInput' required placeholder='Password' onChange={(e)=> {
        setPwd(e.target.value)
      }} />
          </label>
          <button id='login-btn' type='submit' onClick={handleLogin}>Login</button>
        </form> 
        {onlineStatus === true && updatedUsername ? (
          <>
          <p>Welcome back!</p>
          </>
        ) : (
          <>
           <p>Please login</p>
           <Link to='/signup'>Not signed up? Go here!</Link> 
         </>
        )
      }
      </div>
    </div>
  )
}

export default Login