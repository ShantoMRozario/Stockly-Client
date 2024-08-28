
import { useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { useSelector } from "react-redux";
import { deleteAlert } from "../../Helper/AlertHelper";
import { Link } from "react-router-dom";
import moment from "moment";
import { MdOutlineCreate } from "react-icons/md";
import { MdSystemUpdateAlt } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { deleteExpenseTypeRequest, expenseTypeListRequest } from "../../Api/ExpenseTypeApiRequest";

const ExpenseTypeList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("null");
  const [perPage, setPerPage] = useState(5);

  useEffect(() => {
    expenseTypeListRequest(1, perPage, search);
  }, [currentPage, perPage, search]);


  const allExpenseType = useSelector((state) => state.expenseTypes?.expenseTypes);
  const total = useSelector((state) => state.expenseTypes?.list[0]?.total);

  console.log(allExpenseType);

  //Pagination start

  //handle change page
  const handlePageChange = (pageNumber ) => {
    setCurrentPage(pageNumber);
    expenseTypeListRequest(pageNumber, perPage, search);
  };

  //handle per page
  const handlePerPage = (e) => {
    setPerPage(parseInt(e.target.value));
    setCurrentPage(1);
    expenseTypeListRequest(1, parseInt(e.target.value), search);
  };

  //Handle search Input
  const searchInput = (e) => {
    setSearch(e.target.value);
    if ((e.target.value).length === 0) {
      setSearch(null);
      expenseTypeListRequest(1, perPage, "null");
    }
  };

  //handle search
  const handleSearch = () => {
    expenseTypeListRequest(1, perPage, search);
    setCurrentPage(1);
  };
  //Pagination end

  //Delete Customer
  const deleteExpenseType = async (id) => {
    let result = await deleteAlert();
    if (result.isConfirmed) {
      let result = await deleteExpenseTypeRequest(id);
      if (result === true) {
        const updatedTotal = total - 1;
        const updatedPageNumber = Math.ceil(updatedTotal / perPage) < currentPage ? currentPage - 1 : currentPage;
        expenseTypeListRequest(updatedPageNumber, perPage, search);
        setCurrentPage(updatedPageNumber);
      }
    }
  };

  return (
    <div>
      <div className="flex  items-center w-full">
        <h1 className="text-3xl font-bold mb-5 w-[20%]">Expense Type List</h1>
        <Link to='/expense-type-create-update' className="btn bg-green-500 hover:bg-green-700 text-white font-bold "><MdOutlineCreate />Create New Expense Type</Link>
        <div className="w-[60%] mx-auto p-4">
          <div className="mb-4 flex justify-between items-center">
            <div className="flex gap-2 justify-center items-center">
              <input
                type="text"
                placeholder="Search..."
                onChange={searchInput}
                className="border p-2 rounded w-[500px] outline-none"
              />
              <button
                onClick={handleSearch}
                className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold"
              >
                Search
              </button>
            </div>
            <select
              value={perPage}
              onChange={handlePerPage}
              className="border p-2 rounded outline-none"
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto h-[660px]">
        <table className="table table-sm table-pin-rows table-pin-cols">
          <thead>
            <tr className="text-center bg-red-500">
              <th className="px-5 py-2 ">No</th>
              <th className="px-5 py-2 ">Expense Type Name</th>
              <th className="px-5 py-2 ">Created Date</th>
              <th className="px-5 py-2 ">Action</th>
            </tr>
          </thead>
          <tbody>
            {allExpenseType?.map((item, index) => (
              <tr key={index} className="text-center hover:bg-green-100 ">
                <td className="px-5 py-2 ">
                  {currentPage * perPage - perPage + index + 1}
                </td>
                <td className="px-5 py-2 ">{item.name}</td>
                <td className="px-5 py-2 ">
                  {moment(item.createdDate).format("DD-MM-YYYY")}
                </td>
                <td className="flex gap-3 justify-center">
                  <Link
                    to={`/expense-type-create-update/${item._id}`}
                    className="btn text-white font-bold bg-orange-500 hover:bg-orange-600"
                  >
                    <MdSystemUpdateAlt />
                    Update
                  </Link>
                  <button
                    onClick={() => deleteExpenseType(item._id)}
                    className="btn text-white font-bold bg-red-500 hover:bg-red-600"
                  >
                    <AiOutlineDelete />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination pt-5">
        <ResponsivePagination
          current={currentPage}
          total={Math.ceil(total/perPage)}
          onPageChange={handlePageChange}
          previousLabel="Prev"
          nextLabel="Next"
        />
      </div>
    </div>
  );
};

export default ExpenseTypeList;
