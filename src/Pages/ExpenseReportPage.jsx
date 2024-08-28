import { Suspense, lazy } from "react";
import PageLoader from "../Utilities/PageLoader";
const ExpenseReport = lazy(() => import('../Components/Report/ExpenseReport'));

const ExpenseReportPage = () => {
    return (
        <div>
            <Suspense fallback={<PageLoader></PageLoader>}>
                <ExpenseReport></ExpenseReport>
            </Suspense>
        </div>
    );
};

export default ExpenseReportPage;