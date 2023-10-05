import { useParams, useLocation, useNavigate } from "react-router-dom"
import React, { useState } from 'react';
import { updatePost } from "../API"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditPosts() {
  const { postId } = useParams()
  const uselocation = useLocation()
  const navigation = useNavigate()
  const { post } = uselocation.state || {}

  console.log('post id: ', postId)
  const [formData, setFormData] = useState({
    title: post ? post.title : '',
    location: post ? post.location : '',
    description: post ? post.description : '',
    price: post ? post.price : '',
    willDeliver: post ? post.deliver : false,
  })
  // const [updatedFormData, setUpdatedFormData] = useState({
  //   title: '',
  //   location: '',
  //   description: '',
  //   price: '',
  //   willDeliver: false,
  // })
console.log('form data: ', formData)
  const handleInputChanges = (e) => {
    const { name, value, type, checked } = e.target
    // handle checkbox
    const newValue = type === 'checkbox' ? checked : value

    setFormData({
      ...formData,
      [name]: newValue,
    })
  }

  const sendEditedPost = async (e) => {
    e.preventDefault()

    // const updatedPost = {
    //   ...updatedFormData
    // }
    // const editedPost = setUpdatedFormData({...updatedFormData})
    // console.log('edit post: ', editedPost)
   
      try {
        const sendPostEdit = await updatePost( formData, postId )
        
        if(sendPostEdit) {
          setTimeout(() => {
            console.log('results of edit: ', sendPostEdit)
            toast.success('Your post has been updated!')
            // navigation('/posts')
          }, 1200)
        } 
      } catch(error) {
        console.log(error)
        toast.warn('Unable to update your post!')
      }
    }

  return(
    <div id="edit-form">
      <h3>Edit posts here</h3>
      <form onSubmit={sendEditedPost}>
        <label>Item name:
          <input name="title" value={formData.title} onChange={handleInputChanges} />
        </label>
        <br></br><br></br>
        <label>Location:
          <input name="location" value={formData.location} onChange={handleInputChanges} />
        </label>
        <br></br><br></br>
        <label>Description:
        <br></br>
          <textarea name="description" value={formData.description} onChange={handleInputChanges} />
        </label>
        <br></br><br></br>
        <label>Price:
          <input name="price" value={formData.price} onChange={handleInputChanges} />
        </label>
        <br></br><br></br>
        <label>Delivery?
          <input name="willDeliver" value={formData.willDeliver} onChange={handleInputChanges} type="checkbox" />
        </label>
        <br></br><br></br>
        <button id="update-btn" type="submit" >Update Post</button>
      </form>
    </div>
  )
}