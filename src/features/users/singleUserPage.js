import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllPosts } from '../posts/postsSlice'
import { getUserById } from './userSlice'

function SingleUserPage({ match }) { 
  const {userId} = match.params;
  const user = useSelector((state)=>getUserById(state,userId)) 
  console.log("User is",user);
  const postsForUser = useSelector((state) => {
    const allPosts = getAllPosts(state)
    return allPosts.filter((post) => post.user === userId)
  })

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
