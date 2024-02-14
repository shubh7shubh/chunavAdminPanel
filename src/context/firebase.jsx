import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app"
import { getFirestore, doc, getDoc, getDocs, collection } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCN2Q-jQqFJUzpHohPD16CJV4LwKg6nvf8",
    authDomain: "chunaw-a66df.firebaseapp.com",
    projectId: "chunaw-a66df",
    storageBucket: "chunaw-a66df.appspot.com",
    messagingSenderId: "379389559599",
    appId: "1:379389559599:web:e3788d2d8872cf629d17da"
};


const firebaseApp = initializeApp(firebaseConfig)

const FirebaseContext = createContext(null)

export const useFirebase = () => useContext(FirebaseContext)

export const FirebaseProvider = (props) => {
    const firestore = getFirestore(firebaseApp)

    // const getDocuments = async () => {
    //     try {
    //         const reportsCollectionRef = collection(firestore, 'reports');
    //         const querySnapshot = await getDocs(reportsCollectionRef);

    //         const data = querySnapshot.docs.map((doc) => ({
    //             id: doc.id,
    //             ...doc.data(),
    //         }));

    //         return data;
    //     } catch (error) {
    //         console.error('Error getting documents: ', error);
    //         throw error;
    //     }
    // };


    const getReportsWithPosts = async () => {
        try {
            const reportsCollectionRef = collection(firestore, 'reports');
            const querySnapshot = await getDocs(reportsCollectionRef);

            const reportsWithPosts = await Promise.all(querySnapshot.docs.map(async (reportDoc) => {
                const reportData = { id: reportDoc.id, ...reportDoc.data() };

                // Fetch the post details using the postId
                const postDoc = await getDoc(doc(firestore, 'posts', reportData.postId));
                const postData = postDoc.exists() ? postDoc.data() : null;

                // Combine the reportData with the post data
                return { ...reportData, post: postData };
            }));

            return reportsWithPosts;
        } catch (error) {
            console.error('Error getting documents: ', error);
            throw error;
        }
    };
    const contextValue = {
        firestore,
        getReportsWithPosts,
    };
    return <FirebaseContext.Provider value={contextValue}>{props.children}</FirebaseContext.Provider>
}

