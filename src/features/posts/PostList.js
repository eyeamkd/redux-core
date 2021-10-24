import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import UserName from './postAuthor'
import TimeAgo from './TimeAgo'

function PostList() {
  const posts = useSelector((state) => state.posts) 
  const postsList = posts.slice().sort((a,b)=> {b.date.localeCompare(a.date)}); 
  //   const [currentUser, setCurrentUser ] = useGetUser(null);

  const postsRenderer = postsList.map((post) => {
    //   setCurrentUser(post.userId);
    return (
      <article className="post-excerpt" key={post.id}>
        <h3>{post.title}</h3>
        <p className="post-content">{post.description}</p>
        <Link to={`/posts/${post.id}`} className="button muted-button">
          View Post
        </Link>
        <p>
          Posted By:
          <UserName userId={post.userId} />
        </p> 
        <TimeAgo timestamp ={post.date}/>
      </article>
    )
  })
  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {postsRenderer}
    </section>
  )
}

export default PostList

// const useGetUser = (userId) => {
//     return useSelector((state)=> state.users.find(user => user.id === userId))
// }
