import { useState } from "react";
import { useAuth }from "../../context/AuthContext"
import { IoAccessibility } from "react-icons/io5"
import axiosInstance from "../../api/axios";
import toast from "react-hot-toast"

const GeneralSettings = () => {

    const { user, setUser } = useAuth();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        country: user.country || "",
        postCode: user.postCode || "",
    });

    const handleChange = (e) => {
        setFormData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axiosInstance.put("/auth/update-user", formData);

            setUser((prev) => ({
                ...prev,
                ...res.data.updatedFields
            }))

            toast.success("Profile Updated");
            
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!")
        } finally {
            setLoading(false);
        }
        
    }

    return (
  <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">

    {/* Header */}
    <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
      General Settings <IoAccessibility className="text-blue-500" />
    </h1>
    <p className="text-sm text-gray-400 mt-1">
      Update your personal information
    </p>

    <form className="mt-8 space-y-8">

      {/* ================= PERSONAL INFO ================= */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Name */}
          <div>
            <label className="text-sm text-gray-600">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm text-gray-600">Phone</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email (full width) */}
          <div className="md:col-span-2">
            <label className="text-sm text-gray-600">Email</label>
            <input
              value={user.email}
              disabled
              className="mt-1 w-full bg-gray-100 rounded-lg p-2.5 text-gray-500"
            />
          </div>

          {/* Role */}
          <div>
            <label className="text-sm text-gray-600">Role</label>
            <input
              value={user.role}
              disabled
              className="mt-1 w-full bg-gray-100 rounded-lg p-2.5 text-gray-500"
            />
          </div>

        </div>
      </div>

      {/* ================= ADDRESS ================= */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">
          Address
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Address full width */}
          <div className="md:col-span-2">
            <label className="text-sm text-gray-600">Address</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">City</label>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">State</label>
            <input
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Country</label>
            <input
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Postal Code</label>
            <input
              name="postCode"
              value={formData.postCode}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500"
            />
          </div>

        </div>
      </div>

      {/* Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium 
                     hover:bg-blue-700 transition 
                     disabled:bg-gray-400"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>

    </form>
  </div>
);
}

export default GeneralSettings;