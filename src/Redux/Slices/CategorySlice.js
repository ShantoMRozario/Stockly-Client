
import { createSlice } from "@reduxjs/toolkit"

export const categorySlice = createSlice({
    name: "category",
    initialState: {
        categorys:[],
        list:0,
        formValue:{
            name:""
        },
    },
    reducers: {
        setCategory: (state, action) => {
            state.categorys = action.payload
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

export const { setCategory, setTotal, setFormValue, resetFormValue } = categorySlice.actions  
export default categorySlice.reducer