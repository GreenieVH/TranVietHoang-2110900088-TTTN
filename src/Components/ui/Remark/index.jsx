import { useState } from "react";

const Remark = () => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const handleAddComment = () => {
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto  px-16">
      <div className="border border-gray-700 rounded-md shadow-md mt-6 p-4">
        <h2 className="text-xl font-bold text-white mb-4">Bình luận</h2>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white"
          placeholder="Viết bình luận..."
        ></textarea>
        <button
          onClick={handleAddComment}
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Gửi bình luận
        </button>
  
        <div className="mt-4 space-y-2">
          {comments.map((cmt, index) => (
            <div
              key={index}
              className="p-3 bg-gray-800 rounded-md border border-gray-700 text-white"
            >
              {cmt}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Remark;
