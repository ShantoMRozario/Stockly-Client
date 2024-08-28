import { Suspense, lazy } from "react";
import PageLoader from "../Utilities/PageLoader";
const ProductList = lazy(() => import("../Components/Products/ProductList"));

const ProductListPage = () => {
    return (
        <div>
            <Suspense fallback={<PageLoader></PageLoader>}>
                <ProductList/>
            </Suspense>
        </div>
    );
};

export default ProductListPage; 