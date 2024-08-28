import { Suspense, lazy } from "react";
import PageLoader from "../Utilities/PageLoader";
const ReturnCreate = lazy(() => import('../Components/Return/ReturnCreate'));

const ReturnCreatePage = () => {
    return (
        <div>
            <Suspense fallback={<PageLoader></PageLoader>}>
                <ReturnCreate></ReturnCreate>
            </Suspense>
        </div>
    );
};

export default ReturnCreatePage;