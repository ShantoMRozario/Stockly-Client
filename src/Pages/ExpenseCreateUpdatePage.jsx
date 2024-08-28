import { Suspense, lazy } from "react";
import PageLoader from "../Utilities/PageLoader";
const ExpenseCreateUpdate = lazy(() => import("../Components/Expense/ExpenseCreateUpdate"));

const ExpenseCreateUpdatePage = () => {
    return (
        <div>
            <Suspense fallback={<PageLoader></PageLoader>}>
                <ExpenseCreateUpdate/>
            </Suspense>
        </div>
    );
};

export default ExpenseCreateUpdatePage;