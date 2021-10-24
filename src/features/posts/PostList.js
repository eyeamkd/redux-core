import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import UserName from './postAuthor'
import { getAllPosts } from './postsSlice'
import ReactionButtons from './ReactionButtons'
import TimeAgo from './TimeAgo'
import { fetchPosts } from './postsSlice'
import { useDispatch } from 'react-redux'
import statusType from '../../utils/statusType'
import { Spinner } from '../../components/Spinner'

function PostList() {
  const posts = useSelector(getAllPosts)
  const dispatch = useDispatch()

  const postStatus = useSelector((state) => state.posts.status)
  const postFetchingError = useSelector((state) => state.posts.error)

  const getSortedPosts = () => {
    return posts.slice().sort((a, b) => b.date.localeCompare(a.date))
  }

  useEffect(() => {
    if (postStatus === statusType.IDLE) {
      console.log('Post status', postStatus)
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  const PostsRenderer = ({ post }) => {
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
        <ReactionButtons post={post} />
        <TimeAgo timestamp={post.date} />
      </article>
    )
  }

  let content

  if (postStatus === statusType.LOADING) {
    content = <Spinner text="Loading..." />
  } else if (postStatus === statusType.SUCCESS) {
    // Sort posts in reverse chronological order by datetime string
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))

    content = orderedPosts.map((post) => (
      <PostsRenderer key={post.id} post={post} />
    ))
  } else if (postStatus === statusType.FAILED) {
    content = <div>{postFetchingError}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}

export default PostList
