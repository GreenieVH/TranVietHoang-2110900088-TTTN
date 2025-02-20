import { useState } from "react";
import { useAccountDetails } from "../../../Servives/Auth";
import andanh from "../../../assets/Images/andanh.jpg";
const Remark = () => {
  const sessionId = localStorage.getItem("sessionId");
  const { accountDetails } = useAccountDetails(sessionId);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const handleAddComment = () => {
    if (comment.trim()) {
      setComments([
        ...comments,
        { text: comment, likes: 0, replies: [], user: accountDetails },
      ]);
      setComment("");
    }
  };

  const handleLike = (index) => {
    const newComments = [...comments];
    newComments[index].likes += 1;
    setComments(newComments);
  };

  const handleReply = (index, replyText) => {
    if (replyText.trim()) {
      const newComments = [...comments];
      newComments[index].replies.push({
        text: replyText,
        user: accountDetails,
      });
      setComments(newComments);
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-16">
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

        <div className="mt-4 space-y-4">
          {comments.map((cmt, index) => (
            <div
              key={index}
              className="p-3 bg-gray-800 rounded-md border border-gray-700 text-white"
            >
              <div className="flex  items-start gap-3">
                {cmt.user?.avatar ? (
                  <img
                    src={`${import.meta.env.VITE_IMGL_URL}${
                      cmt.user.avatar.tmdb.avatar_path
                    }`}
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <img
                    src={andanh}
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div className="flex flex-col">
                  <p className="font-bold">{cmt.user?.name || "Ẩn danh"}</p>
                  <p>{cmt.text}</p>
                  <div className="flex items-center gap-2">
                    <div
                      onClick={() => handleLike(index)}
                      className="text-blue-400 cursor-pointer hover:text-blue-500"
                    >
                      👍
                    </div>
                    {cmt.likes}
                  </div>
                </div>
              </div>

              <ReplyForm onReply={(reply) => handleReply(index, reply)} />
              {cmt.replies.length > 0 && (
                <div className="ml-10 mt-2 space-y-2 pl-4 border-l border-gray-600">
                  {cmt.replies.map((reply, rIndex) => (
                    <div key={rIndex} className=" p-2 bg-gray-700 rounded-md">
                      <div className="flex items-center gap-2">
                        {reply.user?.avatar && (
                          <img
                            src={`${import.meta.env.VITE_IMGL_URL}${
                              reply.user.avatar.tmdb.avatar_path
                            }`}
                            alt="avatar"
                            className="w-6 h-6 rounded-full"
                          />
                        )}
                        <p className="font-bold">
                          {reply.user?.name || "Ẩn danh"}
                        </p>
                      </div>
                      <p>{reply.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ReplyForm = ({ onReply }) => {
  const [reply, setReply] = useState("");

  return (
    <div className="flex items-center gap-2 ml-10">
      <input
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        className="p-1 px-4 border border-gray-600 rounded-md bg-gray-700 text-white"
        placeholder="Phản hồi..."
      />
      <button
        onClick={() => {
          onReply(reply);
          setReply("");
        }}
        className="text-green-400 hover:text-green-500 px-4 py-1"
      >
        Gửi
      </button>
    </div>
  );
};

export default Remark;
