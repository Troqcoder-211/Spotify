import { useRef, useState } from "react";
import UserService from "../../../services/UserService";

const AddUserForm = ({ onClose, onSuccess }) => {
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "", 
    password: "",
    full_name: "",
    date_of_birth: "",
    account_type: "free",
    country: "",
  });

  const handleImageSelect = (e) => {
    const fileInput = e.target;
    const file = fileInput?.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Kiểm tra các trường bắt buộc
      if (!newUser.username || !newUser.email || !newUser.password) {
        alert('Vui lòng điền đầy đủ thông tin bắt buộc');
        setIsLoading(false);
        return;
      }

      // Tạo FormData object
      const formData = new FormData();
      formData.append('username', newUser.username);
      formData.append('email', newUser.email);
      formData.append('password', newUser.password);
      formData.append('full_name', newUser.full_name || '');
      formData.append('date_of_birth', newUser.date_of_birth || '');
      formData.append('account_type', newUser.account_type || 'free');
      formData.append('country', newUser.country || '');

      // Thêm file ảnh nếu có
      if (imageFile) {
        formData.append('profile_picture', imageFile);
      }

      // Gọi API thêm user
      const response = await UserService.add(formData);
      
      if (!response.success) {
        throw new Error(response.message || 'Có lỗi xảy ra khi thêm user');
      }

      alert(`Thêm user ${newUser.username} thành công!`);
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Lỗi khi thêm user:', error);
      alert(error.message || 'Có lỗi xảy ra khi thêm user');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-gray-500 p-6 rounded-lg space-y-4 py-4 text-white w-[400px] absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 '>
      <div className='fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center'>
        <div className='bg-zinc-900 border border-zinc-700 w-[90%] max-w-md rounded-lg p-6 space-y-5 relative text-white'>
          <h2 className="text-xl font-semibold">Add New User</h2>
          <p className="text-zinc-400 text-sm">
            Add a new user to the system
          </p>

          {/* Hidden Input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            hidden
            onChange={handleImageSelect}
          />

          {/* Image Upload Box */}
          <div
            className='flex items-center justify-center p-6 border-2 border-dashed border-gray-500 rounded-lg cursor-pointer'
            onClick={() => fileInputRef.current?.click()}
          >
            <div className='text-center'>
              {imageFile ? (
                <div className='space-y-2'>
                  <div className='text-sm text-green-400'>Image selected:</div>
                  <div className='text-xs text-gray-400'>
                    {imageFile.name.slice(0, 20)}
                  </div>
                </div>
              ) : (
                <>
                  <div className='mb-2 text-gray-400 text-2xl'>📁</div>
                  <div className='text-sm text-gray-400 mb-2'>
                    Upload profile picture
                  </div>
                  <div className='inline-block px-3 py-1 text-xs border border-gray-400 rounded'>
                    Choose File
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Username */}
          <div className='space-y-2'>
            <label className='text-sm font-medium'>Username *</label>
            <input
              type="text"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
              className='w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded'
              placeholder="Enter username"
              required
            />
          </div>

          {/* Email */}
          <div className='space-y-2'>
            <label className='text-sm font-medium'>Email *</label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className='w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded'
              placeholder="Enter email"
              required
            />
          </div>

          {/* Password */}
          <div className='space-y-2'>
            <label className='text-sm font-medium'>Password *</label>
            <input
              type="password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              className='w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded'
              placeholder="Enter password"
              required
            />
          </div>

          {/* Full Name */}
          <div className='space-y-2'>
            <label className='text-sm font-medium'>Full Name</label>
            <input
              type="text"
              value={newUser.full_name}
              onChange={(e) =>
                setNewUser({ ...newUser, full_name: e.target.value })
              }
              className='w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded'
              placeholder="Enter full name"
            />
          </div>

          {/* Date of Birth */}
          <div className='space-y-2'>
            <label className='text-sm font-medium'>Date of Birth</label>
            <input
              type="date"
              value={newUser.date_of_birth}
              onChange={(e) =>
                setNewUser({ ...newUser, date_of_birth: e.target.value })
              }
              className='w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded'
            />
          </div>

          {/* Account Type */}
          <div className='space-y-2'>
            <label className='text-sm font-medium'>Account Type</label>
            <select
              value={newUser.account_type}
              onChange={(e) =>
                setNewUser({ ...newUser, account_type: e.target.value })
              }
              className='w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded'
            >
              <option value="free">Free</option>
              <option value="premium">Premium</option>
            </select>
          </div>

          {/* Country */}
          <div className='space-y-2'>
            <label className='text-sm font-medium'>Country</label>
            <input
              type="text"
              value={newUser.country}
              onChange={(e) =>
                setNewUser({ ...newUser, country: e.target.value })
              }
              className='w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded'
              placeholder="Enter country"
            />
          </div>

          <div className='flex justify-end gap-4 pt-4'>
            <button
              className='px-4 py-2 border border-zinc-500 rounded text-white hover:bg-zinc-700'
              onClick={() => onClose()}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              className='px-4 py-2 rounded text-white bg-violet-500 hover:bg-violet-600 disabled:opacity-50'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Adding...' : 'Add User'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserForm;