import { nanoid } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { newPost } from './postsSlice'

function AddPostForm() {
  const [postTitle, setpostTitle] = useState('')
  const [postDescription, setpostDescription] = useState('')
  const [userId, setuserId] = useState()
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users.users)

  const onSubmit = () => {
    if (postTitle && postDescription) {
      dispatch(
        newPost({
          title: postTitle,
          description: postDescription,
          id: nanoid(),
        })
      )
      setpostTitle('')
      setpostDescription('')
    }
  }

  const UsersDropDown = () => {
    console.log('Users are', users)
    return users.map((user) => (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    ))
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={postTitle}
          onChange={(e) => setpostTitle(e.target.value)}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={postDescription}
          onChange={(e) => setpostDescription(e.target.value)}
        />
        <UsersDropDown />
        <button type="button" onClick={onSubmit}>
          Save Post
        </button>
      </form>
    </section>
  )
}

export default AddPostForm
