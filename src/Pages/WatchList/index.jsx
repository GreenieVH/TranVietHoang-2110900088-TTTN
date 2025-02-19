import { useNavigate } from "react-router-dom";
import { useFetchMovieLists } from "../../Servives/Auth";
import logo from "../../assets/Images/logo-gm.png";
import { TailSpin } from "react-loader-spinner";

function WatchList() {
  const accountId = localStorage.getItem("accountId");
  const sessionId = localStorage.getItem("sessionId");
  const navigate = useNavigate();
  const { lists, loading: listsLoading } = useFetchMovieLists(
    sessionId,
    accountId
  );
  if (listsLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpin height="80" width="80" color="#4A90E2" />
      </div>
    );
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default WatchList;
