import { createSlice } from "@reduxjs/toolkit"


export const customerSlice = createSlice({
    name: "customer",
    initialState: {
        customers:[],
        list:0,
        formValue:{
            customerName:"",
            phoneNumber:"",
            email:"",
            address:""
        },
    },
    reducers: {
        setCustomer: (state, action) => {
            state.customers = action.payload
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

export const { setCustomer, setTotal, setFormValue, resetFormValue } = customerSlice.actions
export default customerSlice.reducer