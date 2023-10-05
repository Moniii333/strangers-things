import { useNavigate, Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LogOut() {
  const navigation = useNavigate()
  const savedUsername = sessionStorage.getItem('username')
  

  const loggingOut = () => {
    toast.success(`See you later, ${savedUsername}!`)
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('username')
    navigation('/')
  }

  return(
    <>
      {savedUsername ? (
        <span>
        <p>Sure you want to log out?</p>
        <button onClick={loggingOut}>Logout</button>
      </span>
      ) : (
        <>
        <p>You're already logged out!</p>
        <Link to='/login'>Click here to sign in!</Link>
      </>
      )}
    </>
  )
}