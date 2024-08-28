
import { Suspense, lazy } from "react";
import PageLoader from "../Utilities/PageLoader";
const SaleCreateUpdate = lazy(() => import('../Components/Sales/SaleCreateUpdate'));

const SaleCreateUpdatePage = () => {
    return (
        <div>
            <Suspense fallback={<PageLoader></PageLoader>}>
                <SaleCreateUpdate></SaleCreateUpdate>
            </Suspense>
        </div>
    );
};

export default SaleCreateUpdatePage;