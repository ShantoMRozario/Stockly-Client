import { Suspense, lazy } from "react";
import PageLoader from "../Utilities/PageLoader";
const Dashboard = lazy(() => import('../Components/Dashboard/Dashboard'));

const DashboardPage = () => {
    return (
        <div>
            <Suspense fallback={<PageLoader></PageLoader>}>
                <Dashboard></Dashboard>
            </Suspense>
        </div>
    );
};

export default DashboardPage;