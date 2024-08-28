
import { Suspense, lazy } from "react";
import PageLoader from "../Utilities/PageLoader";
const PurchaseList = lazy(() => import('../Components/Purchase/PurchaseList'));

const PurchaseListPage = () => {
    return (
        <div>
            <Suspense fallback={<PageLoader></PageLoader>}>
                <PurchaseList></PurchaseList>
            </Suspense>
        </div>
    );
};

export default PurchaseListPage;