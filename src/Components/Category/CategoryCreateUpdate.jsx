import { useEffect, useState } from "react";
import ButtonLoader from "../../Utilities/ButtonLoader";
import { useDispatch, useSelector } from "react-redux";
import { setFormValue } from "../../Redux/Slices/CategorySlice";
import {store} from "../../Redux/Store/store";
import { useNavigate, useParams } from "react-router-dom";
import { categoryDetailsRequest, createUpdateCategoryRequest } from "../../Api/CategoryApiRequest";

const CategoryCreateUpdate = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const formValue = useSelector((state) => (state.category.formValue));
  
    console.log(formValue);
    
      const [nameError, setNameError] = useState('');
      const [loader, setLoader] = useState(false);
  
      useEffect(() => {
        if(id){
            categoryDetailsRequest(id)
        }
      }, [id])
    
      const handleSubmit = async(e) => {
        e.preventDefault();
          setNameError('');
  
        if(formValue.name){
          setLoader(true);
          let result = await createUpdateCategoryRequest(formValue, id);
          if(result == true){
            setLoader(false);
            navigate('/category-list');
          }
          else{
            setLoader(false);
          }
        } 
        else {
          if (!formValue.name) {
            setNameError('Category Name is required');
          }
        }
      }

    return (
        <div>
        <h1 className="text-3xl font-bold mb-10 mt-5 text-center">{id ? 'Update Category Name' : 'Create Category Name'}</h1>
        <form className="form " onSubmit={handleSubmit}>
            <div className="w-[45%]">
                <label className="ml-1 capitalize">Category Name</label>
                <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Enter Category Name"
                    value={formValue?.name} 
                    onChange={(e)=> {store.dispatch(setFormValue({name:'name',value:e.target.value}))}}
                />
                {{nameError} && <p className="text-red-500 text-sm mt-2 mb-2">{nameError}</p>}
            </div>
            <div className="w-[45%]">
                {
                loader
                ?
                <ButtonLoader/>
                :
                (
                  id ?

                <button
                type="submit"
                className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition duration-200">
                Update Category Name
                </button>
                :
                <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200">
                Create New Category Name
                </button>
                )
            }
            </div>

        </form>
    </div>
    );
};

export default CategoryCreateUpdate;