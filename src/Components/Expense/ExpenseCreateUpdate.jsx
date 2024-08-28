
import { useEffect, useState } from "react";
import ButtonLoader from "../../Utilities/ButtonLoader";
import { useDispatch, useSelector } from "react-redux";
import { setFormValue } from "../../Redux/Slices/ExpenseSlice";
import {store} from "../../Redux/Store/store";
import { useNavigate, useParams } from "react-router-dom";
import { createUpdateExpenseRequest, expenseDetailsRequest, expenseDropdownRequest } from "../../Api/ExpenseApiRequest";

const ExpenseCreateUpdate = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();
  
  const [details, setDetails] = useState('');
  const [amount, setAmount] = useState('');
  const [expenseType, setExpenseType] = useState('');
  
  const [detailsError, setDetailsError] = useState('');
  const [amountError, setAmountError] = useState('');
  const [expenseTypeError, setExpenseTypeError] = useState('');
  
  const [loader, setLoader] = useState(false);
  
  useEffect(() => {
    (async () => {
      await expenseDropdownRequest()
    })()
    if(id){
      expenseDetailsRequest(id)
    }
  },[])
        
  const formValue = useSelector((state) => state.expense.formValue);
  const expenseTypeDropdown = useSelector((state) =>state.expense.expenseTypeDropdown);
  // console.log(expenseTypeDropdown);

    const handleSubmit = async(e) => {
      e.preventDefault();
  
      setDetailsError('');
      setAmountError('');
      setExpenseTypeError('');

      if(formValue.details && formValue.amount && formValue.expenseTypeId){
        setLoader(true);
        let result = await createUpdateExpenseRequest(formValue, id);
        if(result == true){
          setLoader(false);
          navigate('/expense-list');
        }
        else{
          setLoader(false);
        }
      } 
      else {
        if(!formValue.details){
            setDetailsError('Details is required');
          }
          if(!formValue.amount){
            setAmountError('Amount is required');
          }
          if(!formValue.expenseTypeId){
            setExpenseTypeError('Expense Type is required');
          }
      }
    }
    return (
        <div>
            <h1 className="text-3xl font-bold mb-10 mt-5 text-center">{id ? 'Update Expense' : 'Create Expense'}</h1>
            <form className="form flex flex-wrap gap-3 justify-around" onSubmit={handleSubmit}>
                <div className="w-[45%]">
                    <label className="ml-1 capitalize">Details</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Enter Details"
                        value={formValue?.details} 
                        onChange={(e)=> {store.dispatch(setFormValue({name:'details',value:e.target.value})), setDetails(e.target.value)}}
                    />
                    {{detailsError} && <p className="text-red-500 text-sm mt-2 mb-2">{detailsError}</p>}
                </div>
                <div className="w-[25%]">
                    <label className="ml-1 capitalize">amount</label>
                    <input
                        type="number"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Enter amount"
                        value={formValue?.amount} 
                        onChange={(e)=> {store.dispatch(setFormValue({name:'amount',value:e.target.value})), setAmount(e.target.value)}}
                    />
                    {{amountError} && <p className="text-red-500 text-sm mt-2 mb-2">{amountError}</p>}
                </div>
                <div className="w-[15%]">
                    <label className="ml-1 capitalize">Expense Type</label>
                    <select className="select select-bordered w-full max-w-xs focus-within:outline-none" 
                    value={formValue?.expenseTypeId} 
                    onChange={(e)=> {store.dispatch(setFormValue({name:'expenseTypeId',value:e.target.value})), setExpenseType(e.target.value)}}
                    >
                        <option disabled selected value={''}>Select Type</option>
                        {
                          expenseTypeDropdown?.map((data) =>{
                            return(
                              <option className="cursor-pointer" key={data._id} value={data._id}>{data.name}</option>
                            )
                          })
                        }
                    </select>
                    {{expenseTypeError} && <p className="text-red-500 text-sm mt-2 mb-2">{expenseTypeError}</p>}
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
                    Update Customer
                    </button>
                    :
                    <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200">
                    Create New Customer
                    </button>
                    )
                }
                </div>

            </form>
        </div>
    );
};

export default ExpenseCreateUpdate;