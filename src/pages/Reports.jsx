import { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";

const Reports = () => {
    const [reportsData, setReportsData] = useState([]);
    const { getDocuments } = useFirebase();

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


    useEffect(() => {
        console.log(reportsData, "dsjfhdasfk");
    }, [reportsData]);


    return (
        <div>
            <h1 className="font-bold text-2xl text-center my-4">Reports</h1>
            {reportsData && <div className="flex flex-col justify-center items-center"> {reportsData.map((curElem) => (
                <div className="my-4" key={curElem.id}>{curElem.id}</div>
            ))}</div>}
        </div>
    )
}
export default Reports