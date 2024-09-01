import { useEffect } from "react";
import { expenseSummaryRequest, purchaseSummaryRequest, returnSummaryRequest, salesSummaryRequest } from "../../Api/SummaryApiRequest";
import { useSelector } from "react-redux";
import CountUp from 'react-countup';
import { BsCartXFill, BsFillCartCheckFill, BsFillCartDashFill, BsFillCartPlusFill } from "react-icons/bs";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';



const Dashboard = () => {


    useEffect(() => {
        (async () => {
            await purchaseSummaryRequest()
            await salesSummaryRequest()
            await returnSummaryRequest()
            await expenseSummaryRequest()
        })();
    }, [])


    const purchaseChart = useSelector(state => state.dashboard.purchaseChart)
    const purchaseTotal = useSelector(state => state.dashboard.purchaseTotal) 

    const salesChart = useSelector(state => state.dashboard.salesChart)
    const salesTotal = useSelector(state => state.dashboard.salesTotal)

    const returnsChart = useSelector(state => state.dashboard.returnsChart)
    const returnsTotal = useSelector(state => state.dashboard.returnsTotal)

    const expenseChart = useSelector(state => state.dashboard.expenseChart)
    const expenseTotal = useSelector(state => state.dashboard.expenseTotal)

    return (
        <div className="dashboard py-5 mb-10">
            <h1 className="text-3xl font-bold text-center mb-5">Dashboard</h1>
            <div className="cards flex justify-between items-center gap-5 border-2 rounded-lg p-5">
                <div className="purchase w-[20%] p-5 bg-purple-600 text-white rounded-md text-center flex items-center justify-evenly">
                    <BsFillCartPlusFill className="text-5xl" />
                    <div>
                        <h3 className="text-xl font-bold">Total Purchase</h3>
                        <h3 className="font-bold text-3xl">৳ <span className="text-2xl font-bold"><CountUp end={purchaseTotal}/></span></h3>
                    </div>
                </div>
                <div className="purchase w-[20%] p-5 bg-green-600 text-white rounded-md text-center flex items-center justify-evenly">
                    <BsFillCartCheckFill className="text-5xl" />
                    <div>
                        <h3 className="text-xl font-bold">Total Sales</h3>
                        <h3 className="font-bold text-3xl">৳ <span className="text-2xl font-bold"><CountUp end={salesTotal}/></span></h3>
                    </div>
                </div>
                <div className="purchase w-[20%] p-5 bg-orange-600 text-white rounded-md text-center flex items-center justify-evenly">
                    <BsCartXFill className="text-5xl" />
                    <div>
                        <h3 className="text-xl font-bold">Total Return</h3>
                        <h3 className="font-bold text-3xl">৳ <span className="text-2xl font-bold"><CountUp end={returnsTotal}/></span></h3>
                    </div>
                </div>
                <div className="purchase w-[20%] p-5 bg-blue-600 text-white rounded-md text-center flex items-center justify-evenly">
                    <BsFillCartDashFill className="text-5xl" />
                    <div>
                        <h3 className="text-xl font-bold">Total Expense</h3>
                        <h3 className="font-bold text-3xl">৳ <span className="text-2xl font-bold"><CountUp end={expenseTotal}/></span></h3>
                    </div>
                </div>
                
            </div>

            <div className="chart my-10">
                <h1 className="text-2xl font-bold text-center my-5">Last 30 Days</h1>
            
                <div className="w-full flex flex-wrap justify-between items-center gap-3">
                    {
                        purchaseChart.length > 0 ?
                        <div className="w-[48%] border shadow-lg">
                            <h1 className="text-xl font-bold text-center mb-5">Purchase</h1>
                            <ResponsiveContainer width="100%" height={400}>
                                <AreaChart
                                width="100%"
                                height={400}
                                data={purchaseChart}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                                >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="_id" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="Total" stackId="1" stroke="#9333EA" fill="#9333EA" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        :
                        <h2 className="w-[48%] text-xl font-bold text-center text-red-500 mb-5 border">No Data Available</h2>
                    }
                    {
                        salesChart.length > 0 ?
                        <div className="w-[48%] border shadow-lg">
                            <h1 className="text-xl font-bold text-center mb-5">Sales</h1>
                            <ResponsiveContainer width="100%" height={400}>
                                <AreaChart
                                width="100%"
                                height={400}
                                data={salesChart}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                                >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="_id" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="Total" stackId="1" stroke="#16A34A" fill="#16A34A" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        :
                        <h2 className="w-[48%] text-xl font-bold text-center text-red-500 mb-5 border " >No Data Available</h2>
                    }
                    {
                        returnsChart.length > 0 ?
                        <div className="w-[48%] border shadow-lg">
                            <h1 className="text-xl font-bold text-center mb-5">Return</h1>
                            <ResponsiveContainer width="100%" height={400}>
                                <AreaChart
                                width="100%"
                                height={400}
                                data={returnsChart}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                                >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="_id" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="Total" stackId="1" stroke="#EA580C" fill="#EA580C" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        :
                        <h2 className="w-[48%] text-xl font-bold text-center text-red-500 mb-5 border">No Data Available</h2>
                    }
                    {
                        expenseChart.length > 0 ?
                        <div className="w-[48%] border shadow-lg">
                            <h1 className="text-xl font-bold text-center mb-5">Expense</h1>
                            <ResponsiveContainer width="100%" height={400}>
                                <AreaChart
                                width="100%"
                                height={400}
                                data={expenseChart}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                                >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="_id" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="Total" stackId="1" stroke="#2563EB" fill="#2563EB" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        :
                        <h2 className="w-[48%] text-xl font-bold text-center text-red-500 mb-5 border">No Data Available</h2>
                    }
                </div>
                
                

               
            </div>

        </div>
    );
};

export default Dashboard;


