import { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import ReportsCard from "../components/cards/ReportsCard";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { CircularProgress } from "@mui/material";


const Reports = () => {
    const navigate = useNavigate();
    const [cookies, setCookies] = useCookies(["adminId"]);
    const [reportsData, setReportsData] = useState([]);
    const [refreshReports, setRefreshReports] = useState(false);
    const { getReportsWithPosts } = useFirebase();


    useEffect(() => {
        const fetchReports = async () => {
            try {
                const reports = await getReportsWithPosts();
                setReportsData(reports);
                console.log("Reports with posts:", reports);
            } catch (error) {
                console.error("Error fetching reports with posts:", error);
            }
        };

        fetchReports(); // Always call fetchReports on mount

        if (refreshReports) {
            fetchReports();
            setRefreshReports(false); // Assuming you want to reset refreshReports after fetching
        }

        // Include getReportsWithPosts and fetchReports in the dependencies array
    }, [getReportsWithPosts, refreshReports]);


    useEffect(() => {
        if (cookies.adminId !== "VK8RFWMIEqaewGsYcmyKqN5rUHn2") {
            toast.error("Please Login")
            navigate('/login')
        }
    }, [])



    return (
        <div>
            <div className='flex h-screen overflow-hidden'>
                <Sidebar />
                <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
                    <main>
                        <div className='bg-gray-100'>
                            <Navbar />
                            <div>
                                {reportsData && reportsData.length > 0 ? <div className="flex flex-col justify-center items-center"> {reportsData.map((curElem) => (
                                    // <ReportsCard post={curElem.post} setRefreshReports={setRefreshReports} />
                                    curElem.post !== null && (
                                        <ReportsCard post={curElem.post} setRefreshReports={setRefreshReports} />
                                    )
                                ))}</div> : <div className="flex w-screen bg-white h-screen items-center justify-center text-9xl ">
                                    <CircularProgress className="text-3xl" />
                                </div>}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}
export default Reports