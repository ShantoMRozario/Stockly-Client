import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ButtonLoader from '../../Utilities/ButtonLoader';
import { expenseReportRequest } from '../../Api/ReportApiRequest';
import moment from 'moment';
import exportFromJSON from 'export-from-json';

const ExpenseReport = () => {

    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState('') ;
  
    const expenseReport  = useSelector(state => state.report.expensesReportByDate);
    
    const dispatch = useDispatch();
  
    const handleCreateReport = async() => {
      setLoader(true);
  
      if(fromDate && toDate){
          let result = await expenseReportRequest(fromDate, toDate)
          if(result == true){
            setLoader(false);
            setError(true);
          }
      }
      else{
        setLoader(false);
        setError('Please select from and to date');
      }
    };
  
    const handleDownload = (downloadType,data) => {
      if(data.length > 0){
        let reportData = []
        data.map((item) => {
          let list = {
              'Expense Type': item.expenseTypeData[0].name, 
              'Amount': item.amount,
              'details': item.details,
            'date': moment(item.createdDate).format('DD-MM-YYYY') 
          }
          reportData.push(list)
        })
        const fileName = `Return Report-${moment().format('DD-MM-YYYY')}`
        exportFromJSON({data: reportData,fileName: fileName,exportType: downloadType})
      }
    }            
    return (
        <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl border-2 border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-center">Expense Report By Date</h2>
        <div className="flex justify-between mb-4">
          <div className="flex flex-col">
            <label className="block text-gray-700 mb-2">From Date</label>
            <input type="date" datetimeformat='YYYY-MM-DD'  onChange={(e) => setFromDate(e.target.value)} value={fromDate} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
          </div>
          <div className="flex flex-col">
            <label className="block text-gray-700 mb-2">To Date</label>
            <input type="date" datetimeformat='YYYY-MM-DD' onChange={(e) => setToDate(e.target.value)} value={toDate}  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
          </div>
        </div>
        
        {
            loader ?
            <ButtonLoader/>
            :
            <button onClick={handleCreateReport} className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200">Create Report</button>
        }
        {
          expenseReport[0]?.data?.length > 0 ?
          <div className="mt-6">
                <div className="bg-purple-100 p-4 rounded-lg">
                  <h3 className="text-xl font-bold">Download Report</h3>
                  <p className='text-lg'>Total: $ {expenseReport[0]?.total[0].totalAmount}</p>
                  <button onClick={() => handleDownload('xls',expenseReport[0]?.data)} className="mt-4 bg-green-500 text-white mx-2 py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200">Download Excel</button>
                  <button onClick={() => handleDownload('txt',expenseReport[0]?.data)} className="mt-4 bg-gray-400 text-white mx-2 py-2 px-4 rounded-lg hover:bg-gray-500 transition duration-200">Download Text</button>
                  <button onClick={() => handleDownload('csv',expenseReport[0]?.data)} className="mt-4 bg-purple-400 text-white mx-2 py-2 px-4 rounded-lg hover:bg-purple-600 transition duration-200">Download CSV</button>
                </div>
          </div>
          :
          error &&
          <h2 className='text-2xl font-bold text-red-600 mt-5'>No Report Found to Download</h2>
        }
      </div>
    </div>
    );
};

export default ExpenseReport;