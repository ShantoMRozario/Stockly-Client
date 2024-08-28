import { createSlice } from "@reduxjs/toolkit"


export const expenseSlice = createSlice({
    name: "expense",
    initialState: {
        expenses:[],
        list:0,
        formValue:{
            expenseTypeId:"",
            amount:"",
            details:"",
        },
        expenseTypeDropdown:[]
    },
    reducers: {
        setExpenseTypeDropdown: (state, action) => {
            state.expenseTypeDropdown = action.payload
        },
        setExpense: (state, action) => {
            state.expenses = action.payload
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

export const {setExpenseTypeDropdown, setExpense, setTotal, setFormValue, resetFormValue } = expenseSlice.actions  
export default expenseSlice.reducer