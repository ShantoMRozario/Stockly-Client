
import { Suspense, lazy } from "react";
import PageLoader from "../Utilities/PageLoader";
const ExpenseList = lazy(() => import('../Components/Expense/ExpenseList'));

const ExpenseListPage = () => {
    return (
        <div>
            <Suspense fallback={<PageLoader></PageLoader>}>
                <ExpenseList/>
            </Suspense>
        </div>
    );
};

export default ExpenseListPage;