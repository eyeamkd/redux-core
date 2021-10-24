import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { sub } from 'date-fns'
import { client } from '../../api/client'
import statusTypes from '../../utils/statusType'

const initialState = {
  posts: [],
  status: statusTypes.IDLE,
  error: null, 
  submitPostError:null
}

//Selector Functions
export const getAllPosts = (state) => state.posts.posts

export const getPostById = (state, postId) =>
  state.posts.find((post) => post.id === postId)

const getPostFromState = (state, action) => {
  return state.posts.find((post) => post.id === action.payload.id)
}

function editPostSlice(state, action) {
  const post = getPostFromState(state, action)
  post.title = action.payload.title
  post.description = action.payload.description
  return state
}

function updatePostReactionSlice(state, action) {
  const post = getPostFromState(state, action)
  post.reactions[action.payload.reaction] += 1
  return state
}

const newPostSlice = {
  reducer: (state, action) => {
    state.posts.push(action.payload)
  },
  prepare(title, description, userId) {
    return {
      payload: {
        title,
        description,
        userId,
        date: new Date().toISOString(),
      },
    }
  },
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  console.log('inside dispatch')
  const response = await client.get('/fakeApi/posts')
  console.log('Response is', response)
  return response.data
}) 

export const submitNewPost = createAsyncThunk('posts/newPost',async (postData)=>{
  const response = await client.post('/fakeApi/posts', postData); 
  return response.data;
})

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    editPost: editPostSlice,
    reactions: updatePostReactionSlice,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = statusTypes.LOADING
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = statusTypes.SUCCESS
        state.posts = state.posts.concat(action.payload) 
        return state
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = statusTypes.FAILED
        state.error = action.error.message
        return state
      }) 
      .addCase(submitNewPost.pending,(state,action)=>{
        state.status = statusTypes.LOADING
      })
      .addCase(submitNewPost.fulfilled,(state,action)=>{
        state.status = statusTypes.SUCCESS 
        state.posts.push(action.payload)
        return state
      }) 
      .addCase(submitNewPost.rejected,(state,action)=>{
        state.status = statusTypes.FAILED 
        state.submitPostError = action.error
      }) 

  },
})

export const { newPost, editPost, reactions } = postSlice.actions

export default postSlice.reducer
