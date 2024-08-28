import { createSlice } from "@reduxjs/toolkit"

export const salesSlice = createSlice({
     name: "return",
     initialState: {
        returns:[],
         list:0,
         formValue:{
            customerId: "",
            vatTax: 0,
            discount: 0,
            otherCost: 0,
            shippingCost: 0,
            grandTotal: 0,
            details: "",
         },
         customerDropdown:[],
         productDropdown:[],
         selectedProducts:[]
     },
     reducers: {
         setReturn: (state, action) => {
             state.returns = action.payload
         },
         setTotal: (state, action) => {
             state.list = action.payload
         },
         setFormValue: (state, action) => {
             const { name, value } = action.payload
             state.formValue[name] = value
         },
         setCustomerDropdown: (state, action) => {
             state.customerDropdown = action.payload
         },
         setProductDropdown: (state, action) => {
             state.productDropdown = action.payload
         },
         setSelectedProducts: (state, action) => {
             state.selectedProducts.push(action.payload)
         },
         removeProducts: (state, action) => {
             state.selectedProducts.splice(action.payload, 1)
         },
         resetFormValue: (state) => {
             state.formValue = {
                customerId: "",
                vatTax: 0,
                discount: 0,
                otherCost: 0,
                shippingCost: 0,
                grandTotal: 0,
                details: "",
             }
             state.selectedProducts = []
         }
     }
 })

 export const { setReturn, setTotal, setFormValue, setCustomerDropdown, setProductDropdown, setSelectedProducts, removeProducts, resetFormValue } = salesSlice.actions
 export default salesSlice.reducer
 