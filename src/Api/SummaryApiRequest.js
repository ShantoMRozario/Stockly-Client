import { toast } from "react-toastify";
import { getAuthToken, logout } from "../Helper/SessionHelper";
import axios from "axios";
import { BASE_URL } from "../Helper/Config";
import { store } from "../Redux/Store/store";
import { setExpenseChart, setExpenseTotal, setPurchaseChart, setPurchaseTotal, setReturnsChart, setReturnsTotal, setSalesChart, setSalesTotal } from "../Redux/Slices/DashboardSlice";
const AxiosHeader = {headers:{'token':getAuthToken()}}


// Summary Purchase
export const purchaseSummaryRequest = async () => {
    try{
        let url = BASE_URL + '/purchaseSummary';
        let response = await axios.get(url, AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
            let value = response.data.data[0]
            if(value && value.total && value.total[0]){
                store.dispatch(setPurchaseChart(value.last30Days))
                store.dispatch(setPurchaseTotal(value.total[0].totalAmount))
                return true
            }
            else{
                toast.error('Purchase is empty');
                return false
            }
        }
        else{
            toast.error('Something went wrong, please try again');
            return false
        }
    }
    catch(error){
        toast.error('Something went wrong');
        logout();
        return false
    }
}
// Summary sales
export const salesSummaryRequest = async () => {
    try{
        let url = BASE_URL + '/salesSummary';
        let response = await axios.get(url, AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
            let value = response.data.data[0]
            if(value && value.total && value.total[0]){
                store.dispatch(setSalesChart(value.last30Days))
                store.dispatch(setSalesTotal(value.total[0].totalAmount))
                return true
            }
            else{
                toast.error('Sales is empty');
                return false
            }
        }
        else{
            toast.error('Something went wrong, please try again');
            return false
        }
    }
    catch(error){
        toast.error('Something went wrong');
        logout();
        return false
    }
}
// Summary Return
export const returnSummaryRequest = async () => {
    try{
        let url = BASE_URL + '/returnSummary';
        let response = await axios.get(url, AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
            let value = response.data.data[0]
            if(value && value.total && value.total[0]){
                store.dispatch(setReturnsChart(value.last30Days))
                store.dispatch(setReturnsTotal(value.total[0].totalAmount))
                return true
            }
            else{
                toast.error('Return is empty');
                return false
            }
        }
        else{
            toast.error('Something went wrong, please try again');
            return false
        }
    }
    catch(error){
        toast.error('Something went wrong');
        logout();
        return false
    }
}

// Summary Expense
export const expenseSummaryRequest = async () => {
    try{
        let url = BASE_URL + '/expenseSummary';
        let response = await axios.get(url, AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
            let value = response.data.data[0]
            if(value && value.total && value.total[0]){
                store.dispatch(setExpenseChart(value.last30Days))
                store.dispatch(setExpenseTotal(value.total[0].totalAmount))
                return true
            }
            else{
                toast.error('Expense is empty');
                return false
            }
        }
        else{
            toast.error('Something went wrong, please try again');
            return false
        }
    }
    catch(error){
        toast.error('Something went wrong');
        logout();
        return false
    }
}