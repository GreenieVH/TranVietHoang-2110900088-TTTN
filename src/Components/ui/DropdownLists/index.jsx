import { useState } from "react";
import { useManageMovieLists } from "../../../Servives/Auth";
import CreateListPopup from "../CreateListPopup";

function DropdownLists({ showDropdown, id, lists, setLists,refetch }) {
  const sessionId = localStorage.getItem("sessionId");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { addToList, createNewList } = useManageMovieLists(
    sessionId,
    lists,
    setLists
  );
  const handleAddMovie = (listId) => {
    addToList(listId, id);
    if(refetch){
      refetch()
    }
  };

  return (
    <>
      {
        <div
          className={`absolute flex flex-col ${
            showDropdown
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-5 pointer-events-none"
          } gap-1 left-0 z-30 top-0 bg-gray-800 text-white p-2 rounded-lg shadow-lg w-full max-h-full min-h-[300px] overflow-y-auto transition-all duration-300 transform`}
        >
          <p className="text-sm font-semibold mb-2">Chọn danh sách:</p>
          {lists?.length > 0 ? (
            lists.map((list, index) => (
              <button
                key={index}
                className="block w-full text-left px-2 py-1 bg-slate-900 hover:bg-gray-700 rounded"
                onClick={() => handleAddMovie(list.id)}
              >
                {list.name}
              </button>
            ))
          ) : (
            <p>Chưa có danh sách</p>
          )}
          <button
            className="block w-full text-left px-2 py-1 mt-2 bg-red-500 hover:bg-red-600 rounded"
            onClick={() => setIsPopupOpen(true)}
          >
            + Tạo mới
          </button>
          <CreateListPopup
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            onCreate={(name, description) => createNewList(name, description)}
          />
        </div>
      }
    </>
  );
}

export default DropdownLists;
