
import { Suspense, lazy } from "react";
import PageLoader from "../Utilities/PageLoader";
const SaleReport = lazy(() => import('../Components/Report/SaleReport'));

const SaleReportPage = () => {
    return (
        <div>
            <Suspense fallback={<PageLoader></PageLoader>}>
                <SaleReport></SaleReport>
            </Suspense>
        </div>
    );
};

export default SaleReportPage;