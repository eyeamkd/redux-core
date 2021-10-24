import React, { useEffect, useState } from 'react'
import { editPost } from './postsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

function EditPostForm({ match }) {
  const { id } = match.params
  const post = useGetPostFromState(id)
  const [title, setTitle] = useState(post[0].title)
  const [description, setDescription] = useState(post[0].description)
  const dispatch = useDispatch()
  const history = useHistory()

  const onSubmitClicked = () => {
    if (title && description) {
      dispatch(editPost({ id, title, description }))
      history.push(`/posts/${id}`)
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={description}
          onChange={(e) => {
            console.log('desc i', e.target.value)
            setDescription(e.target.value)
          }}
        />
      </form>
      <button type="button" onClick={() => onSubmitClicked()}>
        Save Post
      </button>
    </section>
  )
}

export default EditPostForm

const useGetPostFromState = (id) => {
  const post = useSelector((state) =>
    state.posts.filter((post) => post.id === id)
  )
  return post
}
