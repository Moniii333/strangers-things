import { fetchPosts, updatePost } from "../API"
import React, { useState, useEffect } from 'react';
import { removePost, postMessage } from "../API";
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Searchbar from './SearchBar.jsx'

export default function Posts() {
  const [showPosts, setShowPosts] = useState([])
    const [editPost, setEditPost] = useState(null)
    const [tempPost, setTempPost] = useState([])
    // change input background colors
    const [iseditable, setIsEditable] = useState(false)
    const [selectedPost, setSelectedPost] = useState(null)
    
  
  const username = sessionStorage.getItem('username')
    
  useEffect(() => {
    async function retrievePosts() {
      const allPosts = await fetchPosts()

      if(allPosts) {
        setShowPosts(allPosts.data.posts)
        setTempPost(allPosts.data.posts)
        
      } else {
        console.warn('Failed to get all posts')
      }
    }
    retrievePosts()
  }, [])

  // edit posts
  const handleEditPost = () => {
    setEditPost(true) 
    setIsEditable(true)
  }

// messaging functions
const [message, setMessage] = useState('')
const [wantSendMessage, setWantSendMessage] = useState(false)
   
    const sendAMessage = async () => {
      if(!selectedPost) {
        console.warn('No selected post')
        return
      }
      const postId = selectedPost
      const messageToSend = {
        content: message
      }
      console.info('message being written: ', message)
      try {
        const response = await postMessage({postId}, {messageToSend})
        if(response) {
          toast.success('Message sent!')
        }
      } catch(err) {
        console.warn('From posts' ,err)
      }
    }
    useEffect(() => {
    console.info('---->', message)
   }, [message])

    // searchbar funcs
    const [query, setQuery] = useState('')
    const [posts, setPosts] = useState([])
    const [error, setError] = useState(null)
    
    useEffect(() => {
      async function handleSearch() {
      }
      handleSearch()
    }, [])
    
    useEffect(() => {
      if(query === '') {
        setPosts(posts)
      } else {
        const filtered = posts.filter((post) => {
          return(
            post.title.toLowerCase().includes(query) ||
            post.description.toLowerCase().includes(query) ||
            post.author.username.toLowerCase().includes(query)
            )
        })
        setPosts(filtered)
      } 
    }, [query]);


    return (
      <>
      <>
        <Searchbar query={query} setQuery={setQuery} />
        {username ? (
          <>
            <span id="loggedInUser">Welcome, {username}</span>
            {query ? (
              showPosts.filter((post) => {
                  return (
                    post.title.toLowerCase().includes(query.toLowerCase()) ||
                    post.description.toLowerCase().includes(query.toLowerCase()) ||
                    post.author.username.toLowerCase().includes(query.toLowerCase())
                  );
                })
                .map((post) => ( 
                  // start of search post view
                  <div className='post-div' key={post._id}>
                    <div>
                      <h3 name='title' key={post._id}>{post.title}</h3>
                      <p>Item still for sale? {post.active ? 'Yes' : ' No'}</p>
                      <p><strong>Seller:</strong> {post.author.username}</p>
                      <p name='location'><strong>Location: </strong>{post.location}</p>
                      <p name='description'>Description: {post.description}</p>
                      <p name='price'>Price: {post.price}</p>
                    </div>
                    {post.author.username === username && (
                      <button className="remove-post" data-id={post._id} onClick={removePost}>Remove Post</button>
                    )}
                    {post.author.username !== username && (
                      <>
                        <button onClick={() => { setWantSendMessage(true); setSelectedPost(post._id) }} className="message-btn" data-id={post._id}><FontAwesomeIcon icon={faEnvelope} />Message Seller</button>
                        {wantSendMessage === true && selectedPost === post._id ? (
                          <span id="message-form">
                            <form>
                              <label htmlFor="message">
                                <textarea value={message} onChange={(e) => setMessage(e.target.value)} id="message" placeholder="Your message to the seller" />
                              </label>
                              <br></br>
                              <button onClick={() => sendAMessage(post._id, message)} id="send-msg-btn" className="message-btn" data-id={post._id} type="submit">Send Message</button>
                              <button id="cancel-msg-btn" onClick={() => setWantSendMessage(false)} type="reset">Cancel Message</button>
                            </form>
                          </span>
                        ) : (
                          null
                        )}
                      </>
                    )}
                    {post.author.username === username && (
                      <button className="edit-btn" onClick={handleEditPost}>Edit Post</button>
                      
                    )}
                    {editPost === true && post.author.username === username ? (
                      <>
                        <Link to={`/editposts/${post._id}`} state={{ post }} onClick={() => console.log(`Post ID: ${post._id}`)}>Edit your post here</Link>
                        <button type="button" onClick={() => setEditPost(false)}>Cancel Edit</button>
                      </>
                    ) : (
                      null
                    )}
                  </div>
                ))
            ) : (
                showPosts.map((post) => (
                  // default post view
                  <div className='post-div' key={post._id}>
                  <div>
                    <h3 name='title' key={post._id}>{post.title}</h3>
                    <p>Item still for sale? {post.active ? 'Yes' : ' No'}</p>
                    <p><strong>Seller:</strong> {post.author.username}</p>
                    <p name='location'><strong>Location: </strong>{post.location}</p>
                    <p name='description'>Description: {post.description}</p>
                    <p name='price'>Price: {post.price}</p>
                  </div>
                  {post.author.username === username && (
                    <button className="remove-post" data-id={post._id} onClick={removePost}>Remove Post</button>
                  )}
                  {post.author.username !== username && (
                    <>
                      <button onClick={() => { setWantSendMessage(true); setSelectedPost(post._id) }} className="message-btn" data-id={post._id}><FontAwesomeIcon icon={faEnvelope} />Message Seller</button>
                      {wantSendMessage === true && selectedPost === post._id ? (
                        <span id="message-form">
                          <form>
                            <label htmlFor="message">
                              <textarea value={message} onChange={(e) => setMessage(e.target.value)} id="message" placeholder="Your message to the seller" />
                            </label>
                            <br></br>
                            <button onClick={() => sendAMessage(post._id)} id="send-msg-btn" className="message-btn" data-id={post._id} type="submit">Send Message</button>
                            <button id="cancel-msg-btn" onClick={() => setWantSendMessage(false)} type="reset">Cancel Message</button>
                          </form>
                        </span>
                      ) : (
                        null
                      )}
                    </>
                  )}
                  {post.author.username === username && (
                    <button className="edit-btn" onClick={handleEditPost}>Edit Post</button>
                    
                  )}
                  {editPost === true && post.author.username === username ? (
                    <>
                      <Link to={`/editposts/${post._id}`} state={{ post }} onClick={() => console.log(`Post ID: ${post._id}`)}>Edit your post here</Link>
                      <button type="button" onClick={() => setEditPost(false)}>Cancel Edit</button>
                    </>
                  ) : (
                    null
                  )}
                </div>
                ))
              )}
          </>
        ) : (
            <span>
              <p>Log in to interact with other users!</p>
              <Link to='/login'>Please sign in!</Link>
              {showPosts.map((post) => (
                <div className='not-signedIn' key={post._id}>
                  <p>{post.title}</p>
                  <p><em>Location: </em> {post.location}</p>
                  <p><em>Seller:</em> {post.author.username}</p>
                  <p><em>Description:</em> {post.description}</p>
                  <p><em>Price: </em> {post.price}</p>
                </div>
              ))}
            </span>
          )}
      </>
      </>
    )
}    