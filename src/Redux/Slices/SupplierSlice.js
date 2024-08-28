import { createSlice } from "@reduxjs/toolkit"

export const supplierSlice = createSlice({
    name: "supplier",
    initialState:{
        suppliers:[],
        list:0,
        formValue:{
            supplierName:"",
            phoneNumber:"",
            email:"",
            address:""
        },
    },
    reducers:{
        setSupplier: (state, action) => {
            state.suppliers = action.payload
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
export const { setSupplier, setTotal, setFormValue, resetFormValue } = supplierSlice.actions
export default supplierSlice.reducer