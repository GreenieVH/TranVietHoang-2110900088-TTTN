import { useState } from "react";

const CreateListPopup = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    if (!name.trim()) {
      alert("Vui lòng nhập tên danh sách!");
      return;
    }
    onCreate(name, description);
    onClose(); // Đóng modal sau khi tạo
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-white text-[#032541] p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Tạo danh sách mới</h2>

        <input
          type="text"
          className="w-full p-2 border rounded mb-3"
          placeholder="Nhập tên danh sách..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="w-full p-2 border rounded mb-3"
          placeholder="Nhập mô tả (tùy chọn)..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <div className="flex justify-center gap-3">
          <button className="px-4 py-1 bg-gray-400 text-white rounded" onClick={onClose}>
            Hủy
          </button>
          <button className="px-4 py-1 bg-[#032541] text-white rounded" onClick={handleCreate}>
            Tạo
          </button>
        </div>
      </div>
    </div>
  );
};
export default CreateListPopup;