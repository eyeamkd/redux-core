import {createSlice} from '@reduxjs/toolkit'; 

const initialState = [ 
    {id:'1', title:'First Post', description:'First post description'},
    {id:'2', title:'Second Post', description:'Second post description'}
] 

const postSlice = createSlice({
    name:'posts',
    initialState,
    reducers:{ 
        newPost : (state,action)=>{ state.push(action.payload)  
            return state
        } 
    }
}) 

export const {newPost} = postSlice.actions

export default postSlice.reducer;