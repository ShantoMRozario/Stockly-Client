
import { toast } from "react-toastify";
import { getAuthToken, logout } from "../Helper/SessionHelper";
import { BASE_URL } from "../Helper/Config";
import axios from "axios";
import { store } from "../Redux/Store/store";
import { resetFormValue, setExpenseType, setFormValue, setTotal } from "../Redux/Slices/ExpenseTypeSlice";
const AxiosHeader = {headers:{'token':getAuthToken()}}

//Create Update Expense Type API
export async function createUpdateExpenseTypeRequest(postBody, id) {
    try{
        let url = BASE_URL + '/createExpenseType';
        if(id){
            url = BASE_URL + `/updateExpenseType/${id}`;
        }

        let response = await axios.post(url, postBody, AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
            toast.success(`Expense Type ${id ? 'Updated' : 'Created'} Successfully`);
            store.dispatch(resetFormValue())
            return true
        }
        else if(response.status === 200 && response.data.status === 'Failed'){
            if(response.data.data.keyPattern.name === 1){
                toast.error('Expense Type Name already exists');
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

//Expense Type Details API
export async function expenseTypeDetailsRequest(id) {
    try{
        let url = BASE_URL + `/expenseTypeDetails/${id}`;
        let response = await axios.get(url, AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
            let value = response.data.data[0]
            Object.entries(value).forEach(([key, value]) => {
                store.dispatch(setFormValue({name:key, value:value}))
            })
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

//Expense Type List API
export async function expenseTypeListRequest(pageNumber,perPage,search) {
    let url = BASE_URL + `/expenseTypeList/${pageNumber}/${perPage}/${search}`;
    try{
        let response = await axios.get(url, AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
            if(response.data.data[0]?.data.length > 0){
                store.dispatch(setExpenseType(response.data.data[0].data))
                store.dispatch(setTotal(response.data.data[0].total))
            }
            else{
                store.dispatch(setExpenseType([]))
                store.dispatch(setTotal(0))
                toast.error('No Data Found');
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

//Delete Expense Type API
export async function deleteExpenseTypeRequest(id) {
    try{
        let url = BASE_URL + `/deleteExpenseType/${id}`;
        let response = await axios.get(url, AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
            toast.success('Expense Type Deleted Successfully');
            return true
        }
        if(response.status === 200 && response.data.status === 'Associated'){
            toast.error('Expense Type has associated data');
            return false 
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