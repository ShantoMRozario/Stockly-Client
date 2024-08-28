import { Suspense, lazy } from "react";
import PageLoader from "../Utilities/PageLoader";
const CategoryCreateUpdate = lazy(() => import('../Components/Category/CategoryCreateUpdate'));

const CategoryCreateUpdatePage = () => {
    return (
        <div>
            <Suspense fallback={<PageLoader></PageLoader>}>
                <CategoryCreateUpdate></CategoryCreateUpdate>
            </Suspense>
        </div>
    );
};

export default CategoryCreateUpdatePage;