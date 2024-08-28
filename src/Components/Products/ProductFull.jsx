import { useEffect, useState } from "react";
import {  productFullPageRequest } from "../../Api/ProductApiRequest";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ImgsViewer from "react-images-viewer";


const ProductFull = () => {

    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [error, setError] = useState(null);

    console.log(product);

  
    const productData = useSelector((state) => state.productFullPage?.productFullPage);
    console.log(productData);

    useEffect(() => {
            productFullPageRequest(id)
        
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <div>No product details available</div>;
    }


    return (
        <div className="min-h-screen  py-10">
        <div className="max-w-full px-5 mx-auto bg-white shadow-lg rounded-lg p-6">
            {productData.map((item, i) => (
                <div key={i} className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">{item.productName}</h1>
                    <p className="text-gray-600 mb-4"><strong>Units:</strong> {item.unit}</p>
                    <p className="text-gray-600 mb-4"><strong>Brand:</strong> {item.brandData.name}</p>
                    <p className="text-gray-600 mb-4"><strong>Category:</strong> {item.categoryData.name}</p>

                    {/* Render all images */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {item.images && item.images.map((image, index) => (
                            <div key={index} className="overflow-hidden rounded-lg shadow-lg">
                                <img className="w-full h-48 object-cover" src={image} alt={`Product Image ${index + 1}`} />
                            </div>
                        ))}
                    </div>

                    <p className="text-gray-600 my-2"><strong>Details:</strong> {item.details}</p>
                </div>
            ))}
        </div>
    </div>
    );
};

export default ProductFull;