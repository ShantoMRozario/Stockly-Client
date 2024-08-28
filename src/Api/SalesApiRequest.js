 
import { toast } from "react-toastify";
import { getAuthToken, logout } from "../Helper/SessionHelper";
import { BASE_URL } from "../Helper/Config";
import axios from "axios";
import { store } from "../Redux/Store/store";
import { setCustomerDropdown, setProductDropdown, setSale, setTotal } from "../Redux/Slices/SalesSlice";
const AxiosHeader = {headers:{'token':getAuthToken()}}
 

//product Dropdonw
export async function productDropdownRequest() {
    try{
        let url = BASE_URL + '/productDropdown';
        let response = await axios.get(url, AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
            if(response.data.data.length > 0){
                store.dispatch(setProductDropdown(response.data.data))
            }
            else{
                store.dispatch(setProductDropdown([]))  
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

//Customer Dropdown
export async function customerDropdownRequest() {
    try{
        let url = BASE_URL + '/customerDropdown';
        let response = await axios.get(url, AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
            if(response.data.data.length > 0){
                store.dispatch(setCustomerDropdown(response.data.data))
            }
            else{
                store.dispatch(setCustomerDropdown([]))  
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

//Sales List API
export async function salesListRequest(pageNumber,perPage,search) {
    try{
        let url = BASE_URL + `/salesList/${pageNumber}/${perPage}/${search}`;;
        let response = await axios.get(url, AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
            if(response.data.data[0]?.data.length > 0){
                store.dispatch(setSale(response.data.data[0].data))
                store.dispatch(setTotal(response.data.data[0].total))
            }
            else{
                store.dispatch(setSale([]))
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

//Sales Create API
export async function salesCreateRequest(parentBody,childBody) {
    try{
        let postBody = {
            parent : parentBody,
            childs : childBody
        }
        let url = BASE_URL + '/createSales';
        let response = await axios.post(url, postBody, AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
            toast.success('Sales Created Successfully');
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

//Delete Sales API
export async function deleteSalesRequest(id) {
    try{
        let url = BASE_URL + `/salesDelete/${id}`;
        let response = await axios.get(url, AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
            toast.success('Sales Deleted Successfully');
            return true
        }
        if(response.status === 200 && response.data.status === 'Associated'){
            toast.error('Sales has associated data');
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