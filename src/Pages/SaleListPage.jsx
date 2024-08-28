
import { Suspense, lazy } from "react";
import PageLoader from "../Utilities/PageLoader";
const SaleList = lazy(() => import('../Components/Sales/SaleList'));

const SaleListPage = () => {
    return (
        <div>
            <Suspense fallback={<PageLoader></PageLoader>}>
                <SaleList></SaleList>
            </Suspense>
        </div>
    );
};

export default SaleListPage;