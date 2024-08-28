
import{createSlice} from '@reduxjs/toolkit'

export const reportSlice = createSlice({
    name: 'report',
    initialState:{
        salesReportByDate: [],
        returnsReportByDate: [],
        purchasesReportByDate: [],
        expensesReportByDate: [],
    },
    reducers:{
        setSalesReportByDate:(state,action)=>{
            state.salesReportByDate = action.payload
        },
        setReturnsReportByDate:(state,action)=>{
            state.returnsReportByDate = action.payload
        },
        setPurchasesReportByDate:(state,action)=>{
            state.purchasesReportByDate = action.payload
        },
        setExpensesReportByDate:(state,action)=>{
            state.expensesReportByDate = action.payload
        }
    }
})
export const {setSalesReportByDate,setReturnsReportByDate,setPurchasesReportByDate,setExpensesReportByDate} = reportSlice.actions
export default reportSlice.reducer