
import { createSlice } from "@reduxjs/toolkit"

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        purchaseChart: [],
        salesChart: [],
        expenseChart: [],
        returnsChart: [],
        purchaseTotal: 0,
        salesTotal: 0,
        expenseTotal: 0,
        returnsTotal: 0
    },
    reducers: {
        setPurchaseChart: (state, action) => {
            state.purchaseChart = action.payload
        },
        setSalesChart: (state, action) => {
            state.salesChart = action.payload
        },
        setExpenseChart: (state, action) => {
            state.expenseChart = action.payload
        },
        setReturnsChart: (state, action) => {
            state.returnsChart = action.payload
        },
        setPurchaseTotal: (state, action) => {
            state.purchaseTotal = action.payload
        },
        setSalesTotal: (state, action) => {
            state.salesTotal = action.payload
        },
        setExpenseTotal: (state, action) => {
            state.expenseTotal = action.payload
        },
        setReturnsTotal: (state, action) => {
            state.returnsTotal = action.payload
        }
    }
})

export const { setPurchaseChart, setSalesChart, setExpenseChart, setReturnsChart, setPurchaseTotal, setSalesTotal, setExpenseTotal, setReturnsTotal } = dashboardSlice.actions
export default dashboardSlice.reducer