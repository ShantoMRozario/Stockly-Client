import { useEffect, useState } from "react";
import ButtonLoader from "../../Utilities/ButtonLoader";
import { useDispatch, useSelector } from "react-redux";
import { setFormValue } from "../../Redux/Slices/BrandSlice";
import {store} from "../../Redux/Store/store";
import { useNavigate, useParams } from "react-router-dom";
import { brandDetailsRequest, createUpdateBrandRequest } from "../../Api/BrandApiRequest";

const CreateUpdateBrand = () => {

    const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();
  const formValue = useSelector((state) => (state.brand.formValue));

  console.log(formValue);
  
    const [nameError, setNameError] = useState('');
    const [loader, setLoader] = useState(false);

    useEffect(() => {
      if(id){
        brandDetailsRequest(id)
      }
    }, [id])
  
    const handleSubmit = async(e) => {
      e.preventDefault();
        setNameError('');

      if(formValue.name){
        setLoader(true);
        let result = await createUpdateBrandRequest(formValue, id);
        if(result == true){
          setLoader(false);
          navigate('/brand-list');
        }
        else{
          setLoader(false);
        }
      } 
      else {
        if (!formValue.name) {
          setNameError('Brand Name is required');
        }
      }
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-10 mt-5 text-center">{id ? 'Update Brand Name' : 'Create Brand Name'}</h1>
            <form className="form " onSubmit={handleSubmit}>
                <div className="w-[45%]">
                    <label className="ml-1 capitalize">Brand Name</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Enter Brand Name"
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
                    Update Brand Name
                    </button>
                    :
                    <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200">
                    Create New Brand Name
                    </button>
                    )
                }
                </div>

            </form>
        </div>
    );
};

export default CreateUpdateBrand;