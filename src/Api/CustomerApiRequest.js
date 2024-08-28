import { toast } from "react-toastify";
import { getAuthToken, logout } from "../Helper/SessionHelper";
import { BASE_URL } from "../Helper/Config";
import axios from "axios";
import { store } from "../Redux/Store/store";
import { resetFormValue, setCustomer, setFormValue, setTotal } from "../Redux/Slices/CustomerSlice";
const AxiosHeader = {headers:{'token':getAuthToken()}}


//Create and update Customer API
export async function createUpdateCustomerRequest(postBody, id) {
    try{
        let url = BASE_URL + '/createCustomer';
        if(id){
            url = BASE_URL + `/updateCustomer/${id}`;
        }

        let response = await axios.post(url, postBody, AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
            toast.success(`Customer ${id ? 'Updated' : 'Created'} Successfully`);
            store.dispatch(resetFormValue())
            return true
        }
        else if(response.status === 200 && response.data.status === 'Failed'){
            if(response.data.data.keyPattern.phoneNumber === 1){
                toast.error('Phone number already exists');
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

//Customer Details API
export async function customerDetailsRequest(id) {
    try{
        let url = BASE_URL + `/customerDetails/${id}`;
        let response = await axios.get(url, AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
            let value = response.data.data[0]

            //single Line code for dispatching form value
            // store.dispatch(setFormValue({name:'customerName', value:value.customerName}))
            // store.dispatch(setFormValue({name:'phoneNumber', value:value.phoneNumber}))
            // store.dispatch(setFormValue({name:'email', value:value.email}))
            // store.dispatch(setFormValue({name:'address', value:value.address}))

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

//Customer List API
export async function customerListRequest(pageNumber,perPage,search) {
    let url = BASE_URL + `/customerList/${pageNumber}/${perPage}/${search}`;
    try{
        let response = await axios.get(url, AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
            if(response.data.data[0]?.data.length > 0){
                store.dispatch(setCustomer(response.data.data[0].data))
                store.dispatch(setTotal(response.data.data[0].total))
            }
            else{
                store.dispatch(setCustomer([]))
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

//Delete Customer API
export async function deleteCustomerRequest(id) {
    try{
        let url = BASE_URL + `/deleteCustomer/${id}`;
        let response = await axios.get(url, AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
            toast.success('Customer Deleted Successfully');
            return true
        }
        if(response.status === 200 && response.data.status === 'Associated'){
            toast.error('Customer has associated data');
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