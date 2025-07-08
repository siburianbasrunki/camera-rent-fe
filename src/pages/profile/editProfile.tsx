import { useState, useRef, type ChangeEvent, useEffect } from "react";
import { useUpdateUser } from "../../hook/user";
import { BiSolidEdit } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import Modal from "./modal";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: {
    name: string;
    phoneNumber?: string;
    imageUrl?: string;
  };
}

const EditProfileModal = ({ isOpen, onClose, currentUser }: EditProfileModalProps) => {
  const [name, setName] = useState(currentUser.name);
  const [phoneNumber, setPhoneNumber] = useState(currentUser.phoneNumber || "");
  const [imagePreview, setImagePreview] = useState(currentUser.imageUrl || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: updateUser, isPending } = useUpdateUser();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    if (name) formData.append("name", name);
    if (phoneNumber) formData.append("phoneNumber", phoneNumber);
    if (imageFile) formData.append("image", imageFile);

    updateUser(formData, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  useEffect(() => {
  setName(currentUser.name);
  setPhoneNumber(currentUser.phoneNumber || "");
  setImagePreview(currentUser.imageUrl || "");
}, [currentUser]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Profile</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={20} />
          </button>
        </div>

        <div className="flex flex-col items-center mb-4">
          <div className="relative">
            <img
              src={imagePreview || "/default-avatar.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
            />
            <button
              onClick={triggerFileInput}
              className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full"
            >
              <BiSolidEdit size={16} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              disabled={isPending}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
              disabled={isPending}
            >
              {isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditProfileModal;