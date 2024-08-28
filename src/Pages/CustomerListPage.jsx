
import { Suspense, lazy } from 'react';
import PageLoader from '../Utilities/PageLoader';
const CustomerList = lazy(() => import('../Components/Customer/CustomerList'));

const CustomerListPage = () => {
    return (
        <div>
            <Suspense fallback={<PageLoader></PageLoader>}>
                <CustomerList/>
            </Suspense>            
        </div>
    );
};

export default CustomerListPage;