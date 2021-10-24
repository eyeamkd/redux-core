import {createSlice} from '@reduxjs/toolkit'; 

const initialState = [ 
    {id:'1', title:'First Post', description:'First post description'},
    {id:'2', title:'Second Post', description:'Second post description'}
] 

function editPostSlice(state,action){
    const post = state.find(post=> post.id === action.payload.id) 
    post.title = action.payload.title;
    post.description = action.payload.description;
    return state
}

const postSlice = createSlice({
    name:'posts',
    initialState,
    reducers:{ 
        newPost : (state,action)=>{ state.push(action.payload)  
            return state
        },
        editPost:editPostSlice
    }
}) 

export const {newPost, editPost} = postSlice.actions

export default postSlice.reducer; 