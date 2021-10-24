import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllPosts } from '../posts/postsSlice'
import { getUserById } from './userSlice'

function SingleUserPage({ userId }) {
  const user = useSelector(getUserById) 
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

      <ul>{postTitles}</ul>
    </section>
  )
}

export default SingleUserPage
