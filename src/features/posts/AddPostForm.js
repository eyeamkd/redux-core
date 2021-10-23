import React, { useState } from 'react'; 
import { useDispatch } from 'react-redux';
import { newPost } from './postsSlice';

function AddPostForm() {
  const [postTitle, setpostTitle] = useState('')
  const [postDescription, setpostDescription] = useState('') 
    const dispatch = useDispatch();

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
        <button type="button" onClick={()=> dispatch(newPost({title:postTitle, description:postDescription, id:'3'})) } >Save Post</button>
      </form>
    </section>
  )
}

export default AddPostForm
