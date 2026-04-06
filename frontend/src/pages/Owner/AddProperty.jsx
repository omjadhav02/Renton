import { useState } from "react";
import { useAddProperty } from "../../hooks/useAddProperty";

function AddProperty() {
  const { handleSubmit } = useAddProperty();

  const [form, setForm] = useState({
    title: "",
    description: "",
    deposit:"",
    price: "",
    address: "",
    city: "",
    state:"",
    country:"",
    postCode: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: ""
  });

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);

  // handle inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle images + preview
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreview(previewUrls);
  };

  // remove image
  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreview = preview.filter((_, i) => i !== index);

    setImages(newImages);
    setPreview(newPreview);
  };

  return (
    <div className="w-full mx-auto px-6 py-10">

      {/* Title */}
      <h1 className="text-4xl font-bold mb-2 text-gray-800">
        Add Property
      </h1>
      <p className="text-gray-500 mb-8">
        Fill details to list your property
      </p>

      <form
        onSubmit={(e)=> handleSubmit({e, form, images, setLoading})}
        className="bg-white p-8 rounded-2xl shadow space-y-8"
      >

        {/* SECTION 1: BASIC */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Basic Info</h2>

          <div className="grid md:grid-cols-2 gap-5">
            <input
              type="text"
              name="title"
              placeholder="Property Title"
              value={form.title}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="number"
              name="price"
              placeholder="Price (₹)"
              value={form.price}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="number"
              name="deposit"
              placeholder="Deposit(₹)"
              value={form.deposit}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* SECTION 2: LOCATION */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Location</h2>

          <div className="grid md:grid-cols-2 gap-5">
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              value={form.state}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={form.country}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="postCode"
              placeholder="Postal Code"
              value={form.postCode}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* SECTION 3: DETAILS */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Property Details</h2>

          <div className="grid md:grid-cols-3 gap-5">

            {/* Type */}
            <select
              name="propertyType"
              value={form.propertyType}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              placeholder="Select Property Type"
              required
            >
              <option>Apartment</option>
              <option>House</option>
              <option>Villa</option>
              <option>Studio</option>
            </select>

            {/* Bedrooms */}
            <input
              type="number"
              name="bedrooms"
              placeholder="Bedrooms"
              value={form.bedrooms}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            />

            {/* Bathrooms */}
            <input
              type="number"
              name="bathrooms"
              placeholder="Bathrooms"
              value={form.bathrooms}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            />

          </div>
        </div>

        {/* SECTION 4: DESCRIPTION */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Description</h2>

          <textarea
            name="description"
            placeholder="Write something about your property..."
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* SECTION 5: IMAGES */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Upload Images</h2>

          <div className="mb-4">

        {/* Hidden Input */}
        <input
            type="file"
            multiple
            id="fileUpload"
            onChange={handleImageChange}
            className="hidden"
            required
        />

        {/* Custom UI */}
        <label
            htmlFor="fileUpload"
            className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition"
        >
            <span className="text-gray-600 text-lg font-medium">
            📸 Upload Property Images
            </span>
            <span className="text-sm text-gray-400 mt-1">
            Click to browse (Max 5 images)
            </span>
        </label>

        </div>

          {/* Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {preview.map((img, index) => (
              <div key={index} className="relative">

                <img
                  src={img}
                  alt="preview"
                  className="w-full h-32 object-cover rounded-lg"
                />

                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-black text-white text-xs px-2 py-1 rounded"
                >
                  ✕
                </button>

              </div>
            ))}
          </div>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg hover:bg-blue-700 transition shadow"
        >
          {loading ? "Creating..." : "Add Property"}
        </button>

      </form>
    </div>
  );
}

export default AddProperty;