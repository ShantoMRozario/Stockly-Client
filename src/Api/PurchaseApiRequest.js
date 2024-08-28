 
import { toast } from "react-toastify";
import { getAuthToken, logout } from "../Helper/SessionHelper";
import { BASE_URL } from "../Helper/Config";
import axios from "axios";
import { store } from "../Redux/Store/store";
import { resetFormValue, setFormValue, setProductDropdown, setSupplierDropdown, setTotal, setPurchase } from "../Redux/Slices/PurchaseSlice";
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

//Supplier Dropdonw
export async function supplierDropdownRequest() {
    try{
        let url = BASE_URL + '/supplierDropdown';
        let response = await axios.get(url, AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
            if(response.data.data.length > 0){
                store.dispatch(setSupplierDropdown(response.data.data))
            }
            else{
                store.dispatch(setSupplierDropdown([]))  
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

//Purchase List api
export async function purchaseListRequest(pageNumber,perPage,search) {
    try{
        let url = BASE_URL + `/purchaseList/${pageNumber}/${perPage}/${search}`;

        let response = await axios.get(url, AxiosHeader);

        if(response.status === 200 && response.data.status === 'Success'){
            if(response.data.data[0]?.data.length > 0){
                store.dispatch(setPurchase(response.data.data[0].data))
                store.dispatch(setTotal(response.data.data[0].total))
            }
            else{
                store.dispatch(setPurchase([]))
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

//Purchase Create api
export async function purchaseCreateRequest(parentBody,childBody) {
    try{
        let postBody = {
            parent : parentBody,
            childs : childBody
        }
        let url = BASE_URL + '/createPurchase';

        let response = await axios.post(url, postBody, AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
            toast.success('Purchase Created Successfully');
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

//Delete Purchase API
export async function deletePurchaseRequest(id) {
    try{
        let url = BASE_URL + `/purchaseDelete/${id}`;
        let response = await axios.get(url, AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
            toast.success('Purchase Deleted Successfully');
            return true
        }
        if(response.status === 200 && response.data.status === 'Associated'){
            toast.error('Purchase has associated data');
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