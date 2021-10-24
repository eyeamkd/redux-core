import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../api/client'
import statusType from '../../utils/statusType'

const initialUserState = {
  users: [],
  fetchingUsersStatus: null, 
  fetchingUsersError:null
}

export const getUsers = createAsyncThunk('users/getUsers', async () => {
  const users = await client.get('/fakeApi/users')
  console.log('Users are ', users)
  return users
})

const userSlice = createSlice({
  name: 'users',
  initialState: initialUserState,
  reducers: {
    newUser: () => {},
    userUpdated: () => {},
  },
  extraReducers(builder) {
    builder
      .addCase(getUsers.pending, (state, action) => {
        state.fetchingUsersStatus = statusType.LOADING
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.fetchingUsersStatus = statusType.SUCCESS;  
        console.log("Action is", action);
        state.users = action.payload.data;
        return state;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.fetchingUsersStatus = statusType.FAILED; 
        state.fetchingUsersError = action.error.message
      })
  },
})

export const { newUser, userUpdated } = userSlice.actions

export default userSlice.reducer
