
import { configureStore } from "@reduxjs/toolkit";
import customerSlice  from "../Slices/CustomerSlice";
import supplierSlice  from "../Slices/SupplierSlice";
import ExpenseTypeSlice from "../Slices/ExpenseTypeSlice";
import expenseSlice from "../Slices/ExpenseSlice";
import brandSlice  from "../Slices/BrandSlice";
import categorySlice from "../Slices/CategorySlice";
import productSlice  from "../Slices/ProductSlice";
import productFullPageSlice from "../Slices/ProductFullPageSlice";
import purchaseSlice from "../Slices/PurchaseSlice";
import salesSlice from "../Slices/SalesSlice";
import ReturnSlice from "../Slices/ReturnSlice";
import reportSlice from "../Slices/ReportSlice";
import dashboardSlice from "../Slices/DashboardSlice";

export const store = configureStore({
    reducer: {
        // user: userSlice,
        customers: customerSlice,
        suppliers: supplierSlice,
        expenseTypes: ExpenseTypeSlice,
        expense: expenseSlice,
        brand:brandSlice,
        category:categorySlice,
        product:productSlice,
        productFullPage:productFullPageSlice,
        purchase:purchaseSlice,
        sale:salesSlice,
        return:ReturnSlice,
        report:reportSlice,
        dashboard:dashboardSlice

    }
}) 