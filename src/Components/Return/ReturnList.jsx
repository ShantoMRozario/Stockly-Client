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
import { deleteReturnRequest, returnListRequest } from "../../Api/ReturnApiRequest";

const ReturnList = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("null");
    const [perPage, setPerPage] = useState(5);
  
    useEffect(() => {
      returnListRequest(1, perPage, search);
    }, [currentPage, perPage, search]);
  
    const allReturns = useSelector((state) => state.return.returns);
    const total = useSelector((state) => state.return?.list[0]?.total);
  
  
    //Pagination start
  
    //handle change page
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
      returnListRequest(pageNumber, perPage, search);
    };
  
    //handle per page
    const handlePerPage = (e) => {
      setPerPage(parseInt(e.target.value));
      setCurrentPage(1);
      returnListRequest(1, parseInt(e.target.value), search);
    };
  
    //Handle search Input
    const searchInput = (e) => {
      setSearch(e.target.value);
      if ((e.target.value).length === 0) {
        setSearch(null);
        returnListRequest(currentPage, perPage, "null");
      }
    };
  
    //handle search
    const handleSearch = () => {
      returnListRequest(1, perPage, search);
      setCurrentPage(1);
    };
    //Pagination end
  
    //Delete Customer
    const deleteReturn = async (id) => {
      let result = await deleteAlert();
      if (result.isConfirmed) {
        let result = await deleteReturnRequest(id);
        if (result === true) {
          const updatedTotal = total - 1;
          const updatedPageNumber = Math.ceil(updatedTotal / perPage) < currentPage ? currentPage - 1 : currentPage;
          returnListRequest(updatedPageNumber, perPage, search);
          setCurrentPage(updatedPageNumber);
        }
      }
    };    
    return (
        <div>
        <div className="flex  items-center w-full">
          <h1 className="text-3xl font-bold mb-5 w-[20%]">Return List</h1>
          <Link to='/return-create-update' className="btn bg-green-500 hover:bg-green-700 text-white font-bold "><MdOutlineCreate />Create New Return</Link>
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
                <th className="px-5 py-2 capitalize">No</th>
                <th className="px-5 py-2 capitalize">Supplier Name</th>
                <th className="px-5 py-2 capitalize">details</th>
                <th className="px-5 py-2 capitalize">Vat Tax</th>
                <th className="px-5 py-2 capitalize">discount</th>
                <th className="px-5 py-2 capitalize">other Cost</th>
                <th className="px-5 py-2 capitalize">shipping Cost</th>
                <th className="px-5 py-2 capitalize">grand Total</th>
                <th className="px-5 py-2 capitalize">Created Date</th>
                <th className="px-5 py-2 capitalize">Action</th>
              </tr>
            </thead>
            <tbody>
              {allReturns?.map((item, index) => (
                <tr key={index} className="text-center hover:bg-green-100 ">
                  <td className="px-5 py-2 ">{(currentPage - 1) * perPage + index + 1}</td>
                  <td className="px-5 py-2">{item.customerData[0].customerName}</td>
                  <td className="px-5 py-2">{item.details}</td>
                  <td className="px-5 py-2">{item.vatTax}</td>
                  <td className="px-5 py-2">{item.discount}</td>
                  <td className="px-5 py-2">{item.otherCost}</td>
                  <td className="px-5 py-2">{item.shippingCost}</td>
                  <td className="px-5 py-2">{item.grandTotal}</td>
                  <td className="px-5 py-2">
                    {moment(item.createdDate).format("DD-MM-YYYY")}
                  </td>
                  <td className="flex gap-3 justify-center">
                    <button
                      onClick={() => deleteReturn(item._id)}
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

export default ReturnList;