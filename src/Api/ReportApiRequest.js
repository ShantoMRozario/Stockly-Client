
 
import { toast } from "react-toastify";
import { getAuthToken, logout } from "../Helper/SessionHelper";
import { BASE_URL } from "../Helper/Config";
import axios from "axios";
import { store } from "../Redux/Store/store";
import {setExpensesReportByDate, setPurchasesReportByDate, setReturnsReportByDate, setSalesReportByDate } from "../Redux/Slices/ReportSlice";
const AxiosHeader = {headers:{'token':getAuthToken()}}

//Sale Report Api
export async function saleReportRequest(fromDate,toDate) {
    try{
        let postBody = {
            fromDate:fromDate + 'T00:00:00.000+00:00',
            toDate:toDate + 'T00:00:00.000+00:00'
        }
        let url = BASE_URL + '/createSalesReport';
        let response = await axios.post(url,postBody,AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
            store.dispatch(setSalesReportByDate(response.data.data))
            return true
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

//Purchase Report Api
export  async function purchaseReportRequest(fromDate,toDate) {
    try{
        let postBody = {
            fromDate:fromDate + 'T00:00:00.000+00:00',
            toDate:toDate + 'T00:00:00.000+00:00'
        }
        let url = BASE_URL + '/createPurchaseReport';
        let response = await axios.post(url,postBody,AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
            store.dispatch(setPurchasesReportByDate(response.data.data))
            return true
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

//Expense Report Api
export async function expenseReportRequest(fromDate,toDate) {
    try{
        let postBody = {
            fromDate:fromDate + 'T00:00:00.000+00:00',
            toDate:toDate + 'T00:00:00.000+00:00'
        }
        let url = BASE_URL + '/createExpenseReport';
        let response = await axios.post(url,postBody,AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
            store.dispatch(setExpensesReportByDate(response.data.data))
            return true
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

//Return Report Api
export async function returnReportRequest(fromDate,toDate) {
    try{
        let postBody = {
            fromDate:fromDate + 'T00:00:00.000+00:00',
            toDate:toDate + 'T00:00:00.000+00:00'
        }
        let url = BASE_URL + '/createReturnReport';
        let response = await axios.post(url,postBody,AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
            store.dispatch(setReturnsReportByDate(response.data.data))
            return true
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