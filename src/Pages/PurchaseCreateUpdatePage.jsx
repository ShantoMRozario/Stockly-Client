
import { Suspense, lazy } from "react";
import PageLoader from "../Utilities/PageLoader";
const PurchaseCreateUpdate = lazy(() => import('../Components/Purchase/PurchaseCreateUpdate'));

const PurchaseCreateUpdatePage = () => {
    return (
        <div>
            <Suspense fallback={<PageLoader></PageLoader>}>
                <PurchaseCreateUpdate></PurchaseCreateUpdate>
            </Suspense>
        </div>
    );
};

export default PurchaseCreateUpdatePage;