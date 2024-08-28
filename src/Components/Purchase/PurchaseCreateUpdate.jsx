import { useEffect, useState } from "react";
import { productDropdownRequest, purchaseCreateRequest, supplierDropdownRequest } from "../../Api/PurchaseApiRequest";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeProducts, resetFormValue, setFormValue, setSelectedProducts } from "../../Redux/Slices/PurchaseSlice";
import { toast } from "react-toastify";
import { store } from "../../Redux/Store/store"; 


const PurchaseCreateUpdate = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    //....Fetch Data.... of product and supplier
    useEffect(() => {
        productDropdownRequest()
        supplierDropdownRequest()
    }, [])

    //... get data from redux store
    const productDropdown = useSelector((state) => state.purchase.productDropdown)
    const supplierDropdown = useSelector((state) => state.purchase.supplierDropdown)

    //.. get form values and seletected products from redux store
    const parentBody = useSelector((state) => state.purchase.formValue)
    const childBody = useSelector((state) => state.purchase.selectedProducts)

    //Local state for product details
    const [productId, setProductId] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')

    // calculate total
    useEffect(() => {
        let total = 0
        for (let item of childBody) {
            total += item.total
        }
        store.dispatch(setFormValue({name:'grandTotal', value: total + parentBody.vatTax + parentBody.shippingCost + parentBody.otherCost - parentBody.discount}))
    }, [childBody, parentBody.discount, parentBody.otherCost, parentBody.shippingCost, parentBody.vatTax])

    // Add product to cart
    const handleAddProduct = () => {
        if (productId && quantity && price) {
            let selectedProduct = productDropdown.find(product => product._id === productId)
            if(selectedProduct){
                let item = {
                    productId : productId,
                    productName : selectedProduct.productName,
                    quantity : quantity,
                    unitPrice : price,
                    total : quantity * price
                }
                store.dispatch(setSelectedProducts(item))
                //clear input after adding product
                setProductId('')
                setQuantity('')
                setPrice('')
            }
            else{
                toast.error('No product found')
            }
        }
        else{
            toast.error('All fields are required')
        }
    }

    // remove product from cart
    const handleRemoveProduct = (index) => {
        store.dispatch(removeProducts(index))
        console.log('remove product');
    }

    // Create Purchase
    const handleCreatePurchase = async() => {
        if(childBody.length === 0){
            toast.error('Please add a product')
        }

        //Validate parent body fields
        if(!parentBody.supplierId){
            toast.error('Please select supplier')
        }

        if(!parentBody.discount){
            toast.error('Please enter discount')
        }

        if(!parentBody.shippingCost){
            toast.error('Please enter shipping cost')
        }

        if(!parentBody.vatTax){
            toast.error('Please enter vat tax')
        }

        if(!parentBody.otherCost){
            toast.error('Please enter other cost')
        }

        if(!parentBody.details){
            toast.error('Please enter details')
        }

        if(!parentBody.grandTotal){
            toast.error('Please enter grand total')
        }


        // purchase api call
        let result = await purchaseCreateRequest(parentBody,childBody)

        if(result){
            toast.success('Purchase created successfully')
            navigate('/purchase-list')
            //reset form and selected products after successful purchase
            store.dispatch(resetFormValue())
        }
        else{
            toast.error('Something went wrong, please try again')
        }
    }

    return (
        <div>
        <h2 className="text-3xl font-bold mb-1 mt-5 text-center">Purchase Create</h2>
        <div className="flex flex-wrap justify-center w-full">
            <div className="w-[50%] p-5">
                <div className="mb-4">
                    <label className="block text-gray-700">Supplier</label>
                    <select
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        value={parentBody.supplierId}
                        onChange={(e) => dispatch(setFormValue({ name: 'supplierId', value: e.target.value }))}
                    >
                        <option value="">Select Supplier</option>
                        {supplierDropdown.map((supplier) => (
                            <option key={supplier._id} value={supplier._id}>{supplier.supplierName}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">VAT Tax</label>
                    <input
                        type="number"
                        placeholder="Enter VAT Tax"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        onChange={(e) =>{
                            const value = e.target.value.trim() === '' ? 0 : parseFloat(e.target.value);
                            store.dispatch(setFormValue({ name: 'vatTax', value }));
                        }}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Discount</label>
                    <input
                        type="number"
                        placeholder="Enter Discount"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        onChange={(e) => {
                        const value = e.target.value.trim() === '' ? 0 : parseFloat(e.target.value);
                        store.dispatch(setFormValue({ name: 'discount', value }));
                        }}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Other Cost</label>
                    <input
                        type="number"
                        placeholder="Enter Other Cost"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        onChange={(e) => {
                        const value = e.target.value.trim() === '' ? 0 : parseFloat(e.target.value);
                        store.dispatch(setFormValue({ name: 'otherCost', value }))}
                    }
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Shipping Cost</label>
                    <input
                        type="number"
                        placeholder="Enter Shipping Cost"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        onChange={(e) => {
                        const value = e.target.value.trim() === '' ? 0 : parseFloat(e.target.value);
                        store.dispatch(setFormValue({ name: 'shippingCost', value }))}
                        }
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Details</label>
                    <textarea
                    placeholder="Enter Details"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        onChange={(e) => dispatch(setFormValue({ name: 'details', value: e.target.value }))}
                    />
                </div>
                <div className="mb-4">
                        <label className="block text-gray-700">Total</label>
                        <input
                            type="number"                            
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            value={parentBody.grandTotal}
                            readOnly
                        />
                    </div>
            </div>
            <div className="w-[50%] p-5">
                <div className="flex flex-wrap gap-3 ">
                <div className="w-[50%] mb-1">
                    <label className="block text-gray-700">Product</label>
                    <select
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                    >
                        <option value="">Select Product</option>
                        {productDropdown && productDropdown.map((item, i) => (
                            <option key={i} value={item._id}>{item.productName}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-1 w-[25%]">
                    <label className="block text-gray-700">Quantity</label>
                    <input
                        type="number"
                        placeholder="Enter Quantity"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>
                <div className="mb-1 w-[20%]">
                    <label className="block text-gray-700">Price</label>
                    <input
                        type="number"
                        placeholder="Enter Price"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="mb-1 w-full">
                    <button
                        type="button"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                        onClick={handleAddProduct}
                    >
                        Add Product
                    </button>
                </div>

                <div className="w-full mt-5">
                    <h3 className="text-2xl font-bold mb-4">Selected Products</h3>
                    <div className="overflow-x-auto h-[380px]">
                        <table className="table table-sm table-pin-rows table-pin-cols">
                            <thead>
                                <tr className="text-center bg-red-500">
                                    <th className="px-4 py-2 border">Product Name</th>
                                    <th className="px-4 py-2 border">Quantity</th>
                                    <th className="px-4 py-2 border">Price</th>
                                    <th className="px-4 py-2 border">Total</th>
                                    <th className="px-4 py-2 border">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {childBody && childBody.map((item, index) => (
                                    <tr key={index} className="text-center hover:bg-green-100 ">
                                        <td className="px-4 py-2 border">{item.productName}</td>
                                        <td className="px-4 py-2 border">{item.quantity}</td>
                                        <td className="px-4 py-2 border">{item.unitPrice}</td>
                                        <td className="px-4 py-2 border">{item.total}</td>
                                        <td className="px-4 py-2 border">
                                            <button
                                                className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition duration-200"
                                                onClick={() => handleRemoveProduct(index)}
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                </div>
            </div>
            <button
                type="button"
                className="w-1/2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200 mt-10"
                onClick={handleCreatePurchase}
            >
                Create Purchase
            </button>
        </div>
    </div>
    );
};

export default PurchaseCreateUpdate; 