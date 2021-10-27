import React from 'react'
// import {getState} from 'redux';
import { useSelector, getState } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllPosts, getFilteredPosts } from '../posts/postsSlice'
import { getUserById } from './userSlice'
import store from '../../app/store';

function SingleUserPage({ match }) { 
  const {userId} = match.params;
  const user = useSelector((state)=>getUserById(state,userId)) 
  console.log("User is",user); 
  const state = store.getState();
  const postsForUser = getFilteredPosts(state, userId);

  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ))

  return (
    <section>
      <h2>{user.name}</h2>
      <h4>My Posts</h4>
      <ul>{postTitles}</ul>
    </section>
  )
}

export default SingleUserPage
