import React from "react";
import { doc, deleteDoc, getDocs, collection, query, where, } from 'firebase/firestore';
import { useFirebase } from "../../context/firebase";
import { toast } from "react-toastify";

const ReportsCard = ({ post, setRefreshReports }) => {
    const { post_image, post_video, full_add, post_id } = post;
    const { firestore } = useFirebase();

    const handleDeleteReport = async (id) => {
        // Assuming 'reports' and 'posts' are the names of the collections
        const reportsCollectionName = 'reports';
        const postsCollectionName = 'posts';
        const postIdToDelete = id;

        try {
            // Step 1: Find the document with the matching postId in 'reports' collection
            const reportsCollectionRef = collection(firestore, reportsCollectionName);
            const reportsQuerySnapshot = await getDocs(query(reportsCollectionRef, where('postId', '==', postIdToDelete)));

            // Step 2: Delete the document from 'reports' collection
            const deleteReportsPromises = reportsQuerySnapshot.docs.map(async (reportDoc) => {
                await deleteDoc(reportDoc.ref);
                console.log(`Document with postId ${postIdToDelete} deleted from 'reports' collection successfully.`);
            });

            // Step 3: Find the document with the matching postId in 'posts' collection
            const postsCollectionRef = collection(firestore, postsCollectionName);
            const postsQuerySnapshot = await getDocs(query(postsCollectionRef, where('postId', '==', postIdToDelete)));

            // Step 4: Delete the document from 'posts' collection
            const deletePostsPromises = postsQuerySnapshot.docs.map(async (postDoc) => {
                await deleteDoc(postDoc.ref);
                console.log(`Document with postId ${postIdToDelete} deleted from 'posts' collection successfully.`);
            });

            // Wait for all deletions to complete
            await Promise.all([...deleteReportsPromises, ...deletePostsPromises]);

            setRefreshReports(true)

            // Display toast after all deletions are complete
            toast("Post deleted successfully");
        } catch (error) {
            console.error(`Error deleting documents: `, error);
            // Handle error or display an error toast
        }
    };


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
