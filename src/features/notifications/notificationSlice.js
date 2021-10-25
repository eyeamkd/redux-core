import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import {client} from '../../api/client'; 
import statusType from "../../utils/statusType";

const initialState = {
    notifications:[],
    notificationsFetchingError:null,
    notificationsStatus:statusType.IDLE
}

export const fetchNotifications = createAsyncThunk('notifications/fetchNotifications',async(_,{getState})=>{
    const allNotifications = getAllNotifications(getState()); 
    const [latestNotification] = allNotifications; 
    const latestTimestamp = latestNotification? latestNotification.date : ''
    const response = await client.get(`/fakeApi/notifications?since=${latestTimestamp}`) 
    return response.data; 
})  


export const getAllNotifications = (state) => {
    return state.notifications;
}


const notificationSlice = createSlice({
    name:'notifications',
    initialState,
    extraReducers:{ 
        [fetchNotifications.fulfilled]:(state,action)=>{ 
            state.notifications.push(action.payload);   
            state.notifications.sort((a,b)=>b.date.localeCompare(a.date));
            state.notificationsStatus = statusType.SUCCESS;
        },
        [fetchNotifications.pending]:(state,action)=>{
            state.notificationsStatus = statusType.LOADING;
            return state;
        },
        [fetchNotifications.rejected]:(state,action)=>{
            state.notificationsStatus = statusType.FAILED;
            state.notificationsFetchingError = action.error.message;
            return state;
        },
    }
}) 

export default notificationSlice.reducer; 
