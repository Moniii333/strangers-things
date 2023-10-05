import { NavLink } from "react-router-dom"
import React, { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return(
    <nav className="navbar">
      <NavLink to='/profile' className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "active" : ""
  } style={({ isActive }) => {return{color: isActive ? '#A6F6FF' : '#E4F1FF', fontSize: isActive ? '24px' : '18px'}}}>Profile</NavLink>   
  <NavLink to='/posts' className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "active" : ""
  } style={({ isActive }) => {return{color: isActive ? '#A6F6FF' : '#E4F1FF', fontSize: isActive ? '24px' : '18px'}}}>Posts</NavLink>
  <NavLink to='/createpost' className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "active" : ""
  } style={({ isActive }) => {return{color: isActive ? '#A6F6FF' : '#E4F1FF', fontSize: isActive ? '24px' : '18px'}}}>Create New Post</NavLink>
  <NavLink to='/logout' className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "active" : ""
  } style={({ isActive }) => {return{color: isActive ? '#A6F6FF' : '#E4F1FF', fontSize: isActive ? '24px' : '18px'}}}>Log Out</NavLink>
    </nav>
  )
}

export default Navbar