import { createSlice } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

const initialState = [
  {
    id: '2',
    title: 'Second Post',
    description: 'Second post description',
    userId: '345', 
    date: sub(new Date(), { minutes: 10 }).toISOString()
  },
  {
    id: '1',
    title: 'First Post',
    description: 'First post description',
    userId: '123', 
    date: sub(new Date(), { minutes: 5 }).toISOString()
  },
]

function editPostSlice(state, action) {
  const post = state.find((post) => post.id === action.payload.id)
  post.title = action.payload.title
  post.description = action.payload.description
  return state
} 

const newPostSlice ={
    reducer:(state,action)=>{ 
        state.push(action.payload)
    },
    prepare(title,description, userId){
        return{
            payload:{
                title,
                description,
                userId,
                date: new Date().toISOString()
            }
        }
    }
}

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    newPost:newPostSlice,
    editPost: editPostSlice,
  },
})

export const { newPost, editPost } = postSlice.actions

export default postSlice.reducer
