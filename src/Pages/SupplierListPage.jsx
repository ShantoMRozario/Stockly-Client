import { Suspense, lazy } from "react";
import PageLoader from "../Utilities/PageLoader";
const SupplierList = lazy(() => import('../Components/Suppliers/SupplierList'));

const SupplierListPage = () => {
    return (
        <div>
            <Suspense fallback={<PageLoader></PageLoader>}>
                <SupplierList/>
            </Suspense>

        </div>
    );
};

export default SupplierListPage;