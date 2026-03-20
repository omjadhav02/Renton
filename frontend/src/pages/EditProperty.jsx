import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import toast from "react-hot-toast";

function EditProperty() {

  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    address: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: ""
  });

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch property
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axiosInstance.get(`/properties/${id}`);

        setForm({
          title: res.data.title,
          description: res.data.description,
          price: res.data.price,
          city: res.data.city,
          address: res.data.address,
          propertyType: res.data.propertyType,
          bedrooms: res.data.bedrooms,
          bathrooms: res.data.bathrooms
        });

        setExistingImages(res.data.images || []);
        setLoading(false);

      } catch (error) {
        toast.error("Failed to load property");
      }
    };

    fetchProperty();
  }, [id]);

  // handle inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // new image select
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);

    setNewImages(files);

    const previewUrls = files.map((file) =>
      URL.createObjectURL(file)
    );

    setPreview(previewUrls);
  };

  // remove new image
  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setPreview((prev) => prev.filter((_, i) => i !== index));
  };

  // delete existing image
  const handleRemoveExisting = async (imageId) => {
    try {
      await axiosInstance.delete(`/upload/image/${imageId}`);

      setExistingImages((prev) =>
        prev.filter((img) => img.id !== imageId)
      );

      toast.success("Image removed");
    } catch (error) {
      toast.error("Failed to delete image");
    }
  };

  // update property
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // update property
      await axiosInstance.put(`/properties/${id}`, form);

      // upload new images
      if (newImages.length > 0) {
        const formData = new FormData();

        newImages.forEach((img) => {
          formData.append("images", img);
        });

        await axiosInstance.post(
          `/upload/property/${id}`,
          formData
        );
      }

      toast.success("Property updated!");
      navigate("/owner/properties");

    } catch (error) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  // delete property
  const handleDelete = async () => {
    if (!window.confirm("Delete this property?")) return;

    try {
      await axiosInstance.delete(`/properties/${id}`);
      toast.success("Property deleted");
      navigate("/owner/properties");
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold mb-2 text-gray-800">
        Edit Property
      </h1>
      <p className="text-gray-500 mb-8">
        Update your property details
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow space-y-8"
      >

        {/* BASIC */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Basic Info</h2>

          <div className="grid md:grid-cols-2 gap-5">
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              placeholder="Title"
              required
            />

            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              placeholder="Price" 
              required
            />
          </div>
        </div>

        {/* LOCATION */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Location</h2>

          <div className="grid md:grid-cols-2 gap-5">
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              placeholder="City"
              required
            />

            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              placeholder="Address"
              required
            />
          </div>
        </div>

        {/* DETAILS */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Property Details</h2>

          <div className="grid md:grid-cols-3 gap-5">
            <input
              type="text"
              name="propertyType"
              value={form.propertyType}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              placeholder="Type"
              required
            />

            <input
              type="number"
              name="bedrooms"
              value={form.bedrooms}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              placeholder="Bedrooms"
              required
            />

            <input
              type="number"
              name="bathrooms"
              value={form.bathrooms}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              placeholder="Bathrooms"
              required
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Description</h2>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="w-full border p-3 rounded-lg"
            required
          />
        </div>

        {/* EXISTING IMAGES */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Current Images</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {existingImages.map((img) => (
              <div key={img.id} className="relative group">

                <img
                  src={img.imageUrl}
                  className="w-full h-32 object-cover rounded-lg"
                />

                <button
                  type="button"
                  onClick={() => handleRemoveExisting(img.id)}
                  className="absolute top-1 right-1 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                >
                  ✕
                </button>

              </div>
            ))}
          </div>
        </div>

        {/* NEW IMAGES */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Add New Images</h2>

          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleImageChange}
            className="mb-4"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {preview.map((img, index) => (
              <div key={index} className="relative group">

                <img
                  src={img}
                  className="w-full h-32 object-cover rounded-lg"
                />

                <button
                  type="button"
                  onClick={() => removeNewImage(index)}
                  className="absolute top-1 right-1 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                >
                  ✕
                </button>

              </div>
            ))}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-between">

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
          >
            Update Property
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </form>
    </div>
  );
}

export default EditProperty;