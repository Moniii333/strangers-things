import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { testOnlineStatus, myData } from '../API';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'

const Profile = () => {
  const savedUsername = sessionStorage.getItem('username')

  const [myMessages, setMyMessages] = useState([])
  const [messageDetails, setMessageDetails] = useState(false)
  const [myPosts, setMyPosts] = useState([])
  const [postDetails, setPostDetails] = useState(false)
  const [selectedDetails, setSelectedDetails] = useState(null)

  useEffect(() => {

    const getUserData = async () => {
      try{
        const allData = await myData()
        const allMyPosts = await allData.json()
        setMyPosts(allMyPosts.data.posts)
        setMyMessages(allMyPosts.data)
      } catch(err) {
        console.warn(err)
      }     
    }
    getUserData()
  }, [])

  const [userMsg, setUserMsg] = useState([])
  useEffect(() => {
    setTimeout(() => {
      let tempMsgArr = myMessages.messages
      const orgMsgs = {}
      tempMsgArr.forEach((message) => {
        const msgId = message.post._id
        if(!orgMsgs[msgId]) {
          orgMsgs[msgId] = []
        }
        orgMsgs[msgId].push(message.content)
      })
      setUserMsg(orgMsgs)
      console.info('organized messages: ' ,userMsg)
    }, 1000)
    
  }, [myMessages])
  

  return (
    <span>
      {myPosts.map((post) => (
        <div key={post._id} className={`profile-posts ${post.active ? 'active-post' : 'inactive-post'}`}>
          <p>{post.title}</p>
          <p>Listing: {post.title}</p>
          <p>Still active? {post.active ? 'Yes' : 'No'}</p>
          <p>Created: {new Date(post.createdAt).toISOString().split('T')[0]}</p>
          {selectedDetails === post._id && postDetails === true ? (
            <>
              <p>Item description: {post.description}</p>
              <p>Price set: {post.price}</p>
              <p>Willing to deliver: {post.willDeliver ? 'Yes' : 'No'}</p>
              <div>
                <button onClick={() => setMessageDetails(true)}>Message Details</button>
                {userMsg[post._id] && userMsg[post._id].length > 0 ? (
                  <>
                    <p><strong>New messages</strong> for "{post.title}":</p>
                    {userMsg[post._id].map((msg, inx) => (
                      <p key={inx}>: "{msg}"</p>
                    ))}
                  </>
                ) : (
                  <p>No new messages for "{post.title}"</p>
                )}
              </div>
            </>
          ) : null}
          <button key={post._id} onClick={() => { setPostDetails(!postDetails); setSelectedDetails(post._id) }}>
            {selectedDetails === post._id && postDetails ? 'Show Less' : 'Show More'}
          </button>
        </div>
      ))}
    </span>
  )
}
 
export default Profile
