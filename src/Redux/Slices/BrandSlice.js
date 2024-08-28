
import { createSlice } from "@reduxjs/toolkit"

export const brandSlice = createSlice({
    name: "brand",
    initialState: {
        brands:[],
        list:0,
        formValue:{
            name:""
        },
    },
    reducers: {
        setBrand: (state, action) => {
            state.brands = action.payload
        },
        setTotal: (state, action) => {
            state.list = action.payload
        },
        setFormValue: (state, action) => {
            const { name, value } = action.payload
            state.formValue[name] = value
        },
        resetFormValue: (state) => {
            Object.keys(state.formValue).forEach((key) => {
                state.formValue[key] = ""
            })
        }
    }
})

export const { setBrand, setTotal, setFormValue, resetFormValue } = brandSlice.actions  
export default brandSlice.reducer