
import { toast } from "react-toastify";
import { getAuthToken, logout } from "../Helper/SessionHelper";
import { BASE_URL } from "../Helper/Config";
import axios from "axios";
import { store } from "../Redux/Store/store";
import { resetFormValue, setBrand, setFormValue, setTotal } from "../Redux/Slices/BrandSlice";
const AxiosHeader = {headers:{'token':getAuthToken()}}


//Create Update Brand API
export async function createUpdateBrandRequest(postBody, id) {
    try{
        let url = BASE_URL + '/createBrands';
        if(id){
            url = BASE_URL + `/updateBrand/${id}`;
        }

        let response = await axios.post(url, postBody, AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
            toast.success(`Brand ${id ? 'Updated' : 'Created'} Successfully`);
            store.dispatch(resetFormValue())    
            return true
        }
        else if(response.status === 200 && response.data.status === 'Failed'){
            if(response.data.data.keyPattern.name === 1){
                toast.error('Brand Name already exists');
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

//Brand Details API
export async function brandDetailsRequest(id) {
    try{
        let url = BASE_URL + `/brandDetails/${id}`;
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

//Brand List API
export async function brandListRequest(pageNumber,perPage,search) {
    try{
        let url = BASE_URL + `/brandList/${pageNumber}/${perPage}/${search}`;
        let response = await axios.get(url, AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
           if(response.data.data[0]?.data.length > 0){
               store.dispatch(setBrand(response.data.data[0].data))
               store.dispatch(setTotal(response.data.data[0].total))
           }
           else{
               store.dispatch(setBrand([]))
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

//Brand Delete API
export async function deleteBrandRequest(id) {
    try{
        let url = BASE_URL + `/deleteBrand/${id}`;
        let response = await axios.get(url, AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
            toast.success('Brand Deleted Successfully');
            return true
        }
        if(response.status === 200 && response.data.status === 'Associated'){
                toast.error('Brand has associated with products');
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
