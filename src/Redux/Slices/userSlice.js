
import { createSlice } from "@reduxjs/toolkit";

export const serSlice = createSlice({

    name: "user",
    initialState:{
        userInfo: localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null
    },
    reducers:{
        login:(state,action)=>{
            state.userInfo = action.payload
        }
    }

})

export const {login} = userSlice.actions
export default userSlice.reducer