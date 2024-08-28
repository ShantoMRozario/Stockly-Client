import { Suspense, lazy } from "react";
import PageLoader from "../Utilities/PageLoader";
const ProductCreateUpdate = lazy(() => import("../Components/Products/ProductCreateUpdate"));

const ProductCreateUpdatePage = () => {
    return (
        <div>
            <Suspense fallback={<PageLoader></PageLoader>}>
                <ProductCreateUpdate/>
            </Suspense>
        </div>
    );
};

export default ProductCreateUpdatePage; 