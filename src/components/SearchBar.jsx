import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
export default function Searchbar({ query, setQuery }) {

  
  return(
    <span id='searchbar'>
      <input placeholder='Search current posts' type='text' name='input' id='search-input' value={query} onChange={(e) => setQuery(e.target.value.toLowerCase())}/>
      <button type='reset' id='search-btn'><FontAwesomeIcon icon={faSearch} /></button>
    </span> 
  )}