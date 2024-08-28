
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import './App.css'
import { getAuthToken } from './Helper/SessionHelper'
import MasterLayout from './Layout/MasterLayout'

import Login from './Components/Users/Login'
import Registration from './Components/Users/Registration'
import Error from './Components/Users/Error'
import ForgetPassword from './Components/Users/ForgetPassword'
import NewPassword from './Components/Users/NewPassword'
import OtpVerification from './Components/Users/OtpVerification'

import CustomerCreateUpdatePage from './Pages/CustomerCreateUpdatePage'
import CustomerListPage from './Pages/CustomerListPage'

import SupplierCreateUpdatePage from './Pages/SupplierCreateUpdatePage'
import SupplierList from './Components/Suppliers/SupplierList'

import ExpenseTypeCreateUpdatePage from './Pages/ExpenseTypeCreateUpdatePage'
import ExpenseTypeListPage from './Pages/ExpenseTypeListPage'

import ExpenseCreateUpdatePage from './Pages/ExpenseCreateUpdatePage'
import ExpenseListPage from './Pages/ExpenseListPage'

import BrandListPage from './Pages/BrandListPage'
import BrandCreateUpdatePage from './Pages/BrandCreateUpdatePage'

import CategoryListPage from './Pages/CategoryListPage'
import CategoryCreateUpdatePage from './Pages/CategoryCreateUpdatePage'

import ProductCreateUpdatePage from './Pages/ProductCreateUpdatePage'
import ProductListPage from './Pages/ProductListPage'
import ProductFullPage from './Pages/ProductFullPage'

import PurchaseCreateUpdatePage from './Pages/PurchaseCreateUpdatePage'
import PurchaseListPage from './Pages/PurchaseListPage'

import SaleCreateUpdatePage from './Pages/SaleCreateUpdatePage'
import SaleList from './Components/Sales/SaleList'

import ReturnCreatePage from './Pages/ReturnCreatePage'
import ReturnListPage from './Pages/ReturnListPage'

import PurchaseReportPage from './Pages/PurchaseReportPage'
import ExpenseReportPage from './Pages/ExpenseReportPage'
import SaleReportPage from './Pages/SaleReportPage'
import ReturnReportPage from './Pages/ReturnReportPage'

import DashboardPage from './Pages/DashboardPage'

function App() {

    const authRoutes = getAuthToken() ?
    [
        {
            path: "/",
            element: <MasterLayout/>,
            children:[
                {
                    path: "/",
                    element: <DashboardPage></DashboardPage>
                },
                //profile
                {
                    path: "/profile",
                    element: <h1>profile</h1>
                },
                //customer
                {
                    path: "/customer-create-update",
                    element: <CustomerCreateUpdatePage></CustomerCreateUpdatePage>
                },
                {
                    path: "/customer-create-update/:id",
                    element: <CustomerCreateUpdatePage></CustomerCreateUpdatePage>
                },
                {
                    path: "/customer-list",
                    element: <CustomerListPage></CustomerListPage>
                },
                //supplier
                {
                    path: "/supplier-create-update",
                    element: <SupplierCreateUpdatePage></SupplierCreateUpdatePage>
                },
                {
                    path: "/supplier-create-update/:id",
                    element: <SupplierCreateUpdatePage></SupplierCreateUpdatePage>
                },
                {
                    path: "/supplier-list",
                    element: <SupplierList/>
                },
                //expense type
                {
                    path: "/expense-type-create-update",
                    element: <ExpenseTypeCreateUpdatePage></ExpenseTypeCreateUpdatePage>
                },
                {
                    path: "/expense-type-create-update/:id",
                    element: <ExpenseTypeCreateUpdatePage></ExpenseTypeCreateUpdatePage>
                },
                {
                    path: "/expense-type-list",
                    element: <ExpenseTypeListPage></ExpenseTypeListPage>
                },
                //expense
                {
                    path: "/expense-create-update",
                    element: <ExpenseCreateUpdatePage></ExpenseCreateUpdatePage>
                },
                {
                    path: "/expense-create-update/:id",
                    element: <ExpenseCreateUpdatePage></ExpenseCreateUpdatePage>
                },
                {
                    path: "/expense-list",
                    element: <ExpenseListPage></ExpenseListPage>
                },
                //brand
                {
                    path: "/brand-create-update",
                    element: <BrandCreateUpdatePage></BrandCreateUpdatePage>
                },
                {
                    path: "/brand-create-update/:id",
                    element: <BrandCreateUpdatePage></BrandCreateUpdatePage>
                },
                {
                    path: "/brand-list",
                    element: <BrandListPage></BrandListPage>
                },
                //category
                {
                    path: "/category-create-update",
                    element: <CategoryCreateUpdatePage></CategoryCreateUpdatePage>
                },
                {
                    path: "/category-create-update/:id",
                    element: <CategoryCreateUpdatePage></CategoryCreateUpdatePage>
                },
                {
                    path: "/category-list",
                    element: <CategoryListPage></CategoryListPage>
                },
                //product
                {
                    path: "/product-create-update",
                    element: <ProductCreateUpdatePage></ProductCreateUpdatePage>
                },
                {
                    path: "/product-create-update/:id",
                    element: <ProductCreateUpdatePage></ProductCreateUpdatePage>
                },
                {
                    path: "/product-list",
                    element: <ProductListPage></ProductListPage>
                },
                {
                    path: "/product-full-view/:id",
                    element: <ProductFullPage></ProductFullPage>
                },
                //purchase
                {
                    path: "/purchase-create-update",
                    element: <PurchaseCreateUpdatePage></PurchaseCreateUpdatePage>
                },
                {
                    path: "/purchase-list",
                    element: <PurchaseListPage></PurchaseListPage>
                },
                //sale
                {
                    path: "/sale-create-update",
                    element: <SaleCreateUpdatePage></SaleCreateUpdatePage>
                },
                {
                    path: "/sales-list",
                    element: <SaleList></SaleList>
                },
                //return
                {
                    path: "/return-create-update",
                    element: <ReturnCreatePage></ReturnCreatePage>
                },
                {
                    path: "/return-list",
                    element: <ReturnListPage>return-list</ReturnListPage>
                },
                //purchase report
                {
                    path: "/purchase-report",
                    element: <PurchaseReportPage></PurchaseReportPage>
                },
                //expense report
                {
                    path: "/expense-report",
                    element: <ExpenseReportPage></ExpenseReportPage>
                },
                //sale report
                {
                    path: "/sales-report",
                    element: <SaleReportPage></SaleReportPage>
                },
                //return report
                {
                    path: "/return-report",
                    element: <ReturnReportPage></ReturnReportPage>
                },
            ]
        },
    ]
    :
    [
        {
            path: "/login",
            element: <Login/>,
        },
        {
            path: "/registration",
            element: <Registration/>,
        },
        {
            path: "/forgot-password",
            element: <ForgetPassword/>,
        },
        {
            path: "/new-password",
            element: <NewPassword/>,
        },
        {
            path: "/otp-verification",
            element: <OtpVerification/>,
        },
        {
            path: "*",
            element: <Error/>,
        },

    ] 

    const router = createBrowserRouter(authRoutes)
    return(
        <>

            <RouterProvider router = {router}/>
        </>
    )
  
}

export default App
