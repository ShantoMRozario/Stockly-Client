import { Suspense, lazy } from "react";
import PageLoader from "../Utilities/PageLoader";
const PurchaseReport = lazy(() => import('../Components/Report/PurchaseReport'));

const PurchaseReportPage = () => {
    return (
        <div>
            <Suspense fallback={<PageLoader></PageLoader>}>
                <PurchaseReport></PurchaseReport>
            </Suspense>
        </div>
    );
};

export default PurchaseReportPage;