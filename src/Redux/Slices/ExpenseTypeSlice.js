import { createSlice } from "@reduxjs/toolkit"


export const expenseTypeSlice = createSlice({
    name: "expenseType",
    initialState: {
        expenseTypes:[],
        list:0,
        formValue:{
            name:""
        },
    },
    reducers: {
        setExpenseType: (state, action) => {
            state.expenseTypes = action.payload
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

export const { setExpenseType, setTotal, setFormValue, resetFormValue } = expenseTypeSlice.actions  
export default expenseTypeSlice.reducer