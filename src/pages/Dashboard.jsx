import { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";

const Dashboard = () => {
    const { getDocuments } = useFirebase();
    const [reportsData, setReportsData] = useState([]);

    // useEffect(() => {
    //     // Call getDocuments when the component mounts
    //     getDocuments();
    // }, []); // The empty dependency array ensures it runs once on mount
    useEffect(() => {
        console.log(reportsData, "dsjfhdasfk");
    }, [reportsData]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const data = await getDocuments();
    //             setReportsData(data);
    //         } catch (error) {
    //             console.error('Error fetching data: ', error);
    //         }
    //     };

    //     fetchData();
    // }, []); // The empty dependency array ensures it runs once on mount


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDocuments();
                setReportsData(data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, [getDocuments]);

    return <>
        <div>Dashbodsard</div>
    </>
}
export default Dashboard