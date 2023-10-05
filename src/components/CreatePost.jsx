import React, { useState } from 'react';
import { makePost } from '../API';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreatePost({ onlineStatus }) {
  const [newItemName, setNewItemName] = useState('')
  const [newLocation, setNewLocation] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [willDeliver, setWillDeliver] = useState(false)

  const username = sessionStorage.getItem('username')
  
  const submitNewPost = async (e) => {
    e.preventDefault()
   
    const newPost = {
      title: newItemName,
      location: newLocation,
      description: newDescription,
      price: newPrice,
      willDeliver
    }
    try{
      console.log('before sent to api', newLocation)
      const makeNewPost = await makePost(newPost)

      if(makeNewPost.ok) {
        toast.success('Post made!')
        console.log('successful post')
        // e.target.reset()
        setNewItemName('')
        setNewLocation('')
        setNewDescription('')
        setNewPrice('')
        willDeliver(false)
      }
    } catch(err) {
      console.warn(err)
    }
  }
  
  return(
    <>
    {username  ? (
      <div id="form">
      <h1>Create Posts below</h1>
      <span>
        <form onSubmit={submitNewPost}>
          <label htmlFor="item-name">Item selling:
            <input value={newItemName} onChange={(e) => setNewItemName(e.target.value)} id="item-name" placeholder="Item name"/>
          </label>
          <br></br>
          <label htmlFor="location">Location:
            <input value={newLocation} onChange={(e) => setNewLocation(e.target.value)} id="location" placeholder="Location"/>
          </label>
          <br></br>
          <label id="des-label" htmlFor="description">Description:
            <textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)} id="description" placeholder="Description of item"></textarea>
          </label>
          <br></br>
          <label htmlFor="price">Price: $
          <input value={newPrice} onChange={(e) => setNewPrice(e.target.value)} id="price" type="number" placeholder="Cost" onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')}}/>
          </label>
          <br></br>
          <label htmlFor="deliver">Willing to deliver?
            <input value={willDeliver} onChange={(e) => setWillDeliver(e.target.checked)} id="deliver" type="checkbox" />
          </label>
          <br></br>
          <button>Create Post</button>
        </form>
      </span>
    </div>
    ) : (
      <>
        <p>Please login in to create a post!</p>
        <Link to='/login' >Log in</Link>
      </>
    )}
    </>
  )
}


    