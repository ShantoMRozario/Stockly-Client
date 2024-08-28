import { toast } from "react-toastify";
import { getAuthToken, logout } from "../Helper/SessionHelper";
import { resetFormValue, setFormValue, setTotal,setSupplier } from "../Redux/Slices/SupplierSlice";
import axios from "axios";
import { BASE_URL } from "../Helper/Config";
import { store } from "../Redux/Store/store";

const AxiosHeader = {headers:{'token':getAuthToken()}}

//Create Supplier API
export async function createUpdateSupplierRequest(postBody, id) {
    try{
        let url = BASE_URL + '/createSupplier';
        if(id){
            url = BASE_URL + `/updateSupplier/${id}`;
        }

        let response = await axios.post(url, postBody, AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
            toast.success(`Supplier ${id ? 'Updated' : 'Created'} Successfully`);
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

//Supplier Details API
export async function supplierDetailsRequest(id) {
    try{
        let url = BASE_URL + `/supplierDetails/${id}`;
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

//Supplier List API
export async function supplierListRequest(pageNumber,perPage,search) {
    let url = BASE_URL + `/supplierList/${pageNumber}/${perPage}/${search}`;
    try{
        let response = await axios.get(url, AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
            if(response.data.data[0]?.data.length > 0){
                store.dispatch(setSupplier(response.data.data[0].data))
                store.dispatch(setTotal(response.data.data[0].total))
            }
            else{
                store.dispatch(setSupplier([]))
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


//Delete Supplier API
export async function deleteSupplierRequest(id) {
    try{
        let url = BASE_URL + `/deleteSupplier/${id}`;
        let response = await axios.get(url, AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
            toast.success('Supplier Deleted Successfully');
            return true
        }
        if(response.status === 200 && response.data.status === 'Associated'){
            toast.error('Supplier has associated data');
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