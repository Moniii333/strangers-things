const COHORT_NAME = '2306-FTB-ET-WEB-PT'
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getToken = sessionStorage.getItem('token')

const Register = async (formData) => {
  try{
    if(!formData || !formData.username || !formData.password) {
      throw new Error('Invalid formData!')
    }
  
    const response = await fetch(
      `${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: formData.username,
          password: formData.password
        }
      }),
    });
      const result = await response.json();
      console.log(result)
      return result
    } catch (err) {
      console.error(err);
    }
} 

const authLogin = async ({ username, password }) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username,
          password
        }
      })
    });
    const result = await response.json();
    return result
  } catch (err) {
    console.error('authlogin function catch' ,err);
    throw err
  }
}

const myData = async () => {

  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken}`
      },
    });
    return response
  } catch (err) {
    console.error(err);
  }
}

const fetchPosts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const result = await response.json()
    return result
  } catch (err) {
    console.error(err)
  }
}
const makePost = async ({ title, description, price, willDeliver, location}) => {

  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken}`
      },
      body: JSON.stringify({
        post: {
          description,
          title,
          price,
          location,
          willDeliver
        }
      })
    });
    const result = await response.json()
    console.log(result)
    toast.success('Post created successfully!')
    return result
  } catch (err) {
    console.error(err)
  }
}
const deletePost = async (postId) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken}`
      }
    });
    const result = await response.json()
    toast.warn('Post has been deleted!')
    return result
  } catch (err) {
    console.error(err)
  }
}
const removePost = (e) => {
  const selectedPost = e.target.closest('.post-div')
  if (e.target.classList.contains('remove-post')) {
    const postId = e.target.getAttribute('data-id')

    deletePost(postId)
    if (selectedPost) {
      selectedPost.remove()
    }
  }
  console.log('removal successful!')
}

const updatePost = async ({ title, location, description, price, willDeliver }, postId ) => {
  console.log('Sending data to updatePost:', {
    title,
    location,
    description,
    price,
    willDeliver
  });
  
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken}`
      },
      body: JSON.stringify({
        post: {
          title,
          description,
          price,
          location,
          willDeliver
        }
      })
    });
    console.log('Api url: ', response)
    const result = await response.json();
    toast.success('Your post has been updated!')
    return result
  } catch (err) {
    console.error(err);
  }
}

const testOnlineStatus = async () => {
  try {
    const response = await fetch(`${BASE_URL}/test/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken}`
      }
    });

    if (response.status === 200) {
      return true
    } else {
      return false
    }
  } catch (error) {
    toast.warning('Failed to check online status');
  }
}

const postMessage = async ({postId}, {messageToSend}) => {
  console.log('PostId:-> ', postId,'Message:-> ', messageToSend, 'Token:-> ',getToken)
  try {
    if(postId && messageToSend) {
      console.info('in if statement', postId, messageToSend)
    }
    const response = await fetch(`https://strangers-things.herokuapp.com/api/2306-FTB-ET-WEB-PT/posts/${postId}/messages`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken}`
      },
      body: JSON.stringify({
        "message": {
         "content": messageToSend
        }
    })
    });
    
    if(!response.ok) {
      throw new Error(`Failed to send message (${response.status}): ${await response.text()}`)
    }
      const result = await response.json();
      console.info('Sending message results: ', result);
      return result

  } catch (err) {
    console.error('From api: ' ,err);
  }
}

export { Register, authLogin, myData, fetchPosts, makePost, removePost, updatePost, testOnlineStatus, postMessage }