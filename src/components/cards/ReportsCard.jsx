import React from "react";
import { doc, deleteDoc, getDocs, collection, query, where, } from 'firebase/firestore';
import { useFirebase } from "../../context/firebase";

const ReportsCard = ({ post }) => {
    const { post_image, post_video, full_add, post_id } = post;
    const { firestore } = useFirebase();


    const handleDeleteReport = async (id) => {
        // Assuming 'reports' is the name of the collection
        const collectionName = 'reports';
        const postIdToDelete = id;

        // Step 1: Find the document with the matching postId
        const reportsCollectionRef = collection(firestore, collectionName);
        const querySnapshot = await getDocs(query(reportsCollectionRef, where('postId', '==', postIdToDelete)));

        // Step 2: Delete the document
        querySnapshot.forEach(async (doc) => {
            try {
                await deleteDoc(doc.ref);
                console.log(`Document with postId ${postIdToDelete} deleted successfully.`);
                window.location.reload();
            } catch (error) {
                console.error(`Error deleting document with postId ${postIdToDelete}: `, error);
            }
        });
    }


    return (
        <div className="min-w-[700px] mx-auto my-5 bg-white rounded-md overflow-hidden shadow-md">
            {post_video && (
                <div className="relative h-96">
                    <video
                        className="w-full h-full object-cover"
                        controls
                        src={post_video}
                        type="video/mp4"
                    />
                </div>
            )}

            {post_image && !post_video && (
                <img
                    className="w-full h-96 object-cover"
                    src={post_image}
                    alt="Post Image"
                />
            )}

            <div className="px-6 py-4">
                <span className="font-bold text-xl mb-2">Address:</span>
                <span className="text-gray-700 text-base ml-2">
                    {full_add.join(", ")}
                </span>
            </div>
            <div className="px-6 py-4">
                <button onClick={() => handleDeleteReport(post_id)} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ReportsCard;
