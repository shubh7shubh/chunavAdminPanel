import { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import ReportsCard from "../components/cards/ReportsCard";

const Reports = () => {
    const [reportsData, setReportsData] = useState([]);
    const { getReportsWithPosts } = useFirebase();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const reports = await getReportsWithPosts();
                setReportsData(reports)
                console.log("Reports with posts:", reports);
            } catch (error) {
                console.error("Error fetching reports with posts:", error);
            }
        };

        fetchData();
    }, [getReportsWithPosts]);

    return (
        <div>
            <div className='flex h-screen overflow-hidden'>
                <Sidebar />
                <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
                    <main>
                        <div className='bg-gray-400'>
                            <Navbar />
                            <div>
                                {reportsData && <div className="flex flex-col justify-center items-center"> {reportsData.map((curElem) => (
                                    <ReportsCard post={curElem.post} />
                                ))}</div>}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}
export default Reports