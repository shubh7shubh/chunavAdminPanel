// import { getFirestore } from "firebase/firestore";
// import Navbar from "../components/navbar/Navbar"
// import Sidebar from "../components/sidebar/Sidebar"

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { useState } from "react";
// import { getDownloadURL, getStorage, ref, uploadString } from 'firebase/storage';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries





// const News = () => {

//     // Your web app's Firebase configuration
//     const firebaseConfig = {
//         apiKey: "AIzaSyDo_K4eTaBl8w2IfOOHodD2_JQhSwgk4TQ",
//         authDomain: "news-3c663.firebaseapp.com",
//         projectId: "news-3c663",
//         storageBucket: "news-3c663.appspot.com",
//         messagingSenderId: "657003687357",
//         appId: "1:657003687357:web:5233eca7026548889ff6d4"
//     };
//     // Initialize Firebase
//     const app = initializeApp(firebaseConfig);

//     const firestore = getFirestore(app)

//     const storage = getStorage();

//     const [state, setState] = useState('');
//     const [district, setDistrict] = useState('');
//     const [file, setFile] = useState(null); // For video/photo file
//     const [loading, setLoading] = useState(false);

//     const handleFileChange = (e) => {
//         const selectedFile = e.target.files[0];
//         setFile(selectedFile);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             setLoading(true);

//             // Upload video/photo to storage
//             const storageRef = ref(storage, `videos_photos/${file.name}`);
//             await uploadString(storageRef, file, 'data_url');

//             // Get download URL
//             const downloadURL = await getDownloadURL(storageRef);

//             // Add document to Firestore
//             const newsData = {
//                 state,
//                 district,
//                 videoOrPhoto: downloadURL,
//                 creationTime: serverTimestamp(),
//             };

//             await addDoc(collection(firestore, 'news'), newsData);

//             setLoading(false);
//             console.log('News added successfully!');
//         } catch (error) {
//             console.error('Error adding news:', error);
//             setLoading(false);
//         }
//     };


//     return (
//         <div>
//             <div className='flex h-screen overflow-hidden'>
//                 <Sidebar />
//                 <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
//                     <main>
//                         <div className='bg-gray-100'>
//                             <Navbar />
//                             <p className="text-center">News</p>
//                             <form onSubmit={handleSubmit}>
//                                 {/* Other form fields for state and district */}
//                                 <label>
//                                     Video/Photo:
//                                     <input type="file" accept="image/*, video/*" onChange={handleFileChange} />
//                                 </label>

//                                 <button type="submit" disabled={loading}>
//                                     {loading ? 'Adding News...' : 'Add News'}
//                                 </button>
//                             </form>
//                         </div>
//                     </main>
//                 </div>
//             </div>
//         </div>
//     )
// }
// export default News


const News = () => {
    return (
        <div>News</div>
    )
}
export default News


