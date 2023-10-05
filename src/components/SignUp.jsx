import React, { useState } from 'react';
import { Register } from '../API';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
  const [newUsername, setNewUsername] = useState('')
  const [pwd, setPwd] = useState('')
  const [confirmedPwd, setConfirmedPwd] = useState('')

  const registerUser = async (e) => {
    e.preventDefault()

    if(pwd !== confirmedPwd) {
      toast.warn('Password must match!')
      return
    }
    const user = {
      username: newUsername,
      password: pwd,
    }

    try {
      const regUser = await Register(user)
     
      if(regUser.success) {
        toast.success('New user account success')
      }
    } catch(err) {
      alert('Unable to register your account')
      console.warn(err)
    }

  }


  return(
    <div>
      <h1>Sign up here</h1>
      <section>
        <form onSubmit={registerUser}>
          <label htmlFor='username'>Username:
            <input type='text' id='username' placeholder='Username' required min={8} onChange={(e) => setNewUsername(e.target.value)} value={newUsername} autoComplete='off'/>
          </label>
          <br></br><br></br>
          <label htmlFor='password'>Password:
            <input type='password' id='password' required min={8} placeholder='Password' onChange={(e) => setPwd(e.target.value)} value={pwd} autoComplete='off'/>
          </label>
          <br></br><br></br>
          <label htmlFor='password-confirm'>Confirm Password:
            <input type='password' id='password-confirm' required min={8} placeholder='Confirm Password' onChange={(e) => setConfirmedPwd(e.target.value)} value={confirmedPwd} autoComplete='off'/>
          </label>
          <button type='submit'>Register</button>
        </form>
      </section>
      <Link to='/login' >Return to login screen</Link>
    </div>
  )
}