import { Suspense, lazy } from "react";
import PageLoader from "../Utilities/PageLoader";
const ReturnList = lazy(() => import('../Components/Return/ReturnList'));

const ReturnListPage = () => {
    return (
        <div>
            <Suspense fallback={<PageLoader></PageLoader>}>
                <ReturnList></ReturnList>
            </Suspense>
        </div>
    );
};

export default ReturnListPage;