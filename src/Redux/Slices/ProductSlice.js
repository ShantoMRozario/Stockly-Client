import { createSlice } from "@reduxjs/toolkit"


export const productSlice = createSlice({
    name: "product",
    initialState: {
        products:[],
        list:0,
        formValue:{
            productName:"",
            unit:"",
            details:"",
            categoryId:"",
            brandId:"",
            images:[],
        },
        brandDropdown:[],
        categoryDropdown:[],
    },
    reducers: {
        setBrandDropdown: (state, action) => {
            state.brandDropdown = action.payload
        },
        setCategoryDropdown: (state, action) => {
            state.categoryDropdown = action.payload
        },
        setProduct: (state, action) => {
            state.products = action.payload
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
                state.formValue[key] = key === "images" ? [] : ""
            })
        }
    }
})

export const { setBrandDropdown, setCategoryDropdown, setProduct, setTotal, setFormValue, resetFormValue } = productSlice.actions
export default productSlice.reducer