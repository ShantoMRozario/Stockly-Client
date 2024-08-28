
import { createSlice } from "@reduxjs/toolkit"

export const purchaseSlice = createSlice({
     name: "purchase",
     initialState: {
        purchases:[],
         list:0,
         formValue:{
            supplierId: "",
            vatTax: 0,
            discount: 0,
            otherCost: 0,
            shippingCost: 0,
            grandTotal: 0,
            details: "",
         },
         supplierDropdown:[],
         productDropdown:[],
         selectedProducts:[]
     },
     reducers: {
         setPurchase: (state, action) => {
             state.purchases = action.payload
         },
         setTotal: (state, action) => {
             state.list = action.payload
         },
         setFormValue: (state, action) => {
             const { name, value } = action.payload
             state.formValue[name] = value
         },
         setSupplierDropdown: (state, action) => {
             state.supplierDropdown = action.payload
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
                 supplierId: "",
                 vatTax: 0,
                 discount: 0,
                 otherCost: 0,
                 shippingCost: 0,
                 total: 0,
                 details: "",
             }
             state.selectedProducts = []
         }
     }
 })

 export const { setPurchase, setTotal, setFormValue, setSupplierDropdown, setProductDropdown, setSelectedProducts, removeProducts, resetFormValue } = purchaseSlice.actions
 export default purchaseSlice.reducer