import { toast } from "react-toastify";
import { getAuthToken, logout } from "../Helper/SessionHelper";
import { BASE_URL } from "../Helper/Config";
import axios from "axios";
import { store } from "../Redux/Store/store";
import { resetFormValue, setCategory, setFormValue, setTotal } from "../Redux/Slices/CategorySlice";
const AxiosHeader = {headers:{'token':getAuthToken()}}


//Create Update Category API
export async function createUpdateCategoryRequest(postBody, id) {
    try{
        let url = BASE_URL + '/createCategory';
        if(id){
            url = BASE_URL + `/updateCategory/${id}`;
        }

        let response = await axios.post(url, postBody, AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
            toast.success(`Category ${id ? 'Updated' : 'Created'} Successfully`);
            store.dispatch(resetFormValue())    
            return true
        }
        else if(response.status === 200 && response.data.status === 'Failed'){
            if(response.data.data.keyPattern.name === 1){
                toast.error('Category Name already exists');
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

//Category Details API
export async function categoryDetailsRequest(id) {
    try{
        let url = BASE_URL + `/categoryDetails/${id}`;
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


//Category List API
export async function categoryListRequest(pageNumber,perPage,search) {
    try{
        let url = BASE_URL + `/categoryList/${pageNumber}/${perPage}/${search}`;
        let response = await axios.get(url, AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
           if(response.data.data[0]?.data.length > 0){
               store.dispatch(setCategory(response.data.data[0].data))
               store.dispatch(setTotal(response.data.data[0].total))
           }
           else{
               store.dispatch(setCategory([]))
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

//Delete Category
export async function deleteCategoryRequest(id) {
    try{
        let url = BASE_URL + `/deleteCategory/${id}`;
        let response = await axios.get(url, AxiosHeader);
        if(response.status === 200 && response.data.status === 'Success'){
            toast.success('Category Deleted Successfully');
            return true
        }
        if(response.status === 200 && response.data.status === 'Associated'){
                toast.error('Category has associated with products');
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