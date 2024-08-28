import { useEffect, useState } from "react";
import ButtonLoader from "../../Utilities/ButtonLoader";
import { useDispatch, useSelector } from "react-redux";
import { resetFormValue, setFormValue } from "../../Redux/Slices/ProductSlice";
import {store} from "../../Redux/Store/store";
import { useNavigate, useParams } from "react-router-dom";
import { brandDropdownRequest, categoryDropdownRequest, createUpdateProductRequest, productDetailsRequest } from "../../Api/ProductApiRequest";

const ProductCreateUpdate = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

    const formValue = useSelector((state) => (state.product.formValue));
    const brandDropdown = useSelector((state) => (state.product.brandDropdown));
    const categoryDropdown = useSelector((state) => (state.product.categoryDropdown));


    const [fileInputKey, setFileInputeKey] = useState(Date.now());
    const [newImages, setNewImages] = useState([]);
    const [initialImages, setInitialImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

      const [productNameError, setProductNameError] = useState('');
      const [unitError, setUnitError] = useState('');
      const [detailsError, setDetailsError] = useState('');
      const [brandDropdownError, setBrandDropdownError] = useState('');
      const [categroyDropdownError, setCategroyDropdownError] = useState('');
    
      const [loader, setLoader] = useState(false);
  
      useEffect(() => {
        (async () => {
            await brandDropdownRequest()
            await categoryDropdownRequest()

            if(id){
                const success = await productDetailsRequest(id)
                if(success){
                    const currentImages = store.getState().product.formValue.images || []
                    setInitialImages(currentImages)
                    setImagesPreview(currentImages.map((image) => (typeof image === 'string' ? image : URL.createObjectURL(image))))
                }
                else{
                    store.dispatch(resetFormValue())
                    setFileInputeKey(Date.now()) //to re-render file input
                    setNewImages([]) // clean up new images
                    setImagesPreview([]) // clean up image preview
                }
            }
          })()
          // cleanup function to remove image preview from memory
          return () => {
            setImagesPreview([])
            store.dispatch(setFormValue({name:'images', value:[]}))
          }
      }, [id])
    
      const handleSubmit = async(e) => {
        e.preventDefault();
    
        setProductNameError('');
        setUnitError('');
        setDetailsError('');
        setBrandDropdownError('');
        setCategroyDropdownError('');
  
        if(formValue.productName && formValue.unit && formValue.details && formValue.categoryId, formValue.brandId){
          setLoader(true);
          const formData = new FormData();
          formData.append('productName', formValue.productName);
          formData.append('unit', formValue.unit);
          formData.append('details', formValue.details);
          formData.append('categoryId', formValue.categoryId);
          formData.append('brandId', formValue.brandId);
        // Add images 
        newImages.forEach((image) => {
          formData.append('images', image);
        })
          let result = await createUpdateProductRequest(formData, id);
          if(result == true){
            setLoader(false);
            navigate('/product-list');
          }
          else{
            setLoader(false);
          }
        } 
        else {
          if (!formValue.productName) {
            setProductNameError('Product Name is required');
          }
          if(!formValue.unit){
            setUnitError('Unit is required');
          }
          if(!formValue.details){
            setDetailsError('Details is required');
          }
          if(!formValue.categoryId){
            setBrandDropdownError('Category is required');
          }
          if(!formValue.brandId){
            setCategroyDropdownError('Brand is required');
          }
        }
      }
     
      const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setNewImages(files)
        const imagePreviewArray = files.map((file) => URL.createObjectURL(file));
        setImagesPreview(imagePreviewArray)
      };
    
      const handleImageRemove = (image) => {
        const newImagePreview = imagesPreview.filter((_,i) => i !== image);
        setImagesPreview(newImagePreview)
        const newFiles = newImages.filter((_,i) => i !== image);
        setNewImages(newFiles)
      };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-10 mt-5 text-center">{id ? 'Update Product' : 'Create Product'}</h1>
            <form className="form flex flex-wrap gap-3 justify-around" onSubmit={handleSubmit}>
                <div className="w-[45%]">
                    <label className="ml-1 capitalize">Product Name</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Enter Customers Name"
                        value={formValue?.productName} 
                        onChange={(e)=> {store.dispatch(setFormValue({name:'productName',value:e.target.value}))}}
                    />
                    {{productNameError} && <p className="text-red-500 text-sm mt-2 mb-2">{productNameError}</p>}
                </div>
                <div className="w-[45%]">
                    <label className="ml-1 capitalize">unit</label>
                    <input
                        type="number"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Enter Customers Phone"
                        value={formValue?.unit} 
                        onChange={(e)=> {store.dispatch(setFormValue({name:'unit',value:e.target.value}))}}
                    />
                    {{unitError} && <p className="text-red-500 text-sm mt-2 mb-2">{unitError}</p>}
                </div>
                <div className="w-[45%]">
                    <label className="ml-1 capitalize">details</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Enter Customers Email"
                        value={formValue?.details} 
                        onChange={(e)=> {store.dispatch(setFormValue({name:'details',value:e.target.value}))}}
                    />
                    {{detailsError} && <p className="text-red-500 text-sm mt-2 mb-2">{detailsError}</p>}
                </div>
                <div className="w-[20%]">
                    <label className="ml-1 capitalize">Brands</label>
                    <select className="select select-bordered w-full max-w-xs focus-within:outline-none" 
                    value={formValue?.brandId} 
                    onChange={(e)=> {store.dispatch(setFormValue({name:'brandId',value:e.target.value}))}}
                    >
                        <option disabled selected value={''}>Select Type</option>
                        {
                          brandDropdown?.map((data) =>{
                            return(
                              <option className="cursor-pointer" key={data._id} value={data._id}>{data.name}</option>
                            )
                          })
                        }
                    </select>
                    {{brandDropdownError} && <p className="text-red-500 text-sm mt-2 mb-2">{brandDropdownError}</p>}
                </div>
                <div className="w-[20%]">
                    <label className="ml-1 capitalize">Category</label>
                    <select className="select select-bordered w-full max-w-xs focus-within:outline-none" 
                    value={formValue?.categoryId} 
                    onChange={(e)=> {store.dispatch(setFormValue({name:'categoryId',value:e.target.value}))}}
                    >
                        <option disabled selected value={''}>Select Type</option>
                        {
                          categoryDropdown?.map((data) =>{
                            return(
                              <option className="cursor-pointer" key={data._id} value={data._id}>{data.name}</option>
                            )
                          })
                        }
                    </select>
                    {{categroyDropdownError} && <p className="text-red-500 text-sm mt-2 mb-2">{categroyDropdownError}</p>}
                </div>
                <div className="w-[90%] text-center">
                        <label className="pb-2 capitalize font-bold">Image Preview</label>
                    <div className=" p-2 border rounded-lg border-spacing-6 overflow-y-scroll h-[270px] flex justify-center items-center gap-3">
                        {
                            imagesPreview?.map((src,i) => {
                                return(
                                <div className="">
                                    <img src={src} alt={`preview${i}`} className=" w-[300px]" />
                                </div>      

                                )
                            })
                        }                 
                    </div>
                </div>

                <div className="w-[80%]">
                    <input
                        type="file"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Enter image"
                        onChange={handleImageChange}
                        key={fileInputKey}
                        multiple
                    />
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
                    Update Product 
                    </button>
                    :
                    <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200">
                    Create New Product
                    </button>
                    )
                }
                </div>

            </form>
        </div>
    );
};

export default ProductCreateUpdate;