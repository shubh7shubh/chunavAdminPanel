import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app"
import { getFirestore, doc, getDoc, getDocs, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCN2Q-jQqFJUzpHohPD16CJV4LwKg6nvf8",
    authDomain: "chunaw-a66df.firebaseapp.com",
    projectId: "chunaw-a66df",
    storageBucket: "chunaw-a66df.appspot.com",
    messagingSenderId: "379389559599",
    appId: "1:379389559599:web:e3788d2d8872cf629d17da"
};


const firebaseApp = initializeApp(firebaseConfig)

const auth = getAuth(firebaseApp);

const FirebaseContext = createContext(null)

export const useFirebase = () => useContext(FirebaseContext)

export const FirebaseProvider = (props) => {
    const firestore = getFirestore(firebaseApp)
    const [polls, setPolls] = useState([]);

    const getPolls = async () => {
        try {
            const pollsCollectionRef = collection(firestore, 'polls');
            const pollsSnapshot = await getDocs(pollsCollectionRef);
            const pollsData = pollsSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPolls(pollsData);
        } catch (error) {
            console.error('Error getting polls: ', error);
        }
    };

    useEffect(() => {
        getPolls(); // Fetch polls on component mount
    }, [firestore]);





    const getReportsWithPosts = async () => {
        try {
            const reportsCollectionRef = collection(firestore, 'reports');
            const querySnapshot = await getDocs(reportsCollectionRef);

            const reportsWithPosts = await Promise.all(querySnapshot.docs.map(async (reportDoc) => {
                const reportData = { id: reportDoc.id, ...reportDoc.data() };

                // Fetch the post details using the postId
                const postDoc = await getDoc(doc(firestore, 'posts', reportData.postId));
                const postData = postDoc.exists() ? postDoc.data() : null;

                // Fetch data from the "by" subcollection
                const byCollectionRef = collection(reportDoc.ref, 'by');
                const byQuerySnapshot = await getDocs(byCollectionRef);
                const byData = byQuerySnapshot.docs.map(doc => doc.data());


                // Calculate reason counts
                const reasonCounts = {};
                byData.forEach(data => {
                    const { reason } = data;
                    reasonCounts[reason] = (reasonCounts[reason] || 0) + 1;
                });

                // Combine the reportData, post data, and "by" data
                return { ...reportData, post: postData, by: byData, reasonCounts };
            }));

            return reportsWithPosts;
        } catch (error) {
            console.error('Error getting documents: ', error);
            throw error;
        }
    };



    const contextValue = {
        auth,
        firestore,
        getReportsWithPosts,
        polls,
        getPolls
    };
    return <FirebaseContext.Provider value={contextValue}>{props.children}</FirebaseContext.Provider>
}

