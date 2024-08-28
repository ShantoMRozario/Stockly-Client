import { Suspense, lazy } from "react";
import PageLoader from "../Utilities/PageLoader";
const ExpenseTypeCreateUpdate = lazy(() => import("../Components/ExpenseType/ExpenseTypeCreateUpdate"));

const ExpenseTypeCreateUpdatePage = () => {
    return (
        <div>
            <Suspense fallback={<PageLoader></PageLoader>}>
                <ExpenseTypeCreateUpdate/>
            </Suspense>
        </div>
    );
};

export default ExpenseTypeCreateUpdatePage;