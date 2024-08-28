import { Suspense, lazy } from "react";
import PageLoader from "../Utilities/PageLoader";
const BrandList = lazy(() => import('../Components/Brands/BrandList'));

const BrandListPage = () => {
    return (
        <div>
            <Suspense fallback={<PageLoader></PageLoader>}>
                <BrandList></BrandList>
            </Suspense>
        </div>
    );
};

export default BrandListPage;