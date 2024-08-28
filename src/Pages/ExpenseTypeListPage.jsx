
import { Suspense, lazy } from "react";
import PageLoader from "../Utilities/PageLoader";
const ExpenseTypeList = lazy(() => import('../Components/ExpenseType/ExpenseTypeList'));

const ExpenseTypeListPage = () => {
    return (
        <div>
            <Suspense fallback={<PageLoader></PageLoader>}>
                <ExpenseTypeList/>
            </Suspense>
        </div>
    );
};

export default ExpenseTypeListPage;