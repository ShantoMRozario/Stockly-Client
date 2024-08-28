
import {createSlice} from '@reduxjs/toolkit';

export const productFullPageSlice = createSlice({
   name: 'productFullPage',
   initialState:{
    productFullPage: []
   },
   reducers:{
    setProductFullPage (state, action) {
        state.productFullPage = action.payload
    },
   }
})

export const {setProductFullPage} = productFullPageSlice.actions
export default productFullPageSlice.reducer