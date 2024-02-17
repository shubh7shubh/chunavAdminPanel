
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { AiOutlineOrderedList } from 'react-icons/ai';
import { BiSolidCoupon, BiSolidUser } from 'react-icons/bi';
import { FaArrowRight, FaArrowLeft, FaAddressBook, FaPoll } from 'react-icons/fa'; // Import arrow icons from react-icons
import { MdAnalytics, MdInventory, MdOutlineSettings } from 'react-icons/md';
import { TbBrandProducthunt } from 'react-icons/tb';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { VscReport } from "react-icons/vsc";

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [cookies, setCookies, removeCookies] = useCookies(['adminId']);
    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        console.log(location.pathname, "path")
    }, [])

    const handleLogout = () => {
        navigate("/login")
        toast("Logout Successfully")
        removeCookies('adminId');
        localStorage.removeItem("isAdmin");
    }


    return (
        <>
            <aside className={`flex bg-primary-blue transition-all duration-300 ${isExpanded ? 'w-60' : 'w-16'}`}>
                <div className=" bg-primary-blue flex relative flex-col items-center w-full h-screen p-2 space-y-3   dark:bg-gray-900 dark:border-gray-700">

                    <button style={{ border: "2px solid white" }} className={`z-50 mt-10 p-3 relative transition-all duration-300 ${isExpanded ? ' top-0 left-[120px]' : 'top-0 left-8'}   rounded-full text-gray-100 focus:outline-none transition-colors duration-200 bg-primary-blue dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100 hover:text-primary-blue`} onClick={toggleSidebar}>
                        {isExpanded ? <FaArrowLeft /> : <FaArrowRight />}
                    </button>

                    {/* <div className={`flex gap-1 items-center hover:bg-white hover:text-primary-blue justify-start w-full `}>
                        <div className='p-2'>
                            <FaAddressBook className="w-auto h-6 text-white" />
                        </div>
                        {isExpanded ? <p className='text-white' >Dashboard</p> : ""}
                    </div> */}
                    {/* <div onClick={() => navigate("/admin")} className={`flex ${location?.pathname === "/admin" ? "bg-white" "text-primary-blue" : "bg-primary-blue" "text-white"} gap-1 items-center justify-start w-full  hover:bg-white hover:text-primary-blue ${isExpanded ? 'text-white' : 'text-white'}`}>
                        <div className='p-2'>
                            <FaAddressBook className="w-auto h-6" />
                        </div>
                        {isExpanded && <p>Dashboard</p>}
                    </div> */}
                    {/* ${pathName.includes(menuItem.id) && "bg-[#FF730F] rounded-r-[30px]"} */}
                    <div onClick={() => navigate("/")} className={`flex ${location?.pathname === "/" ? "bg-gray-100 text-primary-blue" : "bg-primary-blue text-white"} gap-1 items-center justify-start w-full hover:bg-white hover:text-primary-blue ${isExpanded ? 'text-primary-blue' : 'text-primary-blue'}`}>
                        <div className='p-2'>
                            <FaAddressBook className="w-auto h-6" />
                        </div>
                        {isExpanded && <p>Dashboard</p>}
                    </div>



                    <div onClick={() => navigate("/reports")} className={`flex gap-1 ${location?.pathname === "/reports" ? "bg-gray-100 text-primary-blue" : "bg-primary-blue text-white"} items-center justify-start w-full hover:bg-white hover:text-primary-blue ${isExpanded ? 'text-primary-blue' : 'text-primary-blue'} `}>
                        <div className='p-2'>
                            {/* <img className="w-auto h-6" src="https://merakiui.com/images/logo.svg" alt="" /> */}
                            <VscReport className="w-auto h-6 " />
                        </div>
                        {isExpanded ? <p className='' >Reports</p> : ""}
                    </div>

                    <div onClick={() => navigate("/polls")} className={`flex gap-1 ${location?.pathname === "/polls" ? "bg-gray-100 text-primary-blue" : "bg-primary-blue text-white"} items-center justify-start w-full hover:bg-white hover:text-primary-blue ${isExpanded ? 'text-primary-blue' : 'text-primary-blue'} `}>
                        <div className='p-2'>
                            {/* <img className="w-auto h-6" src="https://merakiui.com/images/logo.svg" alt="" /> */}
                            <FaPoll className="w-auto h-6 " />
                        </div>
                        {isExpanded ? <p className='' >Polls</p> : ""}
                    </div>

                    <div onClick={handleLogout} className={`flex gap-1 items-center justify-start w-full hover:bg-white hover:text-primary-blue ${isExpanded ? 'text-white' : 'text-white'} `}>
                        <div className='p-2'>
                            {/* <img className="w-auto h-6" src="https://merakiui.com/images/logo.svg" alt="" /> */}
                            <BiSolidUser className="w-auto h-6 " />
                        </div>
                        {isExpanded ? <p className='' >Logout</p> : ""}
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
