import { Link, NavLink, Outlet } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FaBars } from "react-icons/fa";
import {
  FaCartShopping,
  FaPeopleGroup,
  FaPeoplePulling,
  FaTags,
  FaUserMinus,
} from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { GrUserManager } from "react-icons/gr";
import { GoPlusCircle } from "react-icons/go";
import { FaListCheck } from "react-icons/fa6";
import { BsBoxes, BsFillFileBarGraphFill } from "react-icons/bs";
import { TbTruckReturn } from "react-icons/tb";
import { VscGraph } from "react-icons/vsc";
import { logout } from "../Helper/SessionHelper";
import { useState } from "react";

const MasterLayout = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  //get user data from local storage
  const userData = JSON.parse(localStorage.getItem("userData"));

  const sideItems = [
    {
      title: "Dashboard",
      icon: <RxDashboard />,
      url: "/",
      subMenus: [],
    },
    //Custormer
    {
      title: "Custormer",
      icon: <FaPeopleGroup />,
      url: "/custormer",
      subMenus: [
        {
          title: "CreateCustormer",
          icon: <FaPeoplePulling />,
          url: "/customer-create-update",
        },
        {
          title: "Custormer List",
          icon: <IoIosPeople />,
          url: "/customer-list",
        },
      ],
    },
    //Supplier
    {
      title: "Supplier",
      icon: <GrUserManager />,
      url: "/supplier",
      subMenus: [
        {
          title: "CreateSupplier",
          icon: <FaPeoplePulling />,
          url: "/supplier-create-update",
        },
        {
          title: "Supplier List",
          icon: <IoIosPeople />,
          url: "/supplier-list",
        },
      ],
    },
    //Expense
    {
      title: "Expense",
      icon: <FaUserMinus />,
      url: "/expense",
      subMenus: [
        {
          title: "Create Expense Type",
          icon: <GoPlusCircle />,
          url: "/expense-type-create-update",
        },
        {
          title: "Expense Type List",
          icon: <FaListCheck />,
          url: "/expense-type-list",
        },
        {
          title: "Create Expense",
          icon: <GoPlusCircle />,
          url: "/expense-create-update",
        },
        {
          title: "Expense List",
          icon: <FaListCheck />,
          url: "/expense-list",
        },
      ],
    },
    //Product
    {
      title: "Product",
      icon: <BsBoxes />,
      url: "/product",
      subMenus: [
        {
          title: "Create Brand",
          icon: <GoPlusCircle />,
          url: "/brand-create-update",
        },
        {
          title: "Brand List",
          icon: <FaListCheck />,
          url: "/brand-list",
        },
        {
          title: "Create Category",
          icon: <GoPlusCircle />,
          url: "/category-create-update",
        },
        {
          title: "Category List",
          icon: <FaListCheck />,
          url: "/category-list",
        },
        {
          title: "Create Product",
          icon: <GoPlusCircle />,
          url: "/product-create-update",
        },
        {
          title: "Product List",
          icon: <FaListCheck />,
          url: "/product-list",
        }
      ],
    },
    //Purchase
    {
      title: "Purchase",
      icon: <FaCartShopping />,
      url: "/purchase",
      subMenus: [
        {
          title: "Create Purchase",
          icon: <GoPlusCircle />,
          url: "/purchase-create-update",
        },
        {
          title: "Purchase List",
          icon: <FaListCheck />,
          url: "/purchase-list",
        },
      ],
    },
    //Sale
    {
      title: "Sales",
      icon: <FaTags />,
      url: "/sale",
      subMenus: [
        {
          title: "Create Sale",
          icon: <GoPlusCircle />,
          url: "/sale-create-update",
        },
        {
          title: "Sales List",
          icon: <FaListCheck />,
          url: "/sales-list",
        },
      ],
    },
    //Return
    {
      title: "Return",
      icon: <TbTruckReturn />,
      url: "/return",
      subMenus: [
        {
          title: "Create Return",
          icon: <GoPlusCircle />,
          url: "/return-create-update",
        },
        {
          title: "Return List",
          icon: <FaListCheck />,
          url: "/return-list",
        },
      ],
    },
    //Report
    {
      title: "Report",
      icon: <VscGraph />,
      url: "/report",
      subMenus: [
        {
          title: "Sales Report",
          icon: <BsFillFileBarGraphFill />,
          url: "/sales-report",
        },
        {
          title: "Purchase Report",
          icon: <BsFillFileBarGraphFill />,
          url: "/purchase-report",
        },
        {
          title: "Expense Report",
          icon: <BsFillFileBarGraphFill />,
          url: "/expense-report",
        },
        {
          title: "Return Report",
          icon: <BsFillFileBarGraphFill />,
          url: "/return-report",
        },
      ],
    },
  ];

  return (
    <div className="main flex gap-1 ">
      {/*DashBoard Sidemenu Section*/}
      <div className="left w-[18%] h-screen border border-gray-200 border-l-2 shadow-xl py-3 overflow-hidden ">
        <div className="logo text-center">
          <h2 className="text-[40px] font-bold text-green-600">Stockly</h2>
          <h5 className="text-gray-400 text-sm">Inventory Management System</h5>
        </div>
        <div className="menu flex flex-row mt-5 overflow-y-scroll h-[795px]">
          {sideItems.map((item, index) => {
            return item.subMenus.length > 0 ? (
              <div
                key={index}
                className="collapse collapse-arrow bg-gray-100 rounded-md mb-3"
              >
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-lg font-medium flex items-center gap-2">
                  {item.icon} {item.title}
                </div>
                <div className="collapse-content z-[9999] ml-3 mt-[-10px] flex flex-col">
                  {item.subMenus.map((item, index) => {
                    return (
                      <NavLink
                        key={index}
                        to={item.url}
                        className={({ isActive }) =>
                          isActive
                            ? "py-2 text-green-600 font-medium flex items-center gap-2"
                            : "py-2 text-gray-500 font-medium flex items-center gap-2"
                        }
                      >
                        {item.icon} {item.title}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            ) : (
              <NavLink
                to={item.url}
                className={({ isActive }) =>
                  isActive
                    ? "pl-3 bg-gray-100 mb-3 py-2 text-green-600 text-lg font-medium flex w-full items-center gap-3"
                    : "pl-3 bg-gray-100 mb-3 py- text-gray-500 w-full text-lg font-medium flex items-center gap-3"
                }
              >
                {item.icon} {item.title}
              </NavLink>
            );
          })}
        </div>
      </div>
      {/*DashBoard Right Section*/}
      <div className="right w-[82%] h-screen overflow-hidden">
        <div className="top py-5 shadow-md flex items-center justify-between">
          <h3 className="pl-5 text-lg font-semibold">Dashboard</h3>

          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="profile tooltip tooltip-left w-[50px] h-[50px] rounded-full overflow-hidden mr-5 cursor-pointer" title="Profile">
                <img className="w-full" src="https://static.vecteezy.com/system/resources/thumbnails/001/993/889/small/beautiful-latin-woman-avatar-character-icon-free-vector.jpg"
                alt=""/>
            </div>
            {
                userData.map((item, index) => {
                    return(

                        <ul tabIndex={0} className="menu dropdown-content bg-base-100 z-[1] mt-4 w-52 p-2 shadow" >
                            <li className="text-green-500 ml-3">{item.email}</li>
                            <li className="hover:bg-green-500 rounded hover:text-white"><Link>Profile</Link></li>
                            <li className="hover:bg-green-500 rounded hover:text-white"><button onClick={handleLogout}>Logout</button></li>
                        </ul>
                    )
                })
            }
          </div>
        </div>
        <div className="bottom p-5 pt-0 overflow-y-scroll h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="main flex">
  //     {/* Sidebar */}
  //     <div
  //       className={`left fixed md:relative z-20 md:z-0 ${
  //         isSidebarOpen ? "translate-x-0" : "-translate-x-full"
  //       } md:translate-x-0 transition-transform duration-300 w-[70%] md:w-[18%] h-screen border border-gray-200 border-l-2 shadow-xl py-3 overflow-hidden bg-white`}
  //     >
  //       <div className="logo text-center">
  //         <h2 className="text-[30px] md:text-[40px] font-bold text-green-600">
  //           Stockly
  //         </h2>
  //         <h5 className="text-gray-400 text-sm">Inventory Management System</h5>
  //       </div>
  //       <div className="menu  mt-5 overflow-y-scroll h-[795px]">
  //         {sideItems.map((item, index) => (
  //           <div key={index}>
  //             {item.subMenus.length > 0 ? (
  //               <div className="collapse collapse-arrow bg-gray-100 rounded-md mb-3">
  //                 <input type="checkbox" className="peer" />
  //                 <div className="collapse-title text-lg font-medium flex items-center gap-2">
  //                   {item.icon} {item.title}
  //                 </div>
  //                 <div className="collapse-content z-[9999] ml-3 mt-[-10px] flex flex-col">
  //                   {item.subMenus.map((subItem, subIndex) => (
  //                     <NavLink
  //                       key={subIndex}
  //                       to={subItem.url}
  //                       className={({ isActive }) =>
  //                         isActive
  //                           ? "py-2 text-green-600 font-medium flex items-center gap-2"
  //                           : "py-2 text-gray-500 font-medium flex items-center gap-2"
  //                       }
  //                     >
  //                       {subItem.icon} {subItem.title}
  //                     </NavLink>
  //                   ))}
  //                 </div>
  //               </div>
  //             ) : (
  //               <NavLink
  //                 to={item.url}
  //                 className={({ isActive }) =>
  //                   isActive
  //                     ? "pl-3 bg-gray-100 mb-3 py-2 text-green-600 text-lg font-medium flex w-full items-center gap-3"
  //                     : "pl-3 bg-gray-100 mb-3 py- text-gray-500 w-full text-lg font-medium flex items-center gap-3"
  //                 }
  //               >
  //                 {item.icon} {item.title}
  //               </NavLink>
  //             )}
  //           </div>
  //         ))}
  //       </div>
  //     </div>

  //     {/* Content Area */}
  //     <div className="right flex-1 h-screen overflow-hidden">
  //       {/* Hamburger Icon for Mobile */}
  //       <div className="md:hidden flex justify-between items-center p-4 bg-gray-100 shadow-md">
  //         <h3 className="text-lg font-semibold">Dashboard</h3>
  //         <button
  //           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
  //           className="text-2xl"
  //         >
  //           <FaBars />
  //         </button>
  //       </div>

  //       {/* Top Bar */}
  //       <div className="top py-5 shadow-md flex items-center justify-between">
  //         <h3 className="pl-5 text-lg font-semibold hidden md:block">
  //           Dashboard
  //         </h3>

  //         <div className="dropdown dropdown-end">
  //           <div
  //             tabIndex={0}
  //             role="button"
  //             className="profile tooltip tooltip-left w-[40px] md:w-[50px] h-[40px] md:h-[50px] rounded-full overflow-hidden mr-5 cursor-pointer"
  //             title="Profile"
  //           >
  //             <img
  //               className="w-full"
  //               src="https://static.vecteezy.com/system/resources/thumbnails/001/993/889/small/beautiful-latin-woman-avatar-character-icon-free-vector.jpg"
  //               alt="Profile"
  //             />
  //           </div>
  //           <ul
  //             tabIndex={0}
  //             className="menu dropdown-content bg-base-100 z-[1] mt-4 w-52 p-2 shadow"
  //           >
  //             <li className="text-green-500 ml-3">{userData.email}</li>
  //             <li className="hover:bg-green-500 rounded hover:text-white">
  //               <Link to="/profile">Profile</Link>
  //             </li>
  //             <li className="hover:bg-green-500 rounded hover:text-white">
  //               <button onClick={handleLogout}>Logout</button>
  //             </li>
  //           </ul>
  //         </div>
  //       </div>
  //       <div className="bottom p-5 pt-0 overflow-y-scroll h-screen">
  //         <Outlet />
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default MasterLayout;
