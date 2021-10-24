import { createSlice } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

const initialState = [
  {
    id: '2',
    title: 'Second Post',
    description: 'Second post description',
    userId: '345',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 4,
      hooray: 5,
      heart: 0,
      rocket: 8,
      eyes: 0,
    },
    usersReactions: {
      thumbsUp: [],
    },
    comments: [],
  },
  {
    id: '1',
    title: 'First Post',
    description: 'First post description',
    userId: '123',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 2,
      heart: 0,
      rocket: 0,
      eyes: 3,
    },
    usersReactions: {
      thumbsUp: [],
    },
    comments: [],
  },
] 

const getPostFromState = (state,action) => {
   return state.find((post) => post.id === action.payload.id)
}

function editPostSlice(state, action) {
  const post = getPostFromState(state,action)
  post.title = action.payload.title
  post.description = action.payload.description
  return state
} 

function updatePostReactionSlice(state,action){ 
    const post = getPostFromState(state,action)  
    post.reactions[action.payload.reaction]+=1; 
    return state;
}

const newPostSlice = {
  reducer: (state, action) => {
    state.push(action.payload)
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

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    newPost: newPostSlice,
    editPost: editPostSlice,
    reactions: updatePostReactionSlice
  },
})

export const { newPost, editPost, reactions } = postSlice.actions

export default postSlice.reducer
