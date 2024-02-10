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
    //         const reportsCollectionRef = collection(firebase.firestore, 'reports');
    //         const querySnapshot = await getDocs(reportsCollectionRef);

    //         // Iterate through the documents and log their data
    //         querySnapshot.forEach((doc) => {
    //             console.log(doc.id, ' => ', doc.data());
    //         });
    //     } catch (error) {
    //         console.error('Error getting documents: ', error);
    //     }
    // };

    // const getDocuments = async () => {
    //     try {
    //         const reportsCollectionRef = collection(firestore, 'reports');
    //         const querySnapshot = await getDocs(reportsCollectionRef);

    //         // Iterate through the documents and log their data
    //         querySnapshot.forEach((doc) => {
    //             console.log(doc.id, ' => ', doc.data());
    //         });
    //     } catch (error) {
    //         console.error('Error getting documents: ', error);
    //     }
    // };


    const getDocuments = async () => {
        try {
            const reportsCollectionRef = collection(firestore, 'reports');
            const querySnapshot = await getDocs(reportsCollectionRef);

            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            return data;
        } catch (error) {
            console.error('Error getting documents: ', error);
            throw error; // rethrow the error to catch it in the component
        }
    };

    //   useEffect(() => {
    //     // Call the getDocuments function after the initial render
    //     getDocuments();
    //   }, []);


    // Call the getDocuments function
    // getDocuments();
    const contextValue = {
        firestore,
        getDocuments, // Include functions or values you want to make available
    };
    return <FirebaseContext.Provider value={contextValue}>{props.children}</FirebaseContext.Provider>
}

