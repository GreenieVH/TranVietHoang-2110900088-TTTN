import { useNavigate } from "react-router-dom";
import { useDeleteList, useFetchMovieLists } from "../../Servives/Auth";
import logo from "../../assets/Images/logo-gm.png";
import { IoCloseCircleOutline } from "react-icons/io5";
import { TailSpin } from "react-loader-spinner";
import LoadingComponent from "../../Components/common/LoadingComponent";
import { useDelayedLoadings } from "../../hooks/DelayedLoading";

function WatchList() {
  const accountId = localStorage.getItem("accountId");
  const sessionId = localStorage.getItem("sessionId");
  const navigate = useNavigate();
  const {
    lists,
    loading: listsLoading,
    refetch,
  } = useFetchMovieLists(sessionId, accountId);
  const { deleteList, isLoading } = useDeleteList(sessionId);
  const showLoading = useDelayedLoadings([listsLoading], 300);

  const handleDelete = async (listId) => {
    await deleteList(listId);
    refetch(); // Gọi lại API để cập nhật danh sách
  };
  if (!sessionId) {
    return <div className="min-h-screen w-full text-center pt-7 text-2xl font-bold">Vui lòng đăng nhập để sử dụng!</div>;
  }
  if (showLoading){
    return <LoadingComponent/>
  }
    
  return (
    <div className="min-h-screen max-w-screen-2xl px-16 mx-auto mt-10">
      <div className="grid grid-cols-3 gap-8">
        {lists.map((list) => (
          <div
            key={list.id}
            className="cursor-pointer relative w-full h-52 rounded-lg overflow-hidden group"
            onClick={() => navigate(`/movie-by-list/${list.id}`)}
          >
            <img
              src={logo}
              className="w-full h-full object-cover rounded-lg group-hover:brightness-75 transition"
            />
            <div className="absolute italic inset-0 flex flex-col items-center justify-center text-white text-lg font-bold bg-[rgba(3,37,65,0.75)]">
              <p className="text-3xl">{list.name}</p>
              <p className="">{list.item_count} Item</p>
            </div>
            <div className="absolute top-2 right-2 group/icon">
              {/* Icon Xóa */}
              <IoCloseCircleOutline
                className="w-7 h-7 text-white cursor-pointer hover:text-red-500 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(list.id);
                }}
              />
              {/* Tooltip "Xóa" */}
              <div
                className="absolute top-full right-0 font-medium
                  bg-black text-white text-xs px-2 py-1 rounded 
                  opacity-0 group-hover/icon:opacity-100 transition
                  z-50 whitespace-nowrap pointer-events-none"
              >
                Xóa
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WatchList;
