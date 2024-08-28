import { Suspense, lazy } from "react";
import PageLoader from "../Utilities/PageLoader";
const CategoryList = lazy(() => import('../Components/Category/CategoryList'));

const CategoryListPage = () => {
    return (
        <div>
            <Suspense fallback={<PageLoader></PageLoader>}>
                <CategoryList></CategoryList>
            </Suspense>
        </div>
    );
};

export default CategoryListPage;