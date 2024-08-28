
import { Suspense, lazy } from "react";
import PageLoader from "../Utilities/PageLoader";
const ProductFull = lazy(() => import('../Components/Products/ProductFull'));

const ProductFullPage = () => {
    return (
        <div>
            <Suspense fallback={<PageLoader></PageLoader>}>
                <ProductFull></ProductFull>
            </Suspense>
        </div>
    );
};

export default ProductFullPage;