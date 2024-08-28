import { useEffect, useState } from "react";
import ButtonLoader from "../../Utilities/ButtonLoader";
import { useDispatch, useSelector } from "react-redux";
import {store} from "../../Redux/Store/store";
import { useNavigate, useParams } from "react-router-dom";
import { setFormValue } from "../../Redux/Slices/SupplierSlice";
import { createUpdateSupplierRequest, supplierDetailsRequest } from "../../Api/SupplierApiRequest";


const SupplierCreateUpdate = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const formValue = useSelector((state) => (state.suppliers?.formValue));
  
      const [name, setName] = useState('');
      const [phone, setPhone] = useState('');
      const [email, setEmail] = useState('');
      const [address, setAddress] = useState('');
    
      const [nameError, setNameError] = useState('');
      const [phoneError, setPhoneError] = useState('');
      const [emailError, setEmailError] = useState('');
      const [addressError, setAddressError] = useState('');
    
      const [loader, setLoader] = useState(false);
    
      const validateEmail = (input) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(input);
      };
    
      const validatePhone = (input) => {
        const phoneRegex = /^[0-9]{11}$/;
        return phoneRegex.test(input);
      };
  
      useEffect(() => {
        if(id){
          supplierDetailsRequest(id)
        }
      }, [id])
    
      const handleSubmit = async(e) => {
        e.preventDefault();
    
        setNameError('');
        setPhoneError('');
        setEmailError('');
        setAddressError('');
  
        if(formValue.supplierName && formValue.phoneNumber && formValue.email && formValue.address){
          setLoader(true);
          let result = await createUpdateSupplierRequest(formValue, id);
          if(result == true){
            setLoader(false);
            navigate('/supplier-list');
          }
          else{
            setLoader(false);
          }
        } 
        else {
          if (!formValue.supplierName) {
            setNameError('Name is required');
          }
          if (!validatePhone(phone)) {
            setPhoneError('Invalid phone number');
          }
          if (!validateEmail(email)) {
            setEmailError('Invalid email format');
          }
          if(!formValue.phoneNumber){
            setPhoneError('Phone is required');
          }
          if(!formValue.email){
            setEmailError('Email is required');
          }
          if(!formValue.address){
            setAddressError('Address is required');
          }
        }
      }

      return (
        <div>
            <h1 className="text-3xl font-bold mb-10 mt-5 text-center">{id ? 'Update Supplier' : 'Create Supplier'}</h1>
            <form className="form flex flex-wrap gap-3 justify-around" onSubmit={handleSubmit}>
                <div className="w-[45%]">
                    <label className="ml-1 capitalize">Name</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Enter Supplier Name"
                        value={formValue?.supplierName} 
                        onChange={(e)=> {store.dispatch(setFormValue({name:'supplierName',value:e.target.value}))}}
                    />
                    {{nameError} && <p className="text-red-500 text-sm mt-2 mb-2">{nameError}</p>}
                </div>
                <div className="w-[45%]">
                    <label className="ml-1 capitalize">Phone</label>
                    <input
                        type="number"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Enter Supplier Phone"
                        value={formValue?.phoneNumber} 
                        onChange={(e)=> {store.dispatch(setFormValue({name:'phoneNumber',value:e.target.value})), setPhone(e.target.value)}}
                    />
                    {{phoneError} && <p className="text-red-500 text-sm mt-2 mb-2">{phoneError}</p>}
                </div>
                <div className="w-[45%]">
                    <label className="ml-1 capitalize">Email</label>
                    <input
                        type="email"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Enter Supplier Email"
                        value={formValue?.email} 
                        onChange={(e)=> {store.dispatch(setFormValue({name:'email',value:e.target.value})), setEmail(e.target.value)}}
                    />
                    {{emailError} && <p className="text-red-500 text-sm mt-2 mb-2">{emailError}</p>}
                </div>
                <div className="w-[45%]">
                    <label className="ml-1 capitalize">Address</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Enter Supplier Address"
                        value={formValue?.address} 
                        onChange={(e)=> {store.dispatch(setFormValue({name:'address',value:e.target.value}))}}
                    />
                    {{addressError} && <p className="text-red-500 text-sm mt-2 mb-2">{addressError}</p>}
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
                    Update Supplier
                    </button>
                    :
                    <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200">
                    Create New Supplier
                    </button>
                    )
                }
                </div>

            </form>
        </div>
    );
};

export default SupplierCreateUpdate;