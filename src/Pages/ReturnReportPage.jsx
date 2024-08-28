
import { Suspense, lazy } from "react";
import PageLoader from "../Utilities/PageLoader";
const ReturnReport = lazy(() => import('../Components/Report/ReturnReport'));

const ReturnReportPage = () => {
    return (
        <div>
            <Suspense fallback={<PageLoader></PageLoader>}>
                <ReturnReport></ReturnReport>
            </Suspense>
        </div>
    );
};

export default ReturnReportPage;