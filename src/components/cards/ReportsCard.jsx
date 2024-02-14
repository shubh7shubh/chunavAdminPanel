import React from "react";

const ReportsCard = ({ post }) => {
    const { post_image, post_video, full_add } = post;

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
                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ReportsCard;
