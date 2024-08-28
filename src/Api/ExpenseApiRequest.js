
import { toast } from "react-toastify";
import { getAuthToken, logout } from "../Helper/SessionHelper";
import { BASE_URL } from "../Helper/Config";
import axios from "axios";
import { store } from "../Redux/Store/store";
import { resetFormValue, setExpense, setExpenseTypeDropdown, setFormValue, setTotal } from "../Redux/Slices/ExpenseSlice";
const AxiosHeader = {headers:{'token':getAuthToken()}}

//Expense Dropdonw
export async function expenseDropdownRequest() {
    try{
        let url = BASE_URL + '/expenseTypeDropdown';
        let response = await axios.get(url, AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
            if(response.data.data.length > 0){
                store.dispatch(setExpenseTypeDropdown(response.data.data))
            }
            else{
                store.dispatch(setExpenseTypeDropdown([]))  
                toast.error('No data found');
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

//Create Update Expense API
export async function createUpdateExpenseRequest(postBody, id) {
    try{
        let url = BASE_URL + '/createExpense';  
        if(id){
            url = BASE_URL + `/updateExpense/${id}`;
        }

        let response = await axios.post(url, postBody, AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
            toast.success(`Expense ${id ? 'Updated' : 'Created'} Successfully`);
            store.dispatch(resetFormValue())
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


//Expense Details API
export async function expenseDetailsRequest(id) {
    try{
        let url = BASE_URL + `/expenseDetails/${id}`;
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

//Expense List API
export async function expenseListRequest(pageNumber, perPage, search) {
    try{
        let url = BASE_URL + `/expenseDetailsList/${pageNumber}/${perPage}/${search}`;
        let response = await axios.get(url, AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
            if(response.data.data[0]?.data.length > 0){
                store.dispatch(setExpense(response.data.data[0].data))
                store.dispatch(setTotal(response.data.data[0].total))
            }
            else{
                store.dispatch(setExpense([]))
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

//Delete Expense API
export async function deleteExpenseRequest(id) {
    try{
        let url = BASE_URL + `/deleteExpense/${id}`;
        let response = await axios.get(url, AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
            toast.success('Expense Deleted Successfully');
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