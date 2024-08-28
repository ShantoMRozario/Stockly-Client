import { Suspense, lazy } from "react";
import PageLoader from "../Utilities/PageLoader";
const CustomerCreateUpdate = lazy(() => import("../Components/Customer/CustomerCreateUpdate"));

const CustomerCreateUpdatePage = () => {
    return (
        <div>
            <Suspense fallback={<PageLoader></PageLoader>}>
                <CustomerCreateUpdate/>
            </Suspense>
        </div>
    );
};

export default CustomerCreateUpdatePage; 