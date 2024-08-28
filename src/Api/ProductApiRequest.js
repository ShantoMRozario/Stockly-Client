
import { toast } from "react-toastify";
import { getAuthToken, logout } from "../Helper/SessionHelper";
import { BASE_URL } from "../Helper/Config";
import axios from "axios";
import { store } from "../Redux/Store/store";
import { resetFormValue, setBrandDropdown, setCategoryDropdown, setFormValue, setProduct, setTotal } from "../Redux/Slices/ProductSlice";
import { setProductFullPage } from "../Redux/Slices/ProductFullPageSlice";
const AxiosHeader = {headers:{'token':getAuthToken()}}

//Brand dropdown
export async function brandDropdownRequest() {
    try{
        let url = BASE_URL + '/brandDropdown';
        let response = await axios.get(url, AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
            if(response.data.data.length > 0){
                store.dispatch(setBrandDropdown(response.data.data))
            }
            else{
                store.dispatch(setBrandDropdown([]))  
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
//Category dropdown
export async function categoryDropdownRequest() {
    try{
        let url = BASE_URL + '/categoryDropdown';
        let response = await axios.get(url, AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
            if(response.data.data.length > 0){
                store.dispatch(setCategoryDropdown(response.data.data))
            }
            else{
                store.dispatch(setCategoryDropdown([]))  
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

//Create Update Product API
export async function createUpdateProductRequest(postBody, id) {
    try{
        let url = BASE_URL + '/createProduct';
        if(id){
            url = BASE_URL + `/updateProduct/${id}`;
        }
        let response = await axios.post(url, postBody, AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
            toast.success(`Product ${id ? 'Updated' : 'Created'} Successfully`);
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

//Product Details API
export async function productDetailsRequest(id) {
    try{
        let url = BASE_URL + `/productDetails/${id}`;
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
//product full page api
export async function productFullPageRequest(id) {
    try{
        let url = BASE_URL + `/productDetails/${id}`;
        let response = await axios.get(url, AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
            if(response.data.data.length > 0){
                store.dispatch(setProductFullPage(response.data.data))
            }
            else{
                store.dispatch(setProductFullPage([]))
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

//Product List API
export async function productListRequest(pageNumber, perPage, search) {
    try{
        let url = BASE_URL + `/productList/${pageNumber}/${perPage}/${search}`;
        let response = await axios.get(url, AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
            if(response.data.data[0]?.data.length > 0){
                store.dispatch(setProduct(response.data.data[0].data))
                store.dispatch(setTotal(response.data.data[0].total))
            }
            else{
                store.dispatch(setProduct([]))
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

//Delete Product API
export async function deleteProductRequest(id) {
    try{
        let url = BASE_URL + `/deleteProduct/${id}`;
        let response = await axios.get(url, AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
            toast.success('Product Deleted Successfully');
            return true
        }
        if(response.status === 200 && response.data.status === 'Associated'){
            toast.error('Product has associated data');
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
