
import { Suspense, lazy } from "react";
import PageLoader from "../Utilities/PageLoader";
const BrandCreateUpdate = lazy(() => import('../Components/Brands/CreateUpdateBrand'));

const BrandCreateUpdatePage = () => {
    return (
        <div>
            <Suspense fallback={<PageLoader></PageLoader>}>
                <BrandCreateUpdate></BrandCreateUpdate>
            </Suspense>
        </div>
    );
};

export default BrandCreateUpdatePage;