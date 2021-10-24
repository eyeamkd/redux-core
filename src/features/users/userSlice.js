import { createSlice } from "@reduxjs/toolkit";

const initialUserState = [ 
    {name:'Kunal', profession:'Entrepreneur', id:'123'},
    {name:'Pranay', profession:'CA', id:'345'}
]
const userSlice = createSlice({
    name:'users',
    initialState:initialUserState, 
    reducers:{ 
        newUser:()=>{},
        userUpdated:()=>{}
    }
}) 

export const {newUser, userUpdated} = userSlice.actions;

export default userSlice.reducer