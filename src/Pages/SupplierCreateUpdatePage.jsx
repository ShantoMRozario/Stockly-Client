import { Suspense, lazy } from "react";
import PageLoader from "../Utilities/PageLoader";
const SupplierCreateUpdate = lazy(() => import('../Components/Suppliers/SupplierCreateUpdate'));

const SupplierCreateUpdatePage = () => {
    return (
        <div>
            <Suspense fallback={<PageLoader></PageLoader>}>
                <SupplierCreateUpdate/>
            </Suspense>
        </div>
    );
};

export default SupplierCreateUpdatePage;