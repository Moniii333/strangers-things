import { useEffect, useState } from "react"
import { postMessage } from "../API"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Messages({ postResults }) {
  const [sendMessage, setSendMessage] = useState('')
  const [cancelMessage, setCancelMessage] = useState(false)
console.log(postResults)
    const sendSellerMessage = async () => {
     

      const message = {
        message : {
          content: sendMessage,
        }
      }
      try {
        const response = await postMessage(message)
        const res = response.json()
        setSendMessage(res)
        console.info(res)
        toast.success('Your message has been sent!')
      } catch(err)  {
        console.warn('error with sending message', err)
      }
    }

    const handleCancelMessaging = () => {
      setCancelMessage(true)
    }


  return(
    <div id="message-div">
      <p> Send Messages here</p>
      <form>
        <label htmlFor="message-details">Message Details: 
          <textarea name='message-details'  id="message-details" placeholder="Message details..." value={sendMessage} onChange={(e) => {
            setSendMessage(e.target.value)
          }}></textarea>
        </label>
        <button data-id={postId} onClick={sendSellerMessage}>Send Message</button>
        <button onClick={handleCancelMessaging}>Cancel Message</button>
      </form>
    </div>
  )
}