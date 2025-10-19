import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="h-screen pt-20 flex justify-center">
      <div className="max-w-lg w-full bg-base-300 rounded-2xl p-8 shadow-lg space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Profile</h1>
          <p className="mt-1 text-sm text-zinc-400">Your profile information</p>
        </div>

        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <img
              src={selectedImg || authUser?.profilePic || "/defaultProfilePic.png"}
              alt="Profile"
              className="size-32 rounded-full object-cover border-4 border-base-200"
            />
            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-0 right-0 bg-base-content p-2 rounded-full cursor-pointer hover:scale-105 transition-transform duration-200 ${
                isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
              }`}
            >
              <Camera className="w-5 h-5 text-base-200" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <p className="text-sm text-zinc-400">
            {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
          </p>
        </div>

        {/* Profile Info */}
        <div className="space-y-6">
          {/* Full Name */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <User className="w-4 h-4" />
              Full Name
            </div>
            <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
              {authUser?.fullName || "Not provided"}
            </p>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <Mail className="w-4 h-4" />
              Email Address
            </div>
            <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
              {authUser?.email || "Not provided"}
            </p>
          </div>
        </div>

        {/* Account Info */}
        <div className="pt-6 border-t border-zinc-700">
          <h2 className="text-lg font-medium mb-4">Account Information</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-zinc-700">
              <span>Member Since</span>
              <span>{authUser?.createdAt?.split("T")[0] || "—"}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span>Account Status</span>
              <span className="text-green-500 font-medium">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
